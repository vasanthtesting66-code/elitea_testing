import { Page, expect } from '@playwright/test';
import { WaitHelper } from '../utils/WaitHelper';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a given full URL
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Wait for the page to fully load
   */
  async waitForPageLoad(): Promise<void> {
    await WaitHelper.waitForPageLoad(this.page);
  }

  /**
   * Returns the current page URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Returns the page title
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Wait for a URL segment to appear in the current URL
   */
  async waitForUrlContaining(urlSegment: string, timeout = 15000): Promise<void> {
    await this.page.waitForURL(`**${urlSegment}**`, { timeout });
  }
}
