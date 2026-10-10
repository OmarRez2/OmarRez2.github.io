import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  workers: 2,
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.TEST_BASE_URL || "http://127.0.0.1:4173",
    launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: process.env.TEST_BASE_URL ? undefined : {
    command: "node scripts/serve-export.mjs",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
  },
});
