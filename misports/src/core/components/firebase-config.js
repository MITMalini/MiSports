import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5ACDuReq4qjWG31Vx2pmImyIzO6Smt1E",
  authDomain: "misports-5ddb1.firebaseapp.com",
  projectId: "misports-5ddb1",
  storageBucket: "misports-5ddb1.appspot.com",
  messagingSenderId: "223044137002",
  appId: "1:223044137002:web:b4d26942619ed9507f9353",
  measurementId: "G-XBRZ6CTJPN",
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
const registerWithEmailAndPassword = async (name, email, password, role) => {
  try {
    // You can use the 'auth' instance directly here
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Use the 'projectFirestore' instance for Firestore operations
    console.log("User registered successfully!");
    return userCredential;
  } catch (error) {
    console.error("Error Creating Count in:", error.message);
    alert(`An error occurred while signing up: ${error.message}`);
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
  registerWithEmailAndPassword,
  sendPasswordReset,
  sendPasswordResetEmail,
  logout,
  signOut,
};
// Use the 'auth' object for other authentication-related operations.
