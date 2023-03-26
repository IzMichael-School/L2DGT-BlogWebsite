import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running Test: ${testInfo.title}`);
    await page.goto('http://localhost:5001/p/kuma-1-21-0-released');
});

test.afterAll(async ({ page }) => {
    await page.close();
});

test('Correct post was fetched', async ({ page }) => {
    const title = page.locator('#body > div > div > h1.text-center');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('UptimeKuma 1.21.0');
});

test('Sidebar accurately reflects post content', async ({ page }) => {
    const headings: (string| Element)[] = await page.evaluate(selector => [...document.querySelectorAll(selector)], '#postContent h1, #postContent h2, #postContent h3, #postContent h4, #postContent h5, #postContent h6');
    headings.unshift('title');
    const anchorBtns = await page.evaluate(selector => [...document.querySelectorAll(selector)], '#sidebar > div > button');
    await expect(headings.length - anchorBtns.length).toBe(0);
});