import { test, expect } from '../fixtures/base.fixture';
import { EmployeeHelper } from '../utils/EmployeeHelper';
import employeeData from '../test-data/employees.json';

test.describe('PIM Module - Employee List Feature (TC_007, TC_008)', () => {
  let createdEmployeeId: string;
  let createdFirstName: string;
  let createdLastName: string;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const { AuthHelper } = await import('../utils/AuthHelper');
    await AuthHelper.loginAsAdmin(page);

    const uniqueId = EmployeeHelper.generateUniqueEmployeeId('TC007');
    const created = await EmployeeHelper.createEmployee(page, {
      firstName: 'John',
      middleName: 'Edward',
      lastName: 'Smith',
      employeeId: uniqueId,
    });

    createdEmployeeId = created.employeeId;
    createdFirstName = created.firstName;
    createdLastName = created.lastName;

    await context.close();
  });

  test.beforeEach(async ({ authenticatedPage: page, navigationPage }) => {
    await navigationPage.navigateToEmployeeList();
    await expect(page).toHaveURL(/\/pim\/viewEmployeeList/);
  });

  test('TC_007 - Search for newly created employee in Employee List and verify record exists', async ({
    authenticatedPage: page,
    employeeListPage,
  }) => {
    await test.step('Step 1: Click on PIM in the navigation menu', async () => {
      await expect(page.getByRole('navigation', { name: 'Topbar Menu' }).getByRole('link', { name: 'Employee List' })).toBeVisible();
    });

    await test.step('Step 2: Confirm Employee List page is loaded with a search form', async () => {
      await expect(employeeListPage.getPageHeadingLocator()).toBeVisible();
      await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
    });

    await test.step(`Step 3: Enter '${createdFirstName}' in the Employee Name search field`, async () => {
      await employeeListPage.searchByEmployeeName(createdFirstName);
    });

    await test.step('Step 4: Click the Search button (performed within searchByEmployeeName)', async () => {
      await expect(page.getByRole('table')).toBeVisible();
    });

    await test.step(`Step 5: Assert that '${createdFirstName} ${createdLastName}' appears in the results table`, async () => {
      const isFound = await employeeListPage.isEmployeeInResults(createdFirstName, createdLastName);
      expect(isFound).toBe(true);
    });

    await test.step('Step 6: Assert the Employee ID in the results matches the ID assigned during creation', async () => {
      const row = employeeListPage.getRowByLastName(createdLastName);
      const rowCount = await row.count();
      expect(rowCount).toBeGreaterThan(0);
      const rows = row.filter({ hasText: createdFirstName });
      await expect(rows.first()).toContainText(createdEmployeeId);
    });
  });

  test('TC_008 - Verify employee details in Employee List match data entered during creation', async ({
    authenticatedPage: page,
    employeeListPage,
  }) => {
    await test.step('Step 1: Navigate to PIM Employee List (handled in beforeEach)', async () => {
      await expect(employeeListPage.getPageHeadingLocator()).toBeVisible();
    });

    await test.step(`Step 2: Search for employee '${createdFirstName} ${createdLastName}'`, async () => {
      await employeeListPage.searchByEmployeeName(createdFirstName);
      await expect(page.getByRole('table')).toBeVisible();
    });

    await test.step(`Step 3 & 4: Locate the row for '${createdFirstName} ${createdLastName}' and assert the name matches`, async () => {
      const row = employeeListPage.getRowByLastName(createdLastName).filter({ hasText: createdFirstName }).first();
      await expect(row).toBeVisible();
      const firstName = await employeeListPage.getFirstNameFromRow(row);
      expect(firstName.trim()).toContain(createdFirstName);
    });

    await test.step('Step 5 & 6: Read the Employee ID from the row and assert it matches the value assigned during creation', async () => {
      const row = employeeListPage.getRowByLastName(createdLastName).filter({ hasText: createdFirstName }).first();
      const employeeId = await employeeListPage.getEmployeeIdFromRow(row);
      expect(employeeId.trim()).toBe(createdEmployeeId);
    });
  });
});
