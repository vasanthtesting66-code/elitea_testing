export class UrlHelper {
  static buildUrl(baseUrl: string, path: string): string {
    return `${baseUrl.replace(/\/$/, '')}${path}`;
  }

  static urlContains(url: string, fragment: string): boolean {
    return url.includes(fragment);
  }

  static getPath(url: string): string {
    try {
      return new URL(url).pathname;
    } catch {
      return url;
    }
  }
}
