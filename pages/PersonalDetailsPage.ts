import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PersonalDetailsPage extends BasePage {
  private readonly pageHeading: Locator;
  private readonly successToast: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { name: 'Personal Details' });
    this.successToast = page.locator('.oxd-toast--success');
  }

  async isPersonalDetailsPageDisplayed(): Promise<boolean> {
    try {
      await this.waitForVisible(this.pageHeading, 15000);
      return true;
    } catch {
      return false;
    }
  }

  async isSuccessToastVisible(): Promise<boolean> {
    try {
      await this.successToast.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async getSuccessToastMessage(): Promise<string> {
    await this.successToast.waitFor({ state: 'visible', timeout: 10000 });
    return (await this.successToast.textContent()) || '';
  }

  getPageHeadingLocator(): Locator {
    return this.pageHeading;
  }

  getSuccessToastLocator(): Locator {
    return this.successToast;
  }
}
