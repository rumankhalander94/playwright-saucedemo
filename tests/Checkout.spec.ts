import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
});

test('user can complete an order', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // TODO: add the backpack, open the cart, start checkout,
  await inventoryPage.addBackpackToCart();
  await inventoryPage.openCart();
  await cartPage.checkout();
  // fill in any name and postal code, finish, and confirm the order is complete
  await checkoutPage.fillInfo('ruman','qa','111111');
  await checkoutPage.finish();
  await checkoutPage.expectOrderComplete();

});

test('first name is blank during the checkout journey', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.addBackpackToCart();
  await inventoryPage.openCart();
  await cartPage.checkout();
  await checkoutPage.fillInfo('', 'qa', '111111');
  await checkoutPage.expectError('First Name is required');
});