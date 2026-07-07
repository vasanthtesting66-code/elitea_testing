import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PersonalDetailsPage extends BasePage {
  private readonly employeeNameHeading: Locator;
  private readonly personalDetailsTab: Locator;
  private readonly successToast: Locator;

  constructor(page: Page) {
    super(page);
    this.employeeNameHeading = page.locator('.orangehrm-edit-employee-name');
    this.personalDetailsTab = page.getByRole('tab', { name: 'Personal Details' });
    this.successToast = page.locator('.oxd-toast--success');
  }

  isPersonalDetailsUrl(): boolean {
    return this.getCurrentUrl().includes('/pim/viewPersonalDetails/empNumber/');
  }

  async getEmployeeNameHeading(): Promise<string> {
    await this.waitForVisible(this.employeeNameHeading);
    return (await this.employeeNameHeading.textContent()) ?? '';
  }

  async waitForSuccessToast(): Promise<void> {
    await this.successToast.waitFor({ state: 'visible', timeout: 10000 });
  }

  async isSuccessToastVisible(): Promise<boolean> {
    return await this.isVisible(this.successToast);
  }

  async isPersonalDetailsTabVisible(): Promise<boolean> {
    return await this.isVisible(this.personalDetailsTab);
  }

  getEmployeeNameHeadingLocator(): Locator { return this.employeeNameHeading; }
  getPersonalDetailsTabLocator(): Locator { return this.personalDetailsTab; }
  getSuccessToastLocator(): Locator { return this.successToast; }
}
