import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

/**
 * Centralised environment configuration.
 * All environment-dependent values are resolved here.
 * No environment value is read directly inside tests or page objects.
 */
export const ENV = {
  baseUrl: process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com',

  paths: {
    login: process.env.LOGIN_PATH ?? '/web/index.php/auth/login',
    dashboard: process.env.DASHBOARD_PATH ?? '/web/index.php/dashboard/index',
  },

  credentials: {
    admin: {
      username: process.env.ADMIN_USERNAME ?? 'Admin',
      password: process.env.ADMIN_PASSWORD ?? 'admin123',
    },
  },

  timeouts: {
    default: Number(process.env.DEFAULT_TIMEOUT) || 30000,
    navigation: Number(process.env.NAVIGATION_TIMEOUT) || 30000,
    action: Number(process.env.ACTION_TIMEOUT) || 10000,
  },
} as const;

export type Environment = typeof ENV;
