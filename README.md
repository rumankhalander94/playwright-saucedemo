# Playwright Saucedemo Automation

UI test automation framework built with Playwright and TypeScript, testing the [Sauce Demo](https://www.saucedemo.com) e-commerce site.

## Tech stack

- Playwright Test
- TypeScript
- GitHub Actions (CI)

## Project structure

```
pages/        Page objects (LoginPage, InventoryPage, CartPage)
tests/        Test specs (login, inventory and cart)
playwright.config.ts   Browsers, base URL, test id attribute
.github/workflows/     CI pipeline
```

## What's covered

- Login: successful login, wrong password, locked-out user, empty credentials
- Cart: add a product, verify the cart badge, verify the product appears in the cart
- Cross-browser runs on Chromium, Firefox, and WebKit

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