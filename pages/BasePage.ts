import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/web/index.php';
  }

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(`${this.baseUrl}${path}`);
  }

  async waitForUrlContains(urlFragment: string, timeout = 15000): Promise<void> {
    await this.page.waitForURL(`**${urlFragment}**`, { timeout });
  }

  getCurrentUrl(): string {
    return this.page.url();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForVisible(locator: Locator, timeout = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async clearAndFill(locator: Locator, value: string): Promise<void> {
    await locator.clear();
    await locator.fill(value);
  }
}
