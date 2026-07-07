import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export interface EmployeeFormData {
  firstName: string;
  middleName?: string;
  lastName: string;
  employeeId?: string;
}

export class AddEmployeePage extends BasePage {
  private readonly pageHeading: Locator;
  private readonly firstNameInput: Locator;
  private readonly middleNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly employeeIdInput: Locator;
  private readonly saveButton: Locator;
  private readonly cancelButton: Locator;
  private readonly firstNameRequiredError: Locator;
  private readonly lastNameRequiredError: Locator;
  private readonly employeeIdExistsError: Locator;
  private readonly successToast: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { name: 'Add Employee', level: 6 });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.middleNameInput = page.getByRole('textbox', { name: 'Middle Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.employeeIdInput = page.locator('input.oxd-input').nth(4);
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.firstNameRequiredError = page.locator('.oxd-input-group').filter({ has: page.getByRole('textbox', { name: 'First Name' }) }).locator('.oxd-input-field-error-message');
    this.lastNameRequiredError = page.locator('.oxd-input-group').filter({ has: page.getByRole('textbox', { name: 'Last Name' }) }).locator('.oxd-input-field-error-message');
    this.employeeIdExistsError = page.getByText('Employee Id already exists');
    this.successToast = page.locator('.oxd-toast--success');
  }

  async goto(): Promise<void> {
    await this.navigateTo('/pim/addEmployee');
    await this.waitForVisible(this.pageHeading);
  }

  async enterFirstName(firstName: string): Promise<void> {
    await this.clearAndFill(this.firstNameInput, firstName);
  }

  async enterMiddleName(middleName: string): Promise<void> {
    await this.clearAndFill(this.middleNameInput, middleName);
  }

  async enterLastName(lastName: string): Promise<void> {
    await this.clearAndFill(this.lastNameInput, lastName);
  }

  async setEmployeeId(employeeId: string): Promise<void> {
    await this.employeeIdInput.click();
    await this.employeeIdInput.press('Control+a');
    await this.employeeIdInput.fill(employeeId);
  }

  async getEmployeeId(): Promise<string> {
    return await this.employeeIdInput.inputValue();
  }

  async clickSave(): Promise<void> {
    await this.saveButton.click();
  }

  async fillAndSave(data: EmployeeFormData): Promise<string> {
    await this.enterFirstName(data.firstName);
    if (data.middleName !== undefined) {
      await this.enterMiddleName(data.middleName);
    }
    await this.enterLastName(data.lastName);
    let assignedEmployeeId: string;
    if (data.employeeId) {
      await this.setEmployeeId(data.employeeId);
      assignedEmployeeId = data.employeeId;
    } else {
      assignedEmployeeId = await this.getEmployeeId();
    }
    await this.clickSave();
    return assignedEmployeeId;
  }

  async waitForPersonalDetailsPage(): Promise<void> {
    await this.page.waitForURL(/\/pim\/viewPersonalDetails\/empNumber\//, { timeout: 15000 });
    await this.page.waitForLoadState('networkidle');
  }

  async isPageHeadingVisible(): Promise<boolean> {
    return await this.isVisible(this.pageHeading);
  }

  async isFirstNameRequiredErrorVisible(): Promise<boolean> {
    return await this.isVisible(this.firstNameRequiredError);
  }

  async isLastNameRequiredErrorVisible(): Promise<boolean> {
    return await this.isVisible(this.lastNameRequiredError);
  }

  async getFirstNameErrorText(): Promise<string> {
    return await this.getTextContent(this.firstNameRequiredError);
  }

  async getLastNameErrorText(): Promise<string> {
    return await this.getTextContent(this.lastNameRequiredError);
  }

  getPageHeadingLocator(): Locator { return this.pageHeading; }
  getFirstNameInputLocator(): Locator { return this.firstNameInput; }
  getMiddleNameInputLocator(): Locator { return this.middleNameInput; }
  getLastNameInputLocator(): Locator { return this.lastNameInput; }
  getEmployeeIdInputLocator(): Locator { return this.employeeIdInput; }
  getSaveButtonLocator(): Locator { return this.saveButton; }
  getFirstNameRequiredErrorLocator(): Locator { return this.firstNameRequiredError; }
  getLastNameRequiredErrorLocator(): Locator { return this.lastNameRequiredError; }
  getEmployeeIdExistsErrorLocator(): Locator { return this.employeeIdExistsError; }
  getSuccessToastLocator(): Locator { return this.successToast; }
}
