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
  apiKey: "AIzaSyCDQZiBFjubFYE0ZzNY7KSDJqOk_3ms1hc",
  authDomain: "misports-af0ce.firebaseapp.com",
  projectId: "misports-af0ce",
  storageBucket: "misports-af0ce.appspot.com",
  messagingSenderId: "373399957215",
  appId: "1:373399957215:web:e65030f5b5ad480964c36a",
  measurementId: "G-F5X55NFZ49",
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
