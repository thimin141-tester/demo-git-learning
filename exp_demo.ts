import { test, expect } from '@playwright/test';

// Tài khoản mẫu công khai của website demo SauceDemo.
let username = 'standard_user';
let password = 'secret_sauce';

test('đăng nhập, thêm sản phẩm và kiểm tra giỏ hàng', async ({ page }) => {
    // Bước 1: Mở trang đăng nhập SauceDemo.
    await page.goto('https://www.saucedemo.com/');

    // Bước 2: Tìm ô nhập bằng placeholder và điền thông tin đăng nhập.
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);

    // Bước 3: Tìm nút đăng nhập theo role, sau đó click.
    await page.getByRole('button', { name: 'Login' }).click();

    // Bước 4: Xác nhận đăng nhập thành công bằng tiêu đề trang sản phẩm.
    await expect(page.getByText('Products', { exact: true })).toBeVisible();

    // Bước 5: Tìm nút thêm sản phẩm bằng CSS locator (data-test) và thêm 2 sản phẩm.
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Bước 6: Xác nhận biểu tượng giỏ hàng hiển thị số lượng 2.
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('2');

    // Bước 7: Mở giỏ hàng bằng data-test selector của biểu tượng giỏ hàng.
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Bước 8: Xác nhận trang giỏ hàng và cả hai sản phẩm đã được thêm.
    await expect(page.getByText('Your Cart', { exact: true })).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light', { exact: true })).toBeVisible();

    // Bước 9: Kiểm tra số lượng của từng sản phẩm trong giỏ hàng.
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);

    const backpackItem = cartItems.filter({
        has: page.getByText('Sauce Labs Backpack', { exact: true }),
    });
    const bikeLightItem = cartItems.filter({
        has: page.getByText('Sauce Labs Bike Light', { exact: true }),
    });

    await expect(backpackItem).toHaveCount(1);
    await expect(backpackItem.locator('.cart_quantity')).toHaveText('1');
    await expect(bikeLightItem).toHaveCount(1);
    await expect(bikeLightItem.locator('.cart_quantity')).toHaveText('1');
});
