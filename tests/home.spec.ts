import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running Test: ${testInfo.title}`);
    await page.goto('http://localhost:5001/');
});

test.afterAll(async ({ page }) => {
    await page.close();
});

test('Fetching Latest Posts correctly', async ({ page }) => {
    await expect(page.locator('#body > section > button:nth-child(1) > div > h2')).toHaveText('UptimeKuma 1.21.0');
    await expect(page.locator('#body > section > button:nth-child(5) > div > h2')).toHaveText('EmeraldCraft: Airport Grand Opening!');
});