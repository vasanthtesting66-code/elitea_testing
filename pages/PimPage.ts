import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PimPage extends BasePage {
  readonly pimPageHeading: Locator;
  readonly sideNavigation: Locator;

  constructor(page: Page) {
    super(page);
    this.pimPageHeading = page.getByRole('heading', { name: 'Employee Information' });
    this.sideNavigation = page.getByRole('navigation', { name: 'Sidepanel' });
  }

  async isPimPageVisible(): Promise<boolean> {
    await this.waitForUrlContaining('/pim');
    return this.sideNavigation.isVisible();
  }
}
