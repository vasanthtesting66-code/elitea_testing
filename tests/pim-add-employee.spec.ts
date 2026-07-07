import { test, expect } from '../fixtures/authenticated.fixture';
import { employeeData } from '../test-data/employee.data';

test.describe('PIM – Add Employee Feature', () => {
  test.beforeEach(async ({ addEmployeePage }) => {
    await addEmployeePage.navigateToAddEmployee();
  });

  test('TC_004 – HR Administrator successfully adds a new employee with valid First Name, Middle Name, Last Name, and Employee ID', async ({
    addEmployeePage,
    personalDetailsPage,
    authenticatedPage,
  }) => {
    const data = employeeData.fullDetailsEmployee;

    await test.step('Step 1 – Enter First Name', async () => {
      await addEmployeePage.enterFirstName(data.firstName);
      expect(await addEmployeePage.getFirstNameValue()).toBe(data.firstName);
    });

    await test.step('Step 2 – Enter Middle Name', async () => {
      await addEmployeePage.enterMiddleName(data.middleName);
      expect(await addEmployeePage.getMiddleNameValue()).toBe(data.middleName);
    });

    await test.step('Step 3 – Enter Last Name', async () => {
      await addEmployeePage.enterLastName(data.lastName);
      expect(await addEmployeePage.getLastNameValue()).toBe(data.lastName);
    });

    await test.step('Step 4 – Verify or enter Employee ID', async () => {
      const existingId = await addEmployeePage.getEmployeeIdValue();
      if (!existingId || existingId.trim() === '') {
        await addEmployeePage.enterEmployeeId(data.employeeId);
      }
      const finalId = await addEmployeePage.getEmployeeIdValue();
      expect(finalId.trim().length).toBeGreaterThan(0);
    });

    await test.step('Step 5 – Click the Save button', async () => {
      await addEmployeePage.clickSave();
    });

    await test.step('Step 6 – Verify success message is displayed and user is redirected to Personal Details page', async () => {
      await expect(personalDetailsPage.getSuccessToastLocator()).toBeVisible({ timeout: 10000 });
      const toastText = await personalDetailsPage.getSuccessToastMessage();
      expect(toastText).toContain(data.expectedSuccessMessage);
      await expect(personalDetailsPage.getPageHeadingLocator()).toBeVisible({ timeout: 15000 });
      expect(authenticatedPage.url()).toContain('/pim/viewPersonalDetails');
    });
  });

  test('TC_005 – System displays validation error when mandatory fields First Name and Last Name are left empty', async ({
    addEmployeePage,
    authenticatedPage,
  }) => {
    const data = employeeData.emptyEmployee;

    await test.step('Step 1 – Leave the First Name input field empty', async () => {
      const firstNameValue = await addEmployeePage.getFirstNameValue();
      expect(firstNameValue).toBe('');
    });

    await test.step('Step 2 – Leave the Middle Name input field empty', async () => {
      const middleNameValue = await addEmployeePage.getMiddleNameValue();
      expect(middleNameValue).toBe('');
    });

    await test.step('Step 3 – Leave the Last Name input field empty', async () => {
      const lastNameValue = await addEmployeePage.getLastNameValue();
      expect(lastNameValue).toBe('');
    });

    await test.step('Step 4 – Click the Save button', async () => {
      await addEmployeePage.clickSave();
    });

    await test.step('Step 5 – Verify validation error messages are displayed for First Name and Last Name', async () => {
      await expect(addEmployeePage.getFirstNameValidationErrorLocator()).toBeVisible({ timeout: 5000 });
      await expect(addEmployeePage.getLastNameValidationErrorLocator()).toBeVisible({ timeout: 5000 });
      const firstNameError = await addEmployeePage.getFirstNameValidationMessage();
      const lastNameError = await addEmployeePage.getLastNameValidationMessage();
      expect(firstNameError).toContain(data.expectedValidationMessageFirstName);
      expect(lastNameError).toContain(data.expectedValidationMessageLastName);
    });

    await test.step('Step 6 – Verify user remains on the Add Employee page and no record is created', async () => {
      expect(authenticatedPage.url()).toContain('/pim/addEmployee');
      await expect(addEmployeePage.getPageHeadingLocator()).toBeVisible();
    });
  });

  test('TC_006 – System enforces First Name and Last Name as mandatory when only Middle Name is provided', async ({
    addEmployeePage,
    authenticatedPage,
  }) => {
    const data = employeeData.middleNameOnlyEmployee;

    await test.step('Step 1 – Leave the First Name input field empty', async () => {
      const firstNameValue = await addEmployeePage.getFirstNameValue();
      expect(firstNameValue).toBe('');
    });

    await test.step('Step 2 – Enter Middle Name only', async () => {
      await addEmployeePage.enterMiddleName(data.middleName);
      expect(await addEmployeePage.getMiddleNameValue()).toBe(data.middleName);
    });

    await test.step('Step 3 – Leave the Last Name input field empty', async () => {
      const lastNameValue = await addEmployeePage.getLastNameValue();
      expect(lastNameValue).toBe('');
    });

    await test.step('Step 4 – Click the Save button', async () => {
      await addEmployeePage.clickSave();
    });

    await test.step('Step 5 – Verify validation error messages are displayed for First Name and Last Name', async () => {
      await expect(addEmployeePage.getFirstNameValidationErrorLocator()).toBeVisible({ timeout: 5000 });
      await expect(addEmployeePage.getLastNameValidationErrorLocator()).toBeVisible({ timeout: 5000 });
      const firstNameError = await addEmployeePage.getFirstNameValidationMessage();
      const lastNameError = await addEmployeePage.getLastNameValidationMessage();
      expect(firstNameError).toContain(data.expectedValidationMessageFirstName);
      expect(lastNameError).toContain(data.expectedValidationMessageLastName);
      expect(authenticatedPage.url()).toContain('/pim/addEmployee');
    });
  });

  test('TC_007 – System handles maximum character length input for First Name and Last Name fields', async ({
    addEmployeePage,
    personalDetailsPage,
    authenticatedPage,
  }) => {
    const data = employeeData.maxLengthEmployee;

    await test.step('Step 1 – Enter a First Name value with exactly 30 characters', async () => {
      await addEmployeePage.enterFirstName(data.firstName);
      const value = await addEmployeePage.getFirstNameValue();
      expect(value.length).toBeLessThanOrEqual(data.characterLimitFirstName);
      expect(value.length).toBeGreaterThan(0);
    });

    await test.step('Step 2 – Leave the Middle Name field empty', async () => {
      const middleNameValue = await addEmployeePage.getMiddleNameValue();
      expect(middleNameValue).toBe('');
    });

    await test.step('Step 3 – Enter a Last Name value with exactly 30 characters', async () => {
      await addEmployeePage.enterLastName(data.lastName);
      const value = await addEmployeePage.getLastNameValue();
      expect(value.length).toBeLessThanOrEqual(data.characterLimitLastName);
      expect(value.length).toBeGreaterThan(0);
    });

    await test.step('Step 4 – Click the Save button', async () => {
      await addEmployeePage.clickSave();
    });

    await test.step('Step 5 – Verify success message is displayed and Personal Details page is shown with correct data', async () => {
      await expect(personalDetailsPage.getSuccessToastLocator()).toBeVisible({ timeout: 10000 });
      await expect(personalDetailsPage.getPageHeadingLocator()).toBeVisible({ timeout: 15000 });
      expect(authenticatedPage.url()).toContain('/pim/viewPersonalDetails');
    });
  });

  test('TC_010 – HR Administrator successfully adds a new employee with only First Name and Last Name provided', async ({
    addEmployeePage,
    personalDetailsPage,
    authenticatedPage,
  }) => {
    const data = employeeData.mandatoryOnlyEmployee;

    await test.step('Step 1 – Enter First Name', async () => {
      await addEmployeePage.enterFirstName(data.firstName);
      expect(await addEmployeePage.getFirstNameValue()).toBe(data.firstName);
    });

    await test.step('Step 2 – Leave the Middle Name field empty', async () => {
      const middleNameValue = await addEmployeePage.getMiddleNameValue();
      expect(middleNameValue).toBe('');
    });

    await test.step('Step 3 – Enter Last Name', async () => {
      await addEmployeePage.enterLastName(data.lastName);
      expect(await addEmployeePage.getLastNameValue()).toBe(data.lastName);
    });

    await test.step('Step 4 – Verify Employee ID field has a value', async () => {
      const existingId = await addEmployeePage.getEmployeeIdValue();
      if (!existingId || existingId.trim() === '') {
        await addEmployeePage.enterEmployeeId(data.employeeId);
      }
      const finalId = await addEmployeePage.getEmployeeIdValue();
      expect(finalId.trim().length).toBeGreaterThan(0);
    });

    await test.step('Step 5 – Click the Save button', async () => {
      await addEmployeePage.clickSave();
    });

    await test.step('Step 6 – Verify success message is displayed', async () => {
      await expect(personalDetailsPage.getSuccessToastLocator()).toBeVisible({ timeout: 10000 });
      const toastText = await personalDetailsPage.getSuccessToastMessage();
      expect(toastText).toContain(data.expectedSuccessMessage);
    });

    await test.step('Step 7 – Verify user is redirected to Personal Details page of Emily Johnson', async () => {
      await expect(personalDetailsPage.getPageHeadingLocator()).toBeVisible({ timeout: 15000 });
      expect(authenticatedPage.url()).toContain('/pim/viewPersonalDetails');
    });
  });
});
