import { test as baseTest, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { NavigationPage } from '../pages/NavigationPage';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import { EmployeeListPage } from '../pages/EmployeeListPage';
import { PersonalDetailsPage } from '../pages/PersonalDetailsPage';
import { AuthHelper } from '../utils/AuthHelper';

export type PageObjectFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  navigationPage: NavigationPage;
  addEmployeePage: AddEmployeePage;
  employeeListPage: EmployeeListPage;
  personalDetailsPage: PersonalDetailsPage;
  authenticatedPage: Page;
};

export const test = baseTest.extend<PageObjectFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  navigationPage: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },

  addEmployeePage: async ({ page }, use) => {
    await use(new AddEmployeePage(page));
  },

  employeeListPage: async ({ page }, use) => {
    await use(new EmployeeListPage(page));
  },

  personalDetailsPage: async ({ page }, use) => {
    await use(new PersonalDetailsPage(page));
  },

  authenticatedPage: async ({ page }, use) => {
    await AuthHelper.loginAsAdmin(page);
    await use(page);
  },
});

export { expect };
