import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PimNavigationPage } from '../pages/PimNavigationPage';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import { PersonalDetailsPage } from '../pages/PersonalDetailsPage';
import { EmployeeListPage } from '../pages/EmployeeListPage';
import { environment } from '../config/environment';

export type AuthenticatedFixtures = {
  authenticatedPage: Page;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  pimNavigationPage: PimNavigationPage;
  addEmployeePage: AddEmployeePage;
  personalDetailsPage: PersonalDetailsPage;
  employeeListPage: EmployeeListPage;
};

export const test = base.extend<AuthenticatedFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(environment.adminUsername, environment.adminPassword);
    await page.waitForURL('**/dashboard/index', { timeout: 15000 });
    await use(page);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ authenticatedPage }, use) => {
    await use(new DashboardPage(authenticatedPage));
  },
  pimNavigationPage: async ({ authenticatedPage }, use) => {
    await use(new PimNavigationPage(authenticatedPage));
  },
  addEmployeePage: async ({ authenticatedPage }, use) => {
    await use(new AddEmployeePage(authenticatedPage));
  },
  personalDetailsPage: async ({ authenticatedPage }, use) => {
    await use(new PersonalDetailsPage(authenticatedPage));
  },
  employeeListPage: async ({ authenticatedPage }, use) => {
    await use(new EmployeeListPage(authenticatedPage));
  },
});

export { expect } from '@playwright/test';
