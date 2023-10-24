import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBb5rY8Kr4ioms9cP5Q7HXQHV8SfgFXmQM",
  authDomain: "misports-fb335.firebaseapp.com",
  projectId: "misports-fb335",
  storageBucket: "misports-fb335.appspot.com",
  messagingSenderId: "160201280710",
  appId: "1:160201280710:web:52a7f548e0b2cfa61e5bc7",
  measurementId: "G-74YMV2ZXJG",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
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
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordReset,
  sendPasswordResetEmail,
  logout,
};
