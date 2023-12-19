// Example of checking authentication in a component
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./path-to-auth-context";

const PrivatePage = () => {
  const { user } = useContext(AuthContext);

  // Navigate to login if user is not authenticated
  if (!user) {
    return <Navigate to="/" />;
  }

  // Render the private content
  return <div>Private Page Content</div>;
};

export default PrivatePage;
