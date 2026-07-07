import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const environment = {
  baseUrl: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/web/index.php',
  adminUsername: process.env.ADMIN_USERNAME || 'Admin',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
  invalidUsername: process.env.INVALID_USERNAME || 'InvalidUser',
  invalidPassword: process.env.INVALID_PASSWORD || 'WrongPassword123',
  navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT) || 30000,
  actionTimeout: Number(process.env.ACTION_TIMEOUT) || 10000,
};
