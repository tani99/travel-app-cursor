import { isSuccessResponse, isErrorWithCode, getGoogleSignInErrorMessage } from '../googleSignInUtils';

describe('Google Sign-In Utils', () => {
  describe('isSuccessResponse', () => {
    it('should return true for valid response with user and id', () => {
      const response = {
        user: {
          id: '123456789',
          email: 'test@example.com'
        }
      };
      expect(isSuccessResponse(response)).toBe(true);
    });

    it('should return false for response without user', () => {
      const response = { someOtherData: 'value' };
      expect(isSuccessResponse(response)).toBe(false);
    });

    it('should return false for response with user but no id', () => {
      const response = {
        user: {
          email: 'test@example.com'
        }
      };
      expect(isSuccessResponse(response)).toBe(false);
    });

    it('should return false for null or undefined response', () => {
      expect(isSuccessResponse(null)).toBe(false);
      expect(isSuccessResponse(undefined)).toBe(false);
    });
  });

  describe('isErrorWithCode', () => {
    it('should return true for error with string code', () => {
      const error = { code: 'SIGN_IN_CANCELLED' };
      expect(isErrorWithCode(error)).toBe(true);
    });

    it('should return false for error with non-string code', () => {
      const error = { code: 123 };
      expect(isErrorWithCode(error)).toBe(false);
    });

    it('should return false for error without code', () => {
      const error = { message: 'Some error' };
      expect(isErrorWithCode(error)).toBe(false);
    });

    it('should return false for null or undefined error', () => {
      expect(isErrorWithCode(null)).toBe(false);
      expect(isErrorWithCode(undefined)).toBe(false);
    });
  });

  describe('getGoogleSignInErrorMessage', () => {
    it('should return specific message for SIGN_IN_CANCELLED', () => {
      const error = { code: 'SIGN_IN_CANCELLED' };
      expect(getGoogleSignInErrorMessage(error)).toBe('Sign-in was cancelled. Please try again.');
    });

    it('should return specific message for IN_PROGRESS', () => {
      const error = { code: 'IN_PROGRESS' };
      expect(getGoogleSignInErrorMessage(error)).toBe('Sign-in is already in progress. Please wait.');
    });

    it('should return specific message for PLAY_SERVICES_NOT_AVAILABLE', () => {
      const error = { code: 'PLAY_SERVICES_NOT_AVAILABLE' };
      expect(getGoogleSignInErrorMessage(error)).toBe('Google Play Services is not available or outdated. Please update Google Play Services.');
    });

    it('should return default message for unknown error codes', () => {
      const error = { code: 'UNKNOWN_ERROR' };
      expect(getGoogleSignInErrorMessage(error)).toBe('Sign-in failed. Please try again.');
    });

    it('should return default message for error without code', () => {
      const error = { message: 'Some error' };
      expect(getGoogleSignInErrorMessage(error)).toBe('An unexpected error occurred during sign-in. Please try again.');
    });
  });
});
