export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginTestData {
  validCredentials: LoginCredentials;
  invalidUsernameCredentials: LoginCredentials;
  invalidPasswordCredentials: LoginCredentials;
  emptyCredentials: LoginCredentials;
  emptyUsernameCredentials: LoginCredentials;
  maxLengthCredentials: LoginCredentials;
}

export const loginTestData: LoginTestData = {
  validCredentials: {
    username: 'Admin',
    password: 'admin123',
  },
  invalidUsernameCredentials: {
    username: 'InvalidUser123',
    password: 'admin123',
  },
  invalidPasswordCredentials: {
    username: 'Admin',
    password: 'wrongPassword!@#',
  },
  emptyCredentials: {
    username: '',
    password: '',
  },
  emptyUsernameCredentials: {
    username: '',
    password: 'admin123',
  },
  maxLengthCredentials: {
    username: 'A'.repeat(100),
    password: 'B'.repeat(100),
  },
};

export const expectedMessages = {
  invalidCredentials: 'Invalid credentials',
  requiredField: 'Required',
} as const;
