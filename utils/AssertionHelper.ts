import { expect, Locator, Page } from '@playwright/test';

export class AssertionHelper {
  static async assertVisible(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeVisible();
  }

  static async assertEnabled(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeEnabled();
  }

  static async assertText(locator: Locator, text: string, message?: string): Promise<void> {
    await expect(locator, message).toContainText(text);
  }

  static async assertUrlContains(page: Page, substring: string, message?: string): Promise<void> {
    await expect(page, message).toHaveURL(new RegExp(substring.replace(/\//g, '\\/')));
  }

  static async assertUrlNotContains(page: Page, substring: string): Promise<void> {
    const url = page.url();
    expect(url).not.toContain(substring);
  }

  static async assertInputAttribute(locator: Locator, attribute: string, value: string): Promise<void> {
    await expect(locator).toHaveAttribute(attribute, value);
  }

  static async assertInputValue(locator: Locator, value: string): Promise<void> {
    await expect(locator).toHaveValue(value);
  }
}
