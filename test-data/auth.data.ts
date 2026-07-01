import { ENV } from '../config/environment';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthTestData {
  validCredentials: LoginCredentials;
  invalidUsernameCredentials: LoginCredentials;
  invalidPasswordCredentials: LoginCredentials;
  caseSensitivePasswordCredentials: LoginCredentials;
  emptyCredentials: LoginCredentials;
  emptyUsernameCredentials: LoginCredentials;
}

export const AUTH_TEST_DATA: AuthTestData = {
  validCredentials: {
    username: ENV.adminUsername,
    password: ENV.adminPassword
  },
  invalidUsernameCredentials: {
    username: ENV.invalidUsername,
    password: ENV.adminPassword
  },
  invalidPasswordCredentials: {
    username: ENV.adminUsername,
    password: ENV.invalidPassword
  },
  caseSensitivePasswordCredentials: {
    username: ENV.adminUsername,
    password: ENV.caseSensitivePassword
  },
  emptyCredentials: {
    username: '',
    password: ''
  },
  emptyUsernameCredentials: {
    username: '',
    password: ENV.adminPassword
  }
};

export const AUTH_MESSAGES = {
  invalidCredentials: 'Invalid credentials',
  requiredField: 'Required'
} as const;

export const AUTH_URLS = {
  login: '/web/index.php/auth/login',
  dashboard: '/web/index.php/dashboard/index',
  adminModule: '/web/index.php/admin/viewAdminModule'
} as const;