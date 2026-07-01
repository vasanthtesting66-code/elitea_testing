/**
 * urlHelper.ts
 * Utility functions for URL construction and assertion.
 */
import { config } from '../config/config';

/**
 * Resolves a relative path against the configured base URL.
 * @param relativePath - relative path (e.g. '/web/index.php/auth/login')
 */
export function resolveUrl(relativePath: string): string {
  return `${config.baseUrl}${relativePath}`;
}

/** Known application routes */
export const Routes = {
  login:     '/web/index.php/auth/login',
  dashboard: '/web/index.php/dashboard/index',
} as const;
