export const authData = {
  validCredentials: {
    username: process.env.ADMIN_USERNAME || 'Admin',
    password: process.env.ADMIN_PASSWORD || 'admin123',
  },
  invalidCredentials: {
    username: process.env.INVALID_USERNAME || 'InvalidUser',
    password: process.env.INVALID_PASSWORD || 'WrongPassword123',
    expectedErrorMessage: 'Invalid credentials',
  },
  expectedUrls: {
    loginPage: '/auth/login',
    dashboard: '/dashboard/index',
  },
  expectedTitles: {
    dashboard: 'Dashboard',
    login: 'Login',
  },
};
