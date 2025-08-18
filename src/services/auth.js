import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { auth, googleProvider } from '../config/firebase';
import { getUserFriendlyError } from '../utils/errorMessages';
import { isSuccessResponse, isErrorWithCode, getGoogleSignInErrorMessage } from '../utils/googleSignInUtils';

// Register with email and password
export const registerWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { 
      success: false, 
      error: getUserFriendlyError(error, 'registration'),
      originalError: error.message 
    };
  }
};

// Login with email and password
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { 
      success: false, 
      error: getUserFriendlyError(error, 'login'),
      originalError: error.message 
    };
  }
};

// Login with Gmail using Google Sign-In
export const loginWithGmail = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    
    if (isSuccessResponse(response)) {
      // Get the ID token from Google Sign-In
      const { idToken } = await GoogleSignin.getTokens();
      
      // Create a credential for Firebase
      const credential = GoogleAuthProvider.credential(idToken);
      
      // Sign in to Firebase with the credential
      const result = await signInWithCredential(auth, credential);
      
      return { success: true, user: result.user };
    } else {
      // Sign in was cancelled by user
      return { 
        success: false, 
        error: 'Sign-in was cancelled',
        originalError: 'User cancelled sign-in'
      };
    }
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          return { 
            success: false, 
            error: 'Sign-in is already in progress. Please wait.',
            originalError: error.message 
          };
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          return { 
            success: false, 
            error: 'Google Play Services is not available or outdated. Please update Google Play Services.',
            originalError: error.message 
          };
        default:
          return { 
            success: false, 
            error: getGoogleSignInErrorMessage(error),
            originalError: error.message 
          };
      }
    } else {
      // An error that's not related to Google Sign-In occurred
      return { 
        success: false, 
        error: getUserFriendlyError(error, 'gmail'),
        originalError: error.message 
      };
    }
  }
};

// Logout
export const logout = async () => {
  try {
    // Sign out from Firebase
    await signOut(auth);
    
    // Sign out from Google Sign-In
    try {
      await GoogleSignin.signOut();
    } catch (googleSignOutError) {
      // Ignore Google Sign-In sign out errors as they're not critical
      console.warn('Google Sign-In sign out error:', googleSignOutError);
    }
    
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: getUserFriendlyError(error, 'logout'),
      originalError: error.message 
    };
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    console.log('Firebase: Attempting to send password reset email to:', email);
    
    // Validate email format before sending to Firebase
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      console.error('Firebase: Invalid email format:', email);
      return { 
        success: false, 
        error: { 
          code: 'auth/invalid-email',
          message: 'Please enter a valid email address.' 
        } 
      };
    }

    await sendPasswordResetEmail(auth, email);
    console.log('Firebase: Password reset email sent successfully to:', email);
    
    return { 
      success: true,
      message: 'Password reset email sent successfully'
    };
  } catch (error) {
    console.error('Firebase: Password reset error:', {
      code: error.code,
      message: error.message,
      email: email
    });
    
    // Return structured error information
    return { 
      success: false, 
      error: {
        code: error.code,
        message: getUserFriendlyError(error, 'password-reset'),
        originalMessage: error.message
      }
    };
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Check if user is signed in with Google Sign-In
export const isSignedIn = async () => {
  try {
    return await GoogleSignin.isSignedIn();
  } catch (error) {
    console.warn('Error checking Google Sign-In status:', error);
    return false;
  }
};

// Get current user from Google Sign-In
export const getCurrentUser = async () => {
  try {
    return await GoogleSignin.getCurrentUser();
  } catch (error) {
    console.warn('Error getting current Google Sign-In user:', error);
    return null;
  }
};
