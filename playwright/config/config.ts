import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL ?? 'https://your-app-domain.com',

  routes: {
    login: '/login',
    dashboard: '/dashboard',
  },

  timeouts: {
    /** Default element wait */
    element: 10_000,
    /** Network/navigation wait */
    navigation: 30_000,
    /** Lockout message appearance */
    lockout: 15_000,
  },

  lockout: {
    /**
     * Number of consecutive failed attempts that trigger a lockout.
     * Maps to TC_014 > testData.input.numberOfAttempts = 3
     */
    maxFailedAttempts: Number(process.env.LOCKOUT_MAX_ATTEMPTS ?? 3),
  },

  captcha: {
    /**
     * Set CAPTCHA_BYPASS_TOKEN in .env when the test environment
     * exposes a bypass / test token for Cloudflare Turnstile.
     * Leave empty to rely on the CaptchaHelper auto-solve strategy.
     */
    bypassToken: process.env.CAPTCHA_BYPASS_TOKEN ?? '',
  },
} as const;
