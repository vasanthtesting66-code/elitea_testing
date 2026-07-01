/**
 * BasePage.ts
 * Abstract base class shared by all Page Objects.
 * Provides common helpers such as navigation and element waiting.
 */
import { Page, Locator, expect } from '@playwright/test';
import { config }               from '../config/config';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.page.setDefaultTimeout(config.actionTimeout);
  }

  // ── Navigation ──────────────────────────────────────────────────────────────

  /**
   * Navigate to an absolute or relative URL.
   * @param url - full URL or path relative to baseUrl
   */
  async navigateTo(url: string): Promise<void> {
    const target = url.startsWith('http') ? url : `${config.baseUrl}${url}`;
    await this.page.goto(target, { waitUntil: 'domcontentloaded' });
  }

  /** Returns the current page URL. */
  getCurrentUrl(): string {
    return this.page.url();
  }

  // ── Element helpers ─────────────────────────────────────────────────────────

  /**
   * Wait for a locator to be visible before returning.
   * Relies on Playwright's built-in auto-retry; no fixed sleeps.
   */
  async waitForVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  /** Wait for a locator to be hidden / not present. */
  async waitForHidden(locator: Locator): Promise<void> {
    await expect(locator).toBeHidden();
  }
}
