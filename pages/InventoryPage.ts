    import { Page, expect } from '@playwright/test';

    export class InventoryPage {
      constructor(private page: Page) {}

      async addBackpackToCart() {
        await this.page.getByTestId('add-to-cart-sauce-labs-backpack').click();
      }

      async openCart() {
        await this.page.getByTestId('shopping-cart-link').click();
        }

      async expectCartCount(count: string) {
        await expect(this.page.locator('.shopping_cart_badge')).toHaveText(count);
      }

    async removeBackpackFromCart() {
        await this.page.getByTestId('remove-sauce-labs-backpack').click();
    }

    async expectCartEmpty() {
        await expect(this.page.locator('.shopping_cart_badge')).toHaveCount(0);
    }

    async sortBy(option: string) {
      await this.page.getByTestId('product-sort-container').selectOption(option);
    }

    async getProductNames(): Promise<string[]> {
      return await this.page.getByTestId('inventory-item-name').allTextContents();
    }
}