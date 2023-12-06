import React, { createContext, useContext, useEffect, useState } from "react";
import { projectFirestore } from "../components/firebase-config";

// Create a context to store user information
const AuthContext = createContext();

// Create an AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = projectFirestore
      .auth()
      .onAuthStateChanged((authUser) => {
        if (authUser) {
          // User is signed in
          // Fetch user data from Firestore based on uid
          projectFirestore
            .firestore()
            .collection("Users")
            .doc(authUser.id)
            .get()
            .then((doc) => {
              if (doc.exists) {
                const userData = doc.data();
                setUser(userData);
              }
            })
            .catch((error) => {
              console.error("Error getting user document:", error);
            });
        } else {
          // User is signed out
          setUser(null);
        }
      });

    return () => {
      // Unsubscribe from the listener when the component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
