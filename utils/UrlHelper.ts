import { Environment } from '../config/environment';

export class UrlHelper {
  static buildUrl(path: string): string {
    const base = Environment.baseUrl.replace(/\/$/, '');
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${normalizedPath}`;
  }

  static getLoginUrl(): string {
    return UrlHelper.buildUrl(Environment.loginPath);
  }

  static getDashboardUrl(): string {
    return UrlHelper.buildUrl(Environment.dashboardPath);
  }

  static isLoginUrl(url: string): boolean {
    return url.includes(Environment.loginPath);
  }

  static isDashboardUrl(url: string): boolean {
    return url.includes('/dashboard/index');
  }
}
