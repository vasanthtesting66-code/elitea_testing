import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a relative or absolute URL
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Wait for a locator to be visible
   */
  async waitForVisible(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }

  /**
   * Wait for a locator to be hidden
   */
  async waitForHidden(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'hidden' });
  }

  /**
   * Get the current page URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Get the current page title
   */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Check if the current URL contains the given path segment
   */
  urlContains(segment: string): boolean {
    return this.page.url().includes(segment);
  }

  /**
   * Reload the current page
   */
  async reloadPage(): Promise<void> {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  /**
   * Abstract method — each page object must define the expected URL segment
   */
  abstract getPageUrlSegment(): string;
}