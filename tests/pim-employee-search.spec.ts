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
    const