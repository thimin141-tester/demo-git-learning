import { test, expect } from '@playwright/test';

test('verify search input field', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    await expect(page).toHaveTitle(/Playwright/);

    // Mở popup tìm kiếm bằng cách click vào nút Search (hoặc phím tắt Ctrl+K)
    await page.getByRole('button', { name: 'Search' }).click();

    // Kiểm tra ô input tìm kiếm đã hiển thị với placeholder "Search docs"
    await expect(page.getByPlaceholder('Search docs')).toBeVisible();
});
