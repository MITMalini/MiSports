// useAuthProtection.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const useAuthProtection = () => {
  const authContext = useContext(AuthContext);

  if (!authContext.token) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/" />;
  }

  // User is authenticated, allow access to the protected route
  return null;
};

export default useAuthProtection;
