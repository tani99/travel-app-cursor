import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOhItVy6QJaENyZxAc57_e_YOiWl_mq_c",
  authDomain: "travel-planner-codex.firebaseapp.com",
  projectId: "travel-planner-codex",
  storageBucket: "travel-planner-codex.firebasestorage.app",
  messagingSenderId: "807049061422",
  appId: "1:807049061422:web:adacaf28604ed87a94ebbf",
  measurementId: "G-R1MEKTJW2R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;
