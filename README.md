# Playwright Saucedemo Automation

UI test automation framework built with Playwright and TypeScript, testing the [Sauce Demo](https://www.saucedemo.com) e-commerce site.

## Tech stack

- Playwright Test
- TypeScript
- GitHub Actions (CI)

## Project structure

```
pages/                 Page objects (LoginPage, InventoryPage, CartPage, CheckoutPage)
tests/
  auth.setup.ts        Logs in once and saves the session to .auth/user.json
  login.spec.ts        Login tests (runs logged out)
  inventory.spec.ts    Add to cart and cart tests
  checkout.spec.ts     Checkout flow tests
playwright.config.ts   Browsers, base URL, test id attribute, setup project
.github/workflows/     CI pipeline
```

## What's covered

- Login: successful login, wrong password, locked-out user, empty credentials
- Cart: add a product, verify the cart badge, verify the product appears in the cart
- Checkout: complete an order end to end, and a blank first name validation error
- Cross-browser runs on Chromium, Firefox, and WebKit

## Design notes

- **Page Object Model:** locators and actions live in `pages/`, so tests read as user actions and a UI change is fixed in one place.
- **Reusable login session:** a setup project logs in once and saves the browser state. Every browser project reuses it, so tests start already logged in instead of repeating the login through the UI. Login tests opt out, since they need to start logged out.
- **Test ids:** `testIdAttribute` is set to `data-test` to match the site, so locators use `getByTestId`.
- **Base URL:** set once in the config, and page objects navigate with relative paths.

## Getting started

```bash
git clone https://github.com/rumankhalander94/playwright-saucedemo.git
cd playwright-saucedemo
npm install
npx playwright install
```

## Running the tests

```bash
npx playwright test                              # all tests, all browsers
npx playwright test --project=chromium           # one browser
npx playwright test tests/login.spec.ts          # one file
npx playwright test --headed                     # watch the browser
npx playwright show-report                       # open the HTML report
```

## CI

Tests run automatically on every push and pull request to `main` through GitHub Actions. The HTML report is uploaded as a build artifact.