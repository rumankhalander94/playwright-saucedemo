import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { test, expect } from '@playwright/test';

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

test('removing an item empties the cart badge', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.addBackpackToCart();
  await inventoryPage.expectCartCount('1');
  await inventoryPage.removeBackpackFromCart();
  await inventoryPage.expectCartEmpty();
});

test('products can be sorted Z to A', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.sortBy('za');
  const names = await inventoryPage.getProductNames();

  const expected = [...names].sort().reverse();
  expect(names).toHaveLength(6);
  expect(names).toEqual(expected);
});