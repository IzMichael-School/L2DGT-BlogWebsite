import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running Test: ${testInfo.title}`);
    await page.goto('http://localhost:5001/');
});

test.afterAll(async ({ page }) => {
    await page.close();
});

test('Title is visible', async ({ page }) => {
    await expect(page.locator('#header > h1')).toHaveText('Iz\'s Blog');
});

test('Spacer is not visible', async ({ page }) => {
    await expect(page.locator('#header > div')).toHaveClass(/w-0/);
});

test('Home button exists and works', async ({ page }) => {
    const btn = page.locator('#header > button:nth-child(4)');
    await expect(btn).toHaveText('Home');
    await btn.click();
    await expect(page).toHaveURL('http://localhost:5001/');
});

test('At least one Category button exists and works', async ({ page }) => {
    const btn = page.locator('#header > button:nth-child(5)');
    await expect(btn).toHaveText('DevLogs');
    await btn.click();
    await expect(page).toHaveURL(/\/c\/devlogs/);
});