import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running Test: ${testInfo.title}`);
    await page.goto('http://localhost:5001/c/devlogs');
});

test.afterAll(async ({ page }) => {
    await page.close();
});

test('Fetching Posts correctly', async ({ page }) => {
    await expect(page.locator('#body > div > div:nth-child(2) > div > div > p')).toHaveText('3 Posts');
    await expect(page.locator('#body > div > div > button:nth-child(2) > div > h2')).toHaveText('UptimeKuma 1.21.0');
    await expect(page.locator('#body > div > div > button:nth-child(4) > div > h2')).toHaveText('The Great Revamp! - The Phoenix Pages');
});

test('Preview displays most recent post', async ({ page }) => {
    await expect(page.locator('#preview > div > h2')).toHaveText('UptimeKuma 1.21.0');
    await page.locator('#preview > button').click();
    await expect(page).toHaveURL(/\/p\/kuma-1-21-0-released/);
});