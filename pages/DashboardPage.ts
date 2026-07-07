import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly dashboardHeading: Locator;
  readonly sideNavigation: Locator;
  readonly userProfileMenu: Locator;
  readonly userProfileName: Locator;
  readonly logoutMenuItem: Locator;
  readonly topBarBanner: Locator;
  readonly adminNavLink: Locator;
  readonly pimNavLink: Locator;
  readonly leaveNavLink: Locator;
  readonly dashboardNavLink: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.sideNavigation = page.getByRole('navigation', { name: 'Sidepanel' });
    this.userProfileMenu = page.locator('.oxd-userdropdown');
    this.userProfileName = page.locator('.oxd-userdropdown-name');
    this.logoutMenuItem = page.getByRole('menuitem', { name: 'Logout' });
    this.topBarBanner = page.getByRole('banner');
    this.adminNavLink = page.getByRole('link', { name: 'Admin' }).first();
    this.pimNavLink = page.getByRole('link', { name: 'PIM' });
    this.leaveNavLink = page.getByRole('link', { name: 'Leave' });
    this.dashboardNavLink = page.getByRole('link', { name: 'Dashboard' });
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
  }

  async goto(): Promise<void> {
    await this.navigateTo('/web/index.php/dashboard/index');
  }

  async openUserProfileMenu(): Promise<void> {
    await this.userProfileMenu.click();
    await this.waitForVisible(this.logoutMenuItem);
  }

  async clickLogout(): Promise<void> {
    await this.logoutMenuItem.click();
  }

  async logout(): Promise<void> {
    await this.openUserProfileMenu();
    await this.clickLogout();
  }

  async getLoggedInUsername(): Promise<string> {
    await this.waitForVisible(this.userProfileName);
    return (await this.userProfileName.textContent() || '').trim();
  }

  async isDashboardDisplayed(): Promise<boolean> {
    return await this.dashboardHeading.isVisible();
  }

  async isSideNavigationVisible(): Promise<boolean> {
    return await this.sideNavigation.isVisible();
  }

  async navigateToAdmin(): Promise<void> {
    await this.adminNavLink.click();
    await this.page.waitForURL('**/admin/**');
  }

  async navigateToDashboard(): Promise<void> {
    await this.dashboardNavLink.click();
    await this.waitForNavigation('**/dashboard/index');
  }
}
