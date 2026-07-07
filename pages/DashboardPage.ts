import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  private readonly dashboardHeading: Locator;
  private readonly pimNavLink: Locator;
  private readonly userProfileDropdown: Locator;
  private readonly sideNavigation: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.pimNavLink = page.getByRole('link', { name: 'PIM' });
    this.userProfileDropdown = page.locator('.oxd-userdropdown-tab');
    this.sideNavigation = page.getByRole('navigation', { name: 'Sidepanel' });
  }

  async navigateToDashboard(): Promise<void> {
    await this.navigateTo('/dashboard/index');
    await this.waitForVisible(this.dashboardHeading);
  }

  async clickPimNavLink(): Promise<void> {
    await this.waitForVisible(this.pimNavLink);
    await this.pimNavLink.click();
  }

  async openUserProfileDropdown(): Promise<void> {
    await this.waitForVisible(this.userProfileDropdown);
    await this.userProfileDropdown.click();
  }

  async clickLogout(): Promise<void> {
    await this.openUserProfileDropdown();
    const logoutMenuItem = this.page.getByRole('menuitem', { name: 'Logout' });
    await this.waitForVisible(logoutMenuItem);
    await logoutMenuItem.click();
  }

  async isDashboardDisplayed(): Promise<boolean> {
    try {
      await this.waitForVisible(this.dashboardHeading, 10000);
      return true;
    } catch {
      return false;
    }
  }

  async isPimNavVisible(): Promise<boolean> {
    return this.pimNavLink.isVisible();
  }

  getDashboardHeadingLocator(): Locator {
    return this.dashboardHeading;
  }

  getPimNavLinkLocator(): Locator {
    return this.pimNavLink;
  }
}
