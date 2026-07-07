export class StringHelper {
  static randomAlphanumeric(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static toExactLength(value: string, length: number, padChar = 'a'): string {
    if (value.length >= length) return value.substring(0, length);
    return value.padEnd(length, padChar);
  }

  static normalise(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
  }
}
