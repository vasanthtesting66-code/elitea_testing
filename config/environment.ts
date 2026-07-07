import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const ENV = {
  BASE_URL: process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com',

  CREDENTIALS: {
    VALID: {
      username: process.env.ADMIN_USERNAME ?? 'Admin',
      password: process.env.ADMIN_PASSWORD ?? 'admin123',
    },
    INVALID_USER: {
      username: process.env.INVALID_USERNAME ?? 'InvalidUser123',
      password: process.env.ADMIN_PASSWORD ?? 'admin123',
    },
    INVALID_PASSWORD: {
      username: process.env.ADMIN_USERNAME ?? 'Admin',
      password: process.env.INVALID_PASSWORD ?? 'wrongpassword',
    },
    CASE_SENSITIVE: {
      username: process.env.ADMIN_USERNAME ?? 'Admin',
      password: process.env.CASE_SENSITIVE_PASSWORD ?? 'Admin123',
    },
    EMPTY: {
      username: '',
      password: '',
    },
    EMPTY_USERNAME: {
      username: '',
      password: process.env.ADMIN_PASSWORD ?? 'admin123',
    },
  },

  URLS: {
    LOGIN: process.env.LOGIN_URL ?? '/web/index.php/auth/login',
    DASHBOARD: process.env.DASHBOARD_URL ?? '/web/index.php/dashboard/index',
    PIM: process.env.PIM_URL ?? '/web/index.php/pim/viewPimModule',
  },
} as const;
