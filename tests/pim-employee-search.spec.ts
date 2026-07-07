import { test, expect } from '../fixtures/authenticated.fixture';
import { employeeData, pimNavigation } from '../test-data/employee.data';

test.describe('PIM – Employee List Search Feature', () => {
  test('TC_008 – Newly added employee appears in Employee List search results with matching details', async ({
    authenticatedPage,
    addEmployeePage,
    personalDetailsPage,
    pimNavigationPage,
    employeeListPage,
  }) => {
    const addData = employeeData.fullDetailsEmployee;
    const searchData = employeeData.searchEmployee;

    await test.step('Pre-condition – Create employee John William Smith', async () => {
      await addEmployeePage.navigateToAddEmployee();
      await addEmployeePage.enterFirstName(addData.firstName);
      await addEmployeePage.enterMiddleName(addData.middleName);
      await addEmployeePage.enterLastName(addData.lastName);
      const existingId = await addEmployeePage.getEmployeeIdValue();
      if (!existingId || existingId.trim() === '') {
        await addEmployeePage.enterEmployeeId(addData.employeeId);
      }
      await addEmployeePage.clickSave();
      await expect(personalDetailsPage.getPageHeadingLocator()).toBeVisible({ timeout: 15000 });
    });

    await test.step('Step 1 – Navigate to PIM Employee List page', async () => {
      await pimNavigationPage.navigateToEmployeeList();
      expect(authenticatedPage.url()).toContain(pimNavigation.expectedEmployeeListUrl);
      expect(await employeeListPage.isEmployeeListPageDisplayed()).toBe(true);
    });

    await test.step('Step 2 – Enter employee first name in the search field', async () => {
      await employeeListPage.searchByEmployeeName(searchData.searchFirstName);
    });

    await test.step('Step 3 – Click the Search button', async () => {
      await employeeListPage.clickSearch();
    });

    await test.step('Step 4 – Observe the search results table', async () => {
      expect(await employeeListPage.isResultsTableVisible()).toBe(true);
    });

    await test.step('Step 5 – Verify employee details in the search results match the entered data', async () => {
      const isFound = await employeeListPage.isEmployeeInResults(
        searchData.expectedFirstName,
        searchData.expectedLastName
      );
      expect(isFound).toBe(true);
    });
  });
});