export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginTestData {
  validCredentials: LoginCredentials;
  invalidUsername: LoginCredentials;
  invalidPassword: LoginCredentials;
  caseSensitivePassword: LoginCredentials;
  emptyCredentials: LoginCredentials;
  emptyUsernameWithPassword: LoginCredentials;
}

export interface AuthMessages {
  invalidCredentials: string;
  requiredField: string;
}

export const AUTH_MESSAGES: AuthMessages = {
  invalidCredentials: 'Invalid credentials',
  requiredField: 'Required',
};

export const AUTH_PAGE_ELEMENTS = {
  loginHeading: 'Login',
  loginButton: 'Login',
  forgotPasswordText: 'Forgot your password?',
  companyBrandingAlt: 'company-branding',
  orangehrmLogoAlt: 'orangehrm-logo',
  usernameLabel: 'Username',
  passwordLabel: 'Password',
  dashboardHeading: 'Dashboard',
  userProfileImageAlt: 'profile picture',
} as const;

export const NAV_ITEMS = {
  PIM: 'PIM',
  DASHBOARD: 'Dashboard',
  ADMIN: 'Admin',
  LEAVE: 'Leave',
} as const;
