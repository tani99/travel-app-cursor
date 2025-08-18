// Utility functions for Google Sign-In response handling

/**
 * Check if the Google Sign-In response is successful
 * @param {Object} response - The response from GoogleSignin.signIn()
 * @returns {boolean} - True if the response indicates a successful sign-in
 */
export const isSuccessResponse = (response) => {
  return !!(response && response.user && response.user.id);
};

/**
 * Check if the error has a code property (Google Sign-In specific error)
 * @param {Error} error - The error object from catch block
 * @returns {boolean} - True if the error has a code property
 */
export const isErrorWithCode = (error) => {
  return !!(error && typeof error.code === 'string');
};

/**
 * Get user-friendly error message for Google Sign-In errors
 * @param {Error} error - The error object from catch block
 * @returns {string} - User-friendly error message
 */
export const getGoogleSignInErrorMessage = (error) => {
  if (!isErrorWithCode(error)) {
    return 'An unexpected error occurred during sign-in. Please try again.';
  }

  switch (error.code) {
    case 'SIGN_IN_CANCELLED':
      return 'Sign-in was cancelled. Please try again.';
    case 'IN_PROGRESS':
      return 'Sign-in is already in progress. Please wait.';
    case 'PLAY_SERVICES_NOT_AVAILABLE':
      return 'Google Play Services is not available or outdated. Please update Google Play Services.';
    case 'SIGN_IN_REQUIRED':
      return 'Please sign in to your Google account first.';
    case 'SIGN_IN_FAILED':
      return 'Sign-in failed. Please check your internet connection and try again.';
    default:
      return 'Sign-in failed. Please try again.';
  }
};
