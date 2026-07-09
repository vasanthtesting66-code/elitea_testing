import { test, expect } from '../fixtures/base.fixture';
import { EmployeeHelper } from '../utils/EmployeeHelper';
import employeeData from '../test-data/employees.json';

test.describe('PIM Module - Add Employee Feature', () => {
  test.beforeEach(async ({ authenticatedPage: page, navigationPage }) => {
    await navigationPage.navigateToAddEmployee();
    await expect(page).toHaveURL(/\/pim\/addEmployee/);
  });

  test('TC_004 - Create a new employee record by entering First Name, Middle Name, Last Name and saving', async ({
    authenticatedPage: page,
    addEmployeePage,
    personalDetailsPage,
  }) => {
    const testData = employeeData.TC_004;
    const uniqueId = EmployeeHelper.generateUniqueEmployeeId('TC004');

    await test.step(`Step 1: Enter '${testData.firstName}' into the First Name field`, async () => {
      await addEmployeePage.enterFirstName(testData.firstName);
      await expect(addEmployeePage.getFirstNameInputLocator()).toHaveValue(testData.firstName);
    });

    await test.step(`Step 2: Enter '${testData.middleName}' into the Middle Name field`, async () => {
      await addEmployeePage.enterMiddleName(testData.middleName);
      await expect(addEmployeePage.getMiddleNameInputLocator()).toHaveValue(testData.middleName);
    });

    await test.step(`Step 3: Enter '${testData.lastName}' into the Last Name field`, async () => {
      await addEmployeePage.enterLastName(testData.lastName);
      await expect(addEmployeePage.getLastNameInputLocator()).toHaveValue(testData.lastName);
    });

    await test.step('Step 4: Set a unique Employee ID to avoid duplication conflicts', async () => {
      await addEmployeePage.setEmployeeId(uniqueId);
      await expect(addEmployeePage.getEmployeeIdInputLocator()).toHaveValue(uniqueId);
    });

    await test.step('Step 5: Click the Save button to submit the form', async () => {
      await addEmployeePage.clickSave();
    });

    await test.step('Step 6: Assert the Personal Details page is displayed after save', async () => {
      await addEmployeePage.waitForPersonalDetailsPage();
      await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\//);
    });

    await test.step('Step 7: Assert a success toast message is displayed', async () => {
      await expect(personalDetailsPage.getSuccessToastLocator()).toBeVisible({ timeout: 10000 });
    });
  });

  test('TC_005 - Attempt to save employee record without entering First Name and Last Name', async ({
    authenticatedPage: page,
    addEmployeePage,
  }) => {
    const testData = employeeData.TC_005;

    await test.step('Step 1: Leave the First Name field empty', async () => {
      await expect(addEmployeePage.getFirstNameInputLocator()).toHaveValue('');
    });

    await test.step('Step 2: Leave the Middle Name field empty', async () => {
      await expect(addEmployeePage.getMiddleNameInputLocator()).toHaveValue('');
    });

    await test.step('Step 3: Leave the Last Name field empty', async () => {
      await expect(addEmployeePage.getLastNameInputLocator()).toHaveValue('');
    });

    await test.step('Step 4: Click the Save button', async () => {
      await addEmployeePage.clickSave();
    });

    await test.step('Step 5: Assert validation error for First Name field is shown', async () => {
      await expect(addEmployeePage.getFirstNameRequiredErrorLocator()).toBeVisible();
      await expect(addEmployeePage.getFirstNameRequiredErrorLocator()).toContainText(
        testData.expectedValidationMessageFirstName
      );
    });

    await test.step('Step 6: Assert validation error for Last Name field is shown', async () => {
      await expect(addEmployeePage.getLastNameRequiredErrorLocator()).toBeVisible();
      await expect(addEmployeePage.getLastNameRequiredErrorLocator()).toContainText(
        testData.expectedValidationMessageLastName
      );
    });

    await test.step('Step 7: Assert the user remains on the Add Employee page (form not submitted)', async () => {
      await expect(page).toHaveURL(/\/pim\/addEmployee/);
      await expect(addEmployeePage.getPageHeadingLocator()).toBeVisible();
    });

    await test.step('Step 8: Verify no new employee record was inadvertently created by navigating to Employee List', async () => {
      await expect(page).not.toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\//);
    });
  });

  test('TC_006 - Create employee record using only First Name and Last Name without Middle Name', async ({
    authenticatedPage: page,
    addEmployeePage,
    personalDetailsPage,
  }) => {
    const testData = employeeData.TC_006;
    const uniqueId = EmployeeHelper.generateUniqueEmployeeId('TC006');

    await test.step(`Step 1: Enter '${testData.firstName}' into the First Name field`, async () => {
      await addEmployeePage.enterFirstName(testData.firstName);
      await expect(addEmployeePage.getFirstNameInputLocator()).toHaveValue(testData.firstName);
    });

    await test.step('Step 2: Leave the Middle Name field empty', async () => {
      await expect(addEmployeePage.getMiddleNameInputLocator()).toHaveValue('');
    });

    await test.step(`Step 3: Enter '${testData.lastName}' into the Last Name field`, async () => {
      await addEmployeePage.enterLastName(testData.lastName);
      await expect(addEmployeePage.getLastNameInputLocator()).toHaveValue(testData.lastName);
    });

    await test.step('Step 4: Set a unique Employee ID and click Save', async () => {
      await addEmployeePage.setEmployeeId(uniqueId);
      await addEmployeePage.clickSave();
    });

    await test.step('Step 5: Assert the Personal Details page for Alice Johnson is displayed', async () => {
      await addEmployeePage.waitForPersonalDetailsPage();
      await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\//);
    });

    await test.step('Step 6: Assert a success message is displayed', async () => {
      await expect(personalDetailsPage.getSuccessToastLocator()).toBeVisible({ timeout: 10000 });
    });
  });

  test('TC_009 - Enter First Name with 1 character and Last Name with maximum allowed characters', async ({
    authenticatedPage: page,
    addEmployeePage,
    personalDetailsPage,
  }) => {
    const testData = employeeData.TC_009;
    const uniqueId = EmployeeHelper.generateUniqueEmployeeId('TC009');

    await test.step(`Step 1: Enter single character '${testData.firstName}' into the First Name field`, async () =>