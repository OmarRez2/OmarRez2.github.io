import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const target = process.argv[2] || 'http://127.0.0.1:4173/';
const label = process.argv[3] || 'local';
if (!/^[a-z-]+$/.test(label)) throw new Error('Use a simple evidence label');
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH });
const samples = [];
try {
  for (let i = 0; i < 3; i++) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true });
    const page = await context.newPage();
    await page.route(/google-analytics\.com|googletagmanager\.com/, route => route.abort());
    const cdp = await context.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 93750 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await page.addInitScript(() => {
      window.lab = { lcpMs: 0, cls: 0 };
      new PerformanceObserver(list => { for (const e of list.getEntries()) window.lab.lcpMs = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver(list => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.lab.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto(target, { waitUntil: 'load' });
    await page.waitForTimeout(7000);
    samples.push(await page.evaluate(() => ({ ...window.lab,
      jsDecodedBytes: performance.getEntriesByType('resource').filter(r => r.initiatorType === 'script').reduce((sum, r) => sum + r.decodedBodySize, 0),
      transferBytes: performance.getEntriesByType('resource').reduce((sum, r) => sum + r.transferSize, 0),
    })));
    await context.close();
  }
} finally { await browser.close(); }
const result = { target, timestamp: new Date().toISOString(), conditions: '390x844, cold cache, 4x CPU, 150ms latency, 200000 bytes/s download; analytics blocked', samples, medianLcpMs: samples.map(s => s.lcpMs).sort((a,b) => a-b)[1] };
const evidenceDirectory = new URL('../docs/audit/audit-evidence/', import.meta.url);
await mkdir(evidenceDirectory, { recursive: true });
await writeFile(new URL(`performance-${label}.json`, evidenceDirectory), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
