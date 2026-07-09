import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class EmployeeListPage extends BasePage {
  private readonly pageHeading: Locator;
  private readonly employeeNameSearchInput: Locator;
  private readonly searchButton: Locator;
  private readonly resetButton: Locator;
  private readonly resultsTable: Locator;
  private readonly recordsFoundText: Locator;
  private readonly addButton: Locator;
  private readonly paginationNav: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { name: 'Employee Information', level: 5 });
    this.employeeNameSearchInput = page.getByRole('textbox', { name: 'Type for hints...' }).first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.resultsTable = page.getByRole('table');
    this.recordsFoundText = page.locator('.oxd-text--span').filter({ hasText: 'Records Found' });
    this.addButton = page.getByRole('button', { name: ' Add' });
    this.paginationNav = page.getByRole('navigation', { name: 'Pagination Navigation' });
  }

  async goto(): Promise<void> {
    await this.navigateTo('/pim/viewEmployeeList');
    await this.waitForVisible(this.pageHeading);
  }

  async searchByEmployeeName(name: string): Promise<void> {
    await this.clearAndFill(this.employeeNameSearchInput, name);
    await this.page.waitForTimeout(500);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async waitForResults(): Promise<void> {
    await this.waitForVisible(this.resultsTable);
  }

  getResultRows(): Locator {
    return this.resultsTable.getByRole('row').filter({ has: this.page.locator('td') });
  }

  getRowByLastName(lastName: string): Locator {
    return this.resultsTable.getByRole('row').filter({ hasText: lastName });
  }

  async getEmployeeIdFromRow(row: Locator): Promise<string> {
    const cells = row.getByRole('cell');
    return (await cells.nth(1).textContent()) ?? '';
  }

  async getFirstNameFromRow(row: Locator): Promise<string> {
    const cells = row.getByRole('cell');
    return (await cells.nth(2).textContent()) ?? '';
  }

  async getLastNameFromRow(row: Locator): Promise<string> {
    const cells = row.getByRole('cell');
    return (await cells.nth(3).textContent()) ?? '';
  }

  async isEmployeeInResults(firstName: string, lastName: string): Promise<boolean> {
    const row = this.resultsTable.getByRole('row').filter({ hasText: lastName });
    const count = await row.count();
    if (count === 0) return false;
    const rowText = (await row.first().textContent()) ?? '';
    return rowText.includes(firstName);
  }

  async isPageHeadingVisible(): Promise<boolean> {
    return await this.isVisible(this.pageHeading);
  }

  async resetSearch(): Promise<void> {
    await this.resetButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  getPageHeadingLocator(): Locator { return this.pageHeading; }
  getResultsTableLocator(): Locator { return this.resultsTable; }
  getRecordsFoundTextLocator(): Locator { return this.recordsFoundText; }
}
