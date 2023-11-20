import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyoAB1aEZrpYAWQ74kyfv5nurOjb6i_PY",
  authDomain: "mit-misports.firebaseapp.com",
  projectId: "mit-misports",
  storageBucket: "mit-misports.appspot.com",
  messagingSenderId: "253833234214",
  appId: "1:253833234214:web:de10314c35e51211fb23e7",
  measurementId: "G-413GZ0VT8F",
};

const app = initializeApp(firebaseConfig);
const projectFirestore = getFirestore(app);
const auth = getAuth(app);

// Example usage of signInWithEmailAndPassword
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Redirect or perform actions after a successful login.
  } catch (error) {
    console.error("Error signing in:", error);
    alert("An error occurred while signing in. Please check your credentials.");
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};

export {
  auth,
  projectFirestore,
  logInWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordReset,
  sendPasswordResetEmail,
  logout,
  signOut,
};
// Use the 'auth' object for other authentication-related operations.
