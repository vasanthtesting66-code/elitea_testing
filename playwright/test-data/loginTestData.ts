/**
 * loginTestData.ts
 * Centralised test-data file for all login-related test cases.
 * Import this file in spec files; never hardcode test data inline.
 */

export interface LoginTestData {
  username: string;
  password: string;
}

export interface ValidationMessages {
  username: string;
  password: string;
}

/** TC_014 – Both fields empty */
export const TC_014_DATA: {
  input: LoginTestData;
  expectedValidationMessages: ValidationMessages;
} = {
  input: {
    username: '',
    password: '',
  },
  expectedValidationMessages: {
    username: 'Required',
    password: 'Required',
  },
};
