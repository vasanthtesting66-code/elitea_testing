import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PimNavigationPage extends BasePage {
  private readonly pimSideNavLink: Locator;
  private readonly addEmployeeTopNavLink: Locator;
  private readonly employeeListTopNavLink: Locator;
  private readonly topNavMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.pimSideNavLink = page.getByRole('link', { name: 'PIM' });
    this.addEmployeeTopNavLink = page.getByRole('link', { name: 'Add Employee' });
    this.employeeListTopNavLink = page.getByRole('link', { name: 'Employee List' });
    this.topNavMenu = page.getByRole('navigation', { name: 'Topbar Menu' });
  }

  async clickPimSideNavLink(): Promise<void> {
    await this.waitForVisible(this.pimSideNavLink);
    await this.pimSideNavLink.click();
    await this.waitForUrlContains('/pim/');
  }

  async clickAddEmployeeLink(): Promise<void> {
    await this.waitForVisible(this.addEmployeeTopNavLink);
    await this.addEmployeeTopNavLink.click();
    await this.waitForUrlContains('/pim/addEmployee');
  }

  async clickEmployeeListLink(): Promise<void> {
    await this.waitForVisible(this.employeeListTopNavLink);
    await this.employeeListTopNavLink.click();
    await this.waitForUrlContains('/pim/viewEmployeeList');
  }

  async navigateToAddEmployee(): Promise<void> {
    await this.clickPimSideNavLink();
    await this.clickAddEmployeeLink();
  }

  async navigateToEmployeeList(): Promise<void> {
    await this.clickPimSideNavLink();
    await this.clickEmployeeListLink();
  }

  async isAddEmployeeLinkVisible(): Promise<boolean> {
    try {
      await this.waitForVisible(this.addEmployeeTopNavLink, 5000);
      return true;
    } catch {
      return false;
    }
  }

  async isEmployeeListLinkVisible(): Promise<boolean> {
    try {
      await this.waitForVisible(this.employeeListTopNavLink, 5000);
      return true;
    } catch {
      return false;
    }
  }
}
