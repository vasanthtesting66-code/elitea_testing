import { Page, BrowserContext } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ENV } from '../config/environment';

export class AuthHelper {
  static async login(page: Page, username: string, password: string): Promise<void> {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(username, password);
    await page.waitForURL(/\/dashboard\/index/, { timeout: 15000 });
    await page.waitForLoadState('networkidle');
  }

  static async loginAsAdmin(page: Page): Promise<void> {
    await AuthHelper.login(page, ENV.ADMIN_USERNAME, ENV.ADMIN_PASSWORD);
  }

  static async saveAuthState(context: BrowserContext, storageFile: string): Promise<void> {
    await context.storageState({ path: storageFile });
  }

  static isOnLoginPage(page: Page): boolean {
    return page.url().includes('/auth/login');
  }

  static isOnDashboard(page: Page): boolean {
    return page.url().includes('/dashboard/index');
  }
}
