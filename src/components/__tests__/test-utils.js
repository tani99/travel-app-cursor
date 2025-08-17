import React from 'react';
import { render } from '@testing-library/react-native';

/**
 * Custom render function that includes common providers and context
 * This can be extended as the app grows to include AuthContext, Navigation, etc.
 */
const customRender = (ui, options = {}) => {
  const AllTheProviders = ({ children }) => {
    return children;
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
};

/**
 * Mock data generators for consistent test data
 */
export const mockData = {
  user: {
    email: 'test@example.com',
    password: 'testPassword123',
    displayName: 'Test User',
  },
  authError: {
    code: 'auth/user-not-found',
    message: 'No user found with this email address.',
  },
  formData: {
    email: 'form@example.com',
    password: 'formPassword123',
    confirmPassword: 'formPassword123',
  },
};

/**
 * Common test assertions for form validation
 */
export const formAssertions = {
  expectRequiredField: (element) => {
    expect(element).toBeTruthy();
  },
  expectEmailFormat: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(email)).toBe(true);
  },
  expectPasswordStrength: (password) => {
    expect(password.length).toBeGreaterThanOrEqual(6);
  },
  expectPasswordMatch: (password, confirmPassword) => {
    expect(password).toBe(confirmPassword);
  },
};

/**
 * Common test utilities for async operations
 */
export const asyncUtils = {
  waitFor: (ms = 100) => new Promise(resolve => setTimeout(resolve, ms)),
  waitForElement: async (getElement, timeout = 5000) => {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      try {
        const element = getElement();
        if (element) return element;
      } catch (error) {
        // Element not found, continue waiting
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error('Element not found within timeout');
  },
};

/**
 * Mock functions for common operations
 */
export const mockFunctions = {
  mockNavigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    push: jest.fn(),
    pop: jest.fn(),
  },
  mockAuth: {
    signIn: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
    resetPassword: jest.fn(),
  },
  mockAlert: {
    alert: jest.fn(),
  },
};

/**
 * Test environment setup helpers
 */
export const testSetup = {
  clearMocks: () => {
    jest.clearAllMocks();
  },
  resetModules: () => {
    jest.resetModules();
  },
  restoreMocks: () => {
    jest.restoreAllMocks();
  },
};

// Re-export everything from @testing-library/react-native
export * from '@testing-library/react-native';

// Override render with our custom version
export { customRender as render };
