import { Page } from '@playwright/test';

export class WaitHelper {
  /**
   * Waits for the page to reach a stable network state
   */
  static async waitForPageLoad(page: Page): Promise<void> {
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');
  }

  /**
   * Waits for a specific URL pattern to be present
   */
  static async waitForUrl(page: Page, urlSegment: string, timeout = 15000): Promise<void> {
    await page.waitForURL(`**${urlSegment}**`, { timeout });
  }

  /**
   * Waits for a selector to be visible
   */
  static async waitForSelector(page: Page, selector: string, timeout = 10000): Promise<void> {
    await page.waitForSelector(selector, { state: 'visible', timeout });
  }
}
