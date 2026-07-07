import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { UrlHelper } from '../utils/UrlHelper';

export class DashboardPage extends BasePage {
  readonly dashboardHeading: Locator;
  readonly sideNavigation: Locator;
  readonly userProfileMenu: Locator;
  readonly userProfileImage: Locator;
  readonly userDisplayName: Locator;
  readonly logoutMenuItem: Locator;
  readonly pimNavLink: Locator;
  readonly dashboardNavLink: Locator;
  readonly searchBox: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.sideNavigation = page.getByRole('navigation', { name: 'Sidepanel' });
    this.userProfileMenu = page.locator('.oxd-userdropdown-tab');
    this.userProfileImage = page.getByAltText('profile picture').first();
    this.userDisplayName = page.locator('.oxd-userdropdown-name');
    this.logoutMenuItem = page.getByRole('menuitem', { name: 'Logout' });
    this.pimNavLink = page.getByRole('link', { name: 'PIM' });
    this.dashboardNavLink = page.getByRole('link', { name: 'Dashboard' });
    this.searchBox = page.getByRole('textbox', { name: 'Search' });
  }

  async goto(): Promise<void> {
    await this.navigateTo(UrlHelper.getDashboardUrl());
    await this.waitForPageLoad();
  }

  async waitForDashboardLoad(): Promise<void> {
    await this.waitForUrlContaining('/dashboard');
    await this.dashboardHeading.waitFor({ state: 'visible' });
  }

  async openUserDropdown(): Promise<void> {
    await this.userProfileMenu.click();
    await this.logoutMenuItem.waitFor({ state: 'visible' });
  }

  async logout(): Promise<void> {
    await this.openUserDropdown();
    await this.logoutMenuItem.click();
  }

  async navigateToPIM(): Promise<void> {
    await this.pimNavLink.click();
    await this.waitForUrlContaining('/pim');
  }

  async navigateToDashboard(): Promise<void> {
    await this.dashboardNavLink.click();
    await this.waitForDashboardLoad();
  }

  async getUserDisplayName(): Promise<string> {
    return (await this.userDisplayName.textContent()) ?? '';
  }

  async isDashboardVisible(): Promise<boolean> {
    return this.dashboardHeading.isVisible();
  }

  async isNavigationVisible(): Promise<boolean> {
    return this.sideNavigation.isVisible();
  }

  async isUserProfileVisible(): Promise<boolean> {
    return this.userProfileImage.isVisible();
  }
}
