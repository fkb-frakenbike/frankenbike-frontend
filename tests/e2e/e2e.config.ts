// URL of the Next.js front (not the API).
export const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:3000';

export const ROUTES = {
  login: `${BASE_URL}/login`,
  feed: `${BASE_URL}/feed`,
  register: `${BASE_URL}/register`,
} as const;

export const TEST_USERS = {
  valid: {
    email: 'anael@example.com',
    password: 'password',
  },
  invalid: {
    email: 'wrong@example.com',
    password: 'wrongpassword',
  },
} as const;
