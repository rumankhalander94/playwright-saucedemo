import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
});

test('can add a product to the cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.addBackpackToCart();
  await inventoryPage.expectCartCount('1');
});

test('added product appears in the cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await inventoryPage.addBackpackToCart();
  await inventoryPage.openCart();
  await cartPage.expectProductVisible('Sauce Labs Backpack');
});