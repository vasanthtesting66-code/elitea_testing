import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddEmployeePage extends BasePage {
  private readonly pageHeading: Locator;
  private readonly firstNameInput: Locator;
  private readonly middleNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly employeeIdInput: Locator;
  private readonly saveButton: Locator;
  private readonly cancelButton: Locator;
  private readonly firstNameValidationError: Locator;
  private readonly lastNameValidationError: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { name: 'Add Employee' });
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.middleNameInput = page.getByPlaceholder('Middle Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.employeeIdInput = page.locator('input.oxd-input').nth(3);
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.firstNameValidationError = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByPlaceholder('First Name') })
      .locator('.oxd-input-field-error-message, span.oxd-text--span');
    this.lastNameValidationError = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByPlaceholder('Last Name') })
      .locator('.oxd-input-field-error-message, span.oxd-text--span');
  }

  async navigateToAddEmployee(): Promise<void> {
    await this.navigateTo('/pim/addEmployee');
    await this.waitForVisible(this.pageHeading);
  }

  async enterFirstName(firstName: string): Promise<void> {
    await this.waitForVisible(this.firstNameInput);
    await this.clearAndFill(this.firstNameInput, firstName);
  }

  async enterMiddleName(middleName: string): Promise<void> {
    await this.waitForVisible(this.middleNameInput);
    await this.clearAndFill(this.middleNameInput, middleName);
  }

  async enterLastName(lastName: string): Promise<void> {
    await this.waitForVisible(this.lastNameInput);
    await this.clearAndFill(this.lastNameInput, lastName);
  }

  async enterEmployeeId(employeeId: string): Promise<void> {
    await this.waitForVisible(this.employeeIdInput);
    await this.clearAndFill(this.employeeIdInput, employeeId);
  }

  async clickSave(): Promise<void> {
    await this.saveButton.click();
  }

  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async fillEmployeeForm(
    firstName: string,
    middleName: string,
    lastName: string,
    employeeId?: string
  ): Promise<void> {
    if (firstName) await this.enterFirstName(firstName);
    if (middleName) await this.enterMiddleName(middleName);
    if (lastName) await this.enterLastName(lastName);
    if (employeeId) await this.enterEmployeeId(employeeId);
  }

  async saveEmployee(
    firstName: string,
    middleName: string,
    lastName: string,
    employeeId?: string
  ): Promise<void> {
    await this.fillEmployeeForm(firstName, middleName, lastName, employeeId);
    await this.clickSave();
  }

  async isAddEmployeePageDisplayed(): Promise<boolean> {
    try {
      await this.waitForVisible(this.pageHeading, 10000);
      return true;
    } catch {
      return false;
    }
  }

  async getFirstNameValue(): Promise<string> {
    return this.firstNameInput.inputValue();
  }

  async getMiddleNameValue(): Promise<string> {
    return this.middleNameInput.inputValue();
  }

  async getLastNameValue(): Promise<string> {
    return this.lastNameInput.inputValue();
  }

  async getEmployeeIdValue(): Promise<string> {
    return this.employeeIdInput.inputValue();
  }

  async isFirstNameInputVisible(): Promise<boolean> {
    return this.firstNameInput.isVisible();
  }

  async isMiddleNameInputVisible(): Promise<boolean> {
    return this.middleNameInput.isVisible();
  }

  async isLastNameInputVisible(): Promise<boolean> {
    return this.lastNameInput.isVisible();
  }

  async isEmployeeIdInputVisible(): Promise<boolean> {
    return this.employeeIdInput.isVisible();
  }

  async getFirstNameValidationMessage(): Promise<string> {
    await this.firstNameValidationError.waitFor({ state: 'visible', timeout: 5000 });
    return (await this.firstNameValidationError.textContent()) || '';
  }

  async getLastNameValidationMessage(): Promise<string> {
    await this.lastNameValidationError.waitFor({ state: 'visible', timeout: 5000 });
    return (await this.lastNameValidationError.textContent()) || '';
  }

  async areValidationErrorsVisible(): Promise<boolean> {
    try {
      await this.firstNameValidationError.waitFor({ state: 'visible', timeout: 5000 });
      await this.lastNameValidationError.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getFirstNameInputMaxLength(): Promise<string | null> {
    return this.firstNameInput.getAttribute('maxlength');
  }

  async getLastNameInputMaxLength(): Promise<string | null> {
    return this.lastNameInput.getAttribute('maxlength');
  }

  getPageHeadingLocator(): Locator {
    return this.pageHeading;
  }

  getFirstNameInputLocator(): Locator {
    return this.firstNameInput;
  }

  getLastNameInputLocator(): Locator {
    return this.lastNameInput;
  }

  getMiddleNameInputLocator(): Locator {
    return this.middleNameInput;
  }

  getEmployeeIdInputLocator(): Locator {
    return this.employeeIdInput;
  }

  getSaveButtonLocator(): Locator {
    return this.saveButton;
  }

  getFirstNameValidationErrorLocator(): Locator {
    return this.firstNameValidationError;
  }

  getLastNameValidationErrorLocator(): Locator {
    return this.lastNameValidationError;
  }
}
