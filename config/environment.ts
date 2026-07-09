import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const ENV = {
  BASE_URL: process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com/web/index.php',
  ADMIN_USERNAME: process.env.ADMIN_USERNAME ?? 'Admin',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? 'admin123',
  INVALID_USERNAME: process.env.INVALID_USERNAME ?? 'invalidUser',
  INVALID_PASSWORD: process.env.INVALID_PASSWORD ?? 'wrongPassword123',
  TIMEOUT: parseInt(process.env.TIMEOUT ?? '30000'),
} as const;

export type Environment = typeof ENV;
