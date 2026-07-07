import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PimNavigationPage } from '../pages/PimNavigationPage';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import { PersonalDetailsPage } from '../pages/PersonalDetailsPage';
import { EmployeeListPage } from '../pages/EmployeeListPage';

export type PageFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  pimNavigationPage: PimNavigationPage;
  addEmployeePage: AddEmployeePage;
  personalDetailsPage: PersonalDetailsPage;
  employeeListPage: EmployeeListPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  pimNavigationPage: async ({ page }, use) => {
    await use(new PimNavigationPage(page));
  },
  addEmployeePage: async ({ page }, use) => {
    await use(new AddEmployeePage(page));
  },
  personalDetailsPage: async ({ page }, use) => {
    await use(new PersonalDetailsPage(page));
  },
  employeeListPage: async ({ page }, use) => {
    await use(new EmployeeListPage(page));
  },
});

export { expect } from '@playwright/test';
