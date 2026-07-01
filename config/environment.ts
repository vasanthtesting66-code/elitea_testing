import * as dotenv from 'dotenv';

dotenv.config();

export interface EnvironmentConfig {
  baseUrl: string;
  adminUsername: string;
  adminPassword: string;
  invalidUsername: string;
  invalidPassword: string;
  caseSensitivePassword: string;
  dashboardUrl: string;
  loginUrl: string;
  adminModuleUrl: string;
}

function requireEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const ENV: EnvironmentConfig = {
  baseUrl: requireEnv('BASE_URL', 'https://opensource-demo.orangehrmlive.com'),
  adminUsername: requireEnv('ADMIN_USERNAME', 'Admin'),
  adminPassword: requireEnv('ADMIN_PASSWORD', 'admin123'),
  invalidUsername: requireEnv('INVALID_USERNAME', 'InvalidUser123'),
  invalidPassword: requireEnv('INVALID_PASSWORD', 'WrongPassword!99'),
  caseSensitivePassword: requireEnv('CASE_SENSITIVE_PASSWORD', 'ADMIN123'),
  dashboardUrl: requireEnv('DASHBOARD_URL', '/web/index.php/dashboard/index'),
  loginUrl: requireEnv('LOGIN_URL', '/web/index.php/auth/login'),
  adminModuleUrl: requireEnv('ADMIN_MODULE_URL', '/web/index.php/admin/viewAdminModule')
};