import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage – abstract foundation for all Page Objects.
 * Provides shared navigation, wait utilities, and common interaction helpers.
 * All page-specific classes must extend this class.
 */
export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a path relative to the base URL configured in playwright.config.ts.
   */
  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Navigate to an absolute URL.
   */
  async navigateToUrl(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Returns the current page URL.
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Returns the current page title.
   */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Waits for a locator to be visible.
   */
  async waitForLocator(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }

  /**
   * Waits for a URL path to be active (partial match).
   */
  async waitForUrlContaining(urlFragment: string): Promise<void> {
    await this.page.waitForURL(`**${urlFragment}**`);
  }

  /**
   * Clears a text input field and types new text.
   */
  async clearAndFill(locator: Locator, value: string): Promise<void> {
    await locator.clear();
    await locator.fill(value);
  }

  /**
   * Checks whether a locator is visible on the page.
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  /**
   * Waits for network idle before proceeding – use sparingly.
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }
}
