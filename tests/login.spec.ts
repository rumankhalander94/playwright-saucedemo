import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});

test('standard user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});

test('wrong password shows an error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'wrong_password');
  await loginPage.expectError('Username and password do not match');
});

test('locked out user sees an error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('locked_out_user', 'secret_sauce');
  await loginPage.expectError('locked out');
});

test('empty credentials show an error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('', '');
  await loginPage.expectError('Username is required');
});