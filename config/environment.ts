import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const Environment = {
  baseUrl: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
  validUsername: process.env.VALID_USERNAME || 'Admin',
  validPassword: process.env.VALID_PASSWORD || 'admin123',
  loginPath: process.env.LOGIN_URL || '/web/index.php/auth/login',
  dashboardPath: process.env.DASHBOARD_URL || '/web/index.php/dashboard/index',
} as const;

export type EnvironmentConfig = typeof Environment;
