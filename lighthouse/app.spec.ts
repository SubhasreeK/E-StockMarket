import { playAudit } from 'playwright-lighthouse';
import { test, chromium } from '@playwright/test';
import lighthouseDesktopConfig from 'lighthouse/lighthouse-core/config/lr-desktop-config';
import { thresholds }  from "./thresholds";
import { URLs } from "./urls.json";
console.log('check');
const options = {
    loglevel: "info",
}

URLs.forEach(url => {
    test(`Ligthouse performance test for ${url}`, async () => {
        const browser = await chromium.launch({
            args: ['--remote-debugging-port=9222'],
            headless: true
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(`${url}`);
        await playAudit({
            page: page,
            config: lighthouseDesktopConfig,
            thresholds: thresholds,
            port: 9222,
            opts: options,
            reports: {
                formats: {
                    html: true, //defaults to false
                },
                name: "ligthouse"+Date.now().toString(), //defaults to `lighthouse-${new Date().getTime()}`
                directory: `${process.cwd()}/lighthouseReport`, //defaults to `${process.cwd()}/lighthouse`
            },
        });
        await page.close();
        await context.close();
        await browser.close();
    })
});