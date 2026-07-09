import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  private readonly dashboardHeading: Locator;
  private readonly pimNavLink: Locator;
  private readonly userProfileMenu: Locator;
  private readonly sidePanel: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard', level: 6 });
    this.pimNavLink = page.getByRole('link', { name: 'PIM' });
    this.userProfileMenu = page.locator('.oxd-userdropdown-tab');
    this.sidePanel = page.getByRole('complementary');
  }

  async goto(): Promise<void> {
    await this.navigateTo('/dashboard/index');
    await this.waitForVisible(this.dashboardHeading);
  }

  async clickPimNavLink(): Promise<void> {
    await this.pimNavLink.click();
  }

  async clickUserProfileMenu(): Promise<void> {
    await this.userProfileMenu.click();
  }

  async isDashboardHeadingVisible(): Promise<boolean> {
    return await this.isVisible(this.dashboardHeading);
  }

  async isPimNavLinkVisible(): Promise<boolean> {
    return await this.isVisible(this.pimNavLink);
  }

  getDashboardHeadingLocator(): Locator { return this.dashboardHeading; }
  getPimNavLinkLocator(): Locator { return this.pimNavLink; }
  getSidePanelLocator(): Locator { return this.sidePanel; }
}
