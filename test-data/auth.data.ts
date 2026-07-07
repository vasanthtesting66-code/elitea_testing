/**
 * Test data definitions for the Authentication module.
 * Sourced from testcase_res JSON – never hardcoded in spec files.
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthTestData {
  validAdmin: LoginCredentials;
  invalidUsername: LoginCredentials;
  invalidPassword: LoginCredentials;
  emptyCredentials: LoginCredentials;
  emptyUsernameValidPassword: LoginCredentials;
  whitespaceCredentials: LoginCredentials;
  lowercaseUsername: LoginCredentials;
}

export const AUTH_TEST_DATA: AuthTestData = {
  /** TC_001 – Valid admin credentials */
  validAdmin: {
    username: 'Admin',
    password: 'admin123',
  },

  /** TC_002 – Invalid username with valid password */
  invalidUsername: {
    username: 'InvalidUser',
    password: 'admin123',
  },

  /** TC_003 – Valid username with invalid password */
  invalidPassword: {
    username: 'Admin',
    password: 'wrongpassword',
  },

  /** TC_004 – Both fields empty */
  emptyCredentials: {
    username: '',
    password: '',
  },

  /** TC_008 – Empty username with valid password */
  emptyUsernameValidPassword: {
    username: '',
    password: 'admin123',
  },

  /** TC_009 – Whitespace-only values */
  whitespaceCredentials: {
    username: '     ',
    password: '     ',
  },

  /** TC_010 – Lowercase username */
  lowercaseUsername: {
    username: 'admin',
    password: 'admin123',
  },
};

export const ERROR_MESSAGES = {
  invalidCredentials: 'Invalid credentials',
  requiredField: 'Required',
} as const;

export const APP_URLS = {
  login: '/web/index.php/auth/login',
  dashboard: '/web/index.php/dashboard/index',
} as const;
