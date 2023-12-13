import React from "react";
import { Route } from "react-router-dom";
import useAuthProtection from "./useAuthProtection";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authProtection = useAuthProtection();

  return (
    <Route
      {...rest}
      render={(props) =>
        authProtection ? authProtection : <Component {...props} />
      }
    />
  );
};

export default ProtectedRoute;
