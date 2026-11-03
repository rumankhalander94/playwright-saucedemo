import { test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.beforeEach(async ({ page }) => {
  await page.goto('/inventory.html');
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