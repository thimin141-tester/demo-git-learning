import { test, expect } from "@playwright/test";

//Khai báo account
const username: string = "standard_user";
const password: string = "secret_sauce";

//Thực hiện function test: thêm sản phẩm và kiểm tra giỏ hàng
test('Login and add to cart', async ({ page }) => {
    //B1: Mở web và login    
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    //Verify login thành công
    await expect(page.getByText('Products', { exact: true })).toBeVisible();

    //B2: Add từng sản phẩm vào giỏ (sử dụng locator để chọn đúng nút add của từng sp)
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    expect(page.locator('data-test="remove-sauce-labs-backpack"')).toBeVisible();

    await page.locator('data-test="add-to-cart-sauce-labs-bike-light"').click();
    expect(page.locator('data-test="remove-sauce-labs-bike-light"')).toBeVisible();

    await page.locator('data-test="add-to-cart-sauce-labs-bolt-t-shirt"').click();
    expect(page.locator('data-test="remove-sauce-labs-bolt-t-shirt"')).toBeVisible();

    await page.locator('data-test="add-to-cart-sauce-labs-fleece-jacket"').click();
    expect(page.locator('data-test="remove-sauce-labs-fleece-jacket"')).toBeVisible();

    await page.locator('data-test="add-to-cart-sauce-labs-onesie"').click();
    expect(page.locator('data-test="remove-sauce-labs-onesie"')).toBeVisible();

    await page.locator('data-test="add-to-cart-test.allthethings()-t-shirt-(red)"').click();
    expect(page.locator('data-test="remove-test.allthethings()-t-shirt-(red)"')).toBeVisible();

    //B3: kiểm tra icon giỏ hàng hiển thị số 6
    expect(page.locator('data-test="shopping-cart-badge"')).toHaveText("6");

    //B4: kiểm tra chi tiết ở giỏ hàng
    await page.locator('.shopping_cart_link').click();
    await expect(page.getByText('Your Cart')).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bolt T-Shirt')).toBeVisible();
    await expect(page.getByText('Sauce Labs Fleece Jacket')).toBeVisible();
    await expect(page.getByText('Sauce Labs Onesie')).toBeVisible();
    await expect(page.getByText('Test.allTheThings() T-Shirt (Red)')).toBeVisible();
});
