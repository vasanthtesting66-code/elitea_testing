import { ENV } from '../config/environment';

export class UrlHelper {
  /**
   * Builds a full URL from a relative path
   */
  static buildUrl(path: string): string {
    const base = ENV.BASE_URL.replace(/\/$/, '');
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${normalizedPath}`;
  }

  /**
   * Checks if a given URL contains a path segment
   */
  static urlContains(url: string, segment: string): boolean {
    return url.includes(segment);
  }

  /**
   * Returns the full dashboard URL
   */
  static getDashboardUrl(): string {
    return UrlHelper.buildUrl(ENV.URLS.DASHBOARD);
  }

  /**
   * Returns the full login URL
   */
  static getLoginUrl(): string {
    return UrlHelper.buildUrl(ENV.URLS.LOGIN);
  }

  /**
   * Returns the full PIM URL
   */
  static getPimUrl(): string {
    return UrlHelper.buildUrl(ENV.URLS.PIM);
  }
}
