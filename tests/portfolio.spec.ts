import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/about/", "/projects/", "/certificates/", "/contact/", "/privacy/",
  ...["finsight-finance-analysis", "sales-intelligence-hub", "uber-trips-analytics", "bank-loan-analysis", "pizza-sales-performance"].map(slug => `/projects/${slug}/`)];

test.beforeEach(async ({ page }) => {
  // Do not contaminate the owner's real analytics during tests.
  await page.route(/google-analytics\.com|googletagmanager\.com/, route => route.abort());
});

for (const width of [390, 768, 1440]) {
  test(`routes, assets and accessibility at ${width}px`, async ({ page, request }, testInfo) => {
    test.setTimeout(180_000);
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const route of routes) {
      expect((await page.goto(route))?.status(), route).toBe(200);
      await expect(page.locator("main h1")).toBeVisible();
      await expect(page.locator("main h1")).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(results.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), route).toEqual([]);
      for (const src of await page.locator("main img").evaluateAll(images => [...new Set(images.map(i => (i as HTMLImageElement).src))])) {
        expect((await request.get(src)).status(), src).toBe(200);
      }
      if (["/", "/projects/", "/contact/"].includes(route)) {
        // Trigger native lazy-loading before taking full-page evidence.
        for (const image of await page.locator("main img").all()) {
          await image.scrollIntoViewIfNeeded();
          await image.evaluate((img: HTMLImageElement) => img.decode().catch(() => undefined));
        }
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({ path: testInfo.outputPath(`${route.replaceAll("/", "") || "home"}-${width}.png`), fullPage: true });
      }
    }
    expect(errors).toEqual([]);
  });
}

test("static content remains readable without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  for (const route of routes) {
    expect((await page.goto(`${baseURL}${route}`))?.status()).toBe(200);
    await expect(page.locator("main h1")).toBeVisible();
    // toBeVisible alone does not detect opacity-zero ancestors.
    expect(await page.locator("main h1").evaluate(el => {
      for (let node: Element | null = el; node; node = node.parentElement) {
        if (getComputedStyle(node).opacity === "0") return false;
      }
      return true;
    }), route).toBe(true);
  }
  await page.goto(`${baseURL}/projects/`);
  await expect(page.locator("main article")).toHaveCount(5);
  await expect(page.getByRole("navigation", { name: "Navigation without JavaScript" })).toBeVisible();
  await page.goto(`${baseURL}/contact/`);
  await expect(page.getByRole("button", { name: "Open email app" })).toBeDisabled();
  await context.close();
});

test("mobile navigation, filters, image inspection, theme and keyboard", async ({ page, request }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/projects\/?$/);
  await page.getByRole("button", { name: "Python", exact: true }).click();
  await expect(page.getByRole("button", { name: "Python", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("main article")).toHaveCount(3);
  await page.goto("/projects/sales-intelligence-hub/");
  await page.getByRole("button", { name: /^Expand / }).first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const image = await dialog.getByRole("link", { name: /full-resolution/ }).getAttribute("href");
  expect((await request.get(image!)).status()).toBe(200);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("button", { name: /^Expand / }).first()).toBeFocused();
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/light/);
  await page.getByRole("button", { name: "Customize appearance" }).click();
  await expect(page.getByRole("dialog", { name: "Make it yours" })).toBeVisible();
  await page.keyboard.press("Escape");
  await page.goto("/certificates/");
  await page.getByRole("button", { name: /^View .* certificate$/ }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.getByRole("button", { name: /^View .* certificate$/ }).first()).toBeFocused();
});

test("CV download and light-mode contrast", async ({ page, request }) => {
  await page.goto("/");
  const href = await page.getByRole("link", { name: "Download CV" }).getAttribute("href");
  const response = await request.get(href!);
  expect(response.status()).toBe(200);
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(result.violations).toEqual([]);
});

test("contact draft survives clipboard failure without submitting a real message", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, "clipboard", { value: { writeText: () => Promise.reject(new Error("denied")) } }));
  await page.goto("/contact/");
  await page.getByRole("textbox", { name: "Name", exact: true }).fill("Test visitor");
  await page.getByRole("textbox", { name: "Email", exact: true }).fill("test@example.invalid");
  await page.getByRole("textbox", { name: "Subject", exact: true }).fill("Local test only");
  await page.getByRole("textbox", { name: "Message", exact: true }).fill("Do not send this draft.");
  await page.getByRole("button", { name: "Copy message" }).click();
  await expect(page.getByRole("status")).toContainText("Select and copy");
  await expect(page.getByRole("textbox", { name: /Prepared email/ })).toHaveValue(/Do not send this draft/);
  await expect(page.getByRole("textbox", { name: "Message", exact: true })).toHaveValue("Do not send this draft.");
});

test("analytics stays off until allowed and can be revoked", async ({ page }) => {
  await page.goto("/privacy/");
  await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(0);
  await page.getByRole("button", { name: "Allow analytics", exact: true }).first().click();
  await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(1);
  await page.getByRole("button", { name: "Turn analytics off" }).click();
  await expect(page.getByRole("status")).toHaveText("Analytics: off.");
  await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(0);
});

test("not-found response and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect((await page.goto("/missing-audit-page/"))?.status()).toBe(404);
  await expect(page.locator("main h1")).toBeVisible();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
});
