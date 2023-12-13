import { createContext, useEffect, useReducer } from "react";
import { auth } from "../components/firebase-config";
export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        sessionExpiration: action.payload.exp,
        token: action.payload.token,
      };
    case "LOGOUT":
      return { ...state, user: null, sessionExpiration: null, token: null };

    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    sessionExpiration: null,
    token: null,
  });
  useEffect(() => {
    // Add Firebase Auth state change observer
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        try {
          // Access the user's ID token and include it in the state
          const token = await authUser.getIdToken();
          const sessionExpiration = authUser.stsTokenManager.expirationTime;

          dispatch({
            type: "LOGIN",
            payload: { ...authUser, token, sessionExpiration },
          });
        } catch (error) {
          console.error("Error getting ID token:", error);
        }
      } else {
        dispatch({ type: "LOGOUT" });
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  console.log("AuthContext State: ", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
