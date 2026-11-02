import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async expectProductVisible(name: string) {
    await expect(this.page.getByText(name)).toBeVisible();
  }

  async checkout() {
      await this.page.getByTestId('checkout').click();
    }
}