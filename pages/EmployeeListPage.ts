import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class EmployeeListPage extends BasePage {
  private readonly pageHeading: Locator;
  private readonly employeeNameSearchInput: Locator;
  private readonly employeeIdSearchInput: Locator;
  private readonly searchButton: Locator;
  private readonly resetButton: Locator;
  private readonly resultsTable: Locator;
  private readonly resultsCountText: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { name: 'Employee Information' });
    this.employeeNameSearchInput = page.getByPlaceholder('Type for hints...');
    this.employeeIdSearchInput = page.locator('input.oxd-input').nth(1);
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.resultsTable = page.getByRole('table');
    this.resultsCountText = page.locator('.orangehrm-horizontal-padding.orangehrm-vertical-padding');
  }

  async navigateToEmployeeList(): Promise<void> {
    await this.navigateTo('/pim/viewEmployeeList');
    await this.waitForVisible(this.searchButton);
  }

  async searchByEmployeeName(name: string): Promise<void> {
    await this.waitForVisible(this.employeeNameSearchInput);
    await this.clearAndFill(this.employeeNameSearchInput, name);
    await this.page.keyboard.press('Escape');
  }

  async clickSearch(): Promise<void> {
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchEmployee(name: string): Promise<void> {
    await this.searchByEmployeeName(name);
    await this.clickSearch();
  }

  async clickReset(): Promise<void> {
    await this.resetButton.click();
  }

  async isEmployeeListPageDisplayed(): Promise<boolean> {
    try {
      await this.waitForVisible(this.searchButton, 10000);
      return true;
    } catch {
      return false;
    }
  }

  async isResultsTableVisible(): Promise<boolean> {
    return this.resultsTable.isVisible();
  }

  async getResultRowByEmployeeName(firstName: string, lastName: string): Promise<Locator> {
    return this.page
      .getByRole('row')
      .filter({ hasText: firstName })
      .filter({ hasText: lastName })
      .first();
  }

  async isEmployeeInResults(firstName: string, lastName: string): Promise<boolean> {
    const row = await this.getResultRowByEmployeeName(firstName, lastName);
    try {
      await row.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async getEmployeeIdFromResults(firstName: string, lastName: string): Promise<string> {
    const row = await this.getResultRowByEmployeeName(firstName, lastName);
    const cells = row.getByRole('cell');
    const idCell = cells.nth(1);
    return (await idCell.textContent()) || '';
  }

  async getFirstNameFromResults(firstName: string, lastName: string): Promise<string> {
    const row = await this.getResultRowByEmployeeName(firstName, lastName);
    const cells = row.getByRole('cell');
    const nameCell = cells.nth(2);
    const fullName = (await nameCell.textContent()) || '';
    return fullName.trim().split(' ')[0];
  }

  async getLastNameFromResults(firstName: string, lastName: string): Promise<string> {
    const row = await this.getResultRowByEmployeeName(firstName, lastName);
    const cells = row.getByRole('cell');
    const lastNameCell = cells.nth(3);
    return ((await lastNameCell.textContent()) || '').trim();
  }

  getSearchButtonLocator(): Locator {
    return this.searchButton;
  }

  getResultsTableLocator(): Locator {
    return this.resultsTable;
  }
}
