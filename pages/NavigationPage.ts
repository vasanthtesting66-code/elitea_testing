import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class NavigationPage extends BasePage {
  private readonly pimNavLink: Locator;
  private readonly employeeListTopLink: Locator;
  private readonly addEmployeeTopLink: Locator;
  private readonly userDropdownTab: Locator;
  private readonly logoutMenuItem: Locator;

  constructor(page: Page) {
    super(page);
    this.pimNavLink = page.getByRole('navigation', { name: 'Sidepanel' }).getByRole('link', { name: 'PIM' });
    this.employeeListTopLink = page.getByRole('navigation', { name: 'Topbar Menu' }).getByRole('link', { name: 'Employee List' });
    this.addEmployeeTopLink = page.getByRole('navigation', { name: 'Topbar Menu' }).getByRole('link', { name: 'Add Employee' });
    this.userDropdownTab = page.locator('.oxd-userdropdown-tab');
    this.logoutMenuItem = page.getByRole('menuitem', { name: 'Logout' });
  }

  async clickPimInSidebar(): Promise<void> {
    await this.pimNavLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToEmployeeList(): Promise<void> {
    await this.clickPimInSidebar();
    await this.employeeListTopLink.waitFor({ state: 'visible' });
    await this.employeeListTopLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToAddEmployee(): Promise<void> {
    await this.clickPimInSidebar();
    await this.addEmployeeTopLink.waitFor({ state: 'visible' });
    await this.addEmployeeTopLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async logout(): Promise<void> {
    await this.userDropdownTab.click();
    await this.logoutMenuItem.waitFor({ state: 'visible' });
    await this.logoutMenuItem.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isPimNavVisible(): Promise<boolean> {
    return await this.isVisible(this.pimNavLink);
  }

  getAddEmployeeTopLinkLocator(): Locator { return this.addEmployeeTopLink; }
  getEmployeeListTopLinkLocator(): Locator { return this.employeeListTopLink; }
}
