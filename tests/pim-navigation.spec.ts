import { test, expect } from '../fixtures/authenticated.fixture';
import { pimNavigation } from '../test-data/employee.data';

test.describe('PIM – Navigation Feature', () => {
  test('TC_003 – HR Administrator navigates to Add Employee page via PIM module', async ({
    authenticatedPage,
    pimNavigationPage,
    addEmployeePage,
  }) => {
    await test.step('Step 1 – Click on the PIM menu item in the left navigation panel', async () => {
      await pimNavigationPage.clickPimSideNavLink();
      expect(authenticatedPage.url()).toContain('/pim/');
    });

    await test.step('Step 2 – Click on Add Employee from the PIM submenu', async () => {
      await pimNavigationPage.clickAddEmployeeLink();
    });

    await test.step('Step 3 – Verify the page URL contains /pim/addEmployee', async () => {
      expect(authenticatedPage.url()).toContain(pimNavigation.expectedAddEmployeeUrl);
    });

    await test.step('Step 4 – Verify the page heading displays Add Employee', async () => {
      await expect(addEmployeePage.getPageHeadingLocator()).toBeVisible();
      await expect(addEmployeePage.getPageHeadingLocator()).toHaveText(
        pimNavigation.expectedAddEmployeeHeading
      );
    });

    await test.step('Step 5 – Verify all required input fields are displayed on the Add Employee form', async () => {
      expect(await addEmployeePage.isFirstNameInputVisible()).toBe(true);
      expect(await addEmployeePage.isMiddleNameInputVisible()).toBe(true);
      expect(await addEmployeePage.isLastNameInputVisible()).toBe(true);
      expect(await addEmployeePage.isEmployeeIdInputVisible()).toBe(true);
    });
  });
});
