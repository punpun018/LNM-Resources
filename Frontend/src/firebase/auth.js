import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import app from "../firebase"; // Import Firebase app

// Initialize Firebase Authentication
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

/**
 * Sign in with Google
 * @returns {Promise<object>} User object if successful, else null
 */
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user; // Return user data on success
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
    return null;
  }
};

/**
 * Sign out the current user
 * @returns {Promise<boolean>} True if successful, false otherwise
 */
export const logout = async () => {
  try {
    await signOut(auth);
    return true; // Return true on successful logout
  } catch (error) {
    console.error("Logout Error:", error.message);
    return false;
  }
};

/**
 * Listen to authentication state changes
 * @param {function} callback - Function to handle user state change
 * @returns {function} Unsubscribe function
 */
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Get the currently logged-in user
 * @returns {object|null} User object if logged in, else null
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};
