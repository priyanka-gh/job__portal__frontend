import React from "react";
import { Route } from "react-router-dom";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!Cookies.get("access_token"); // Check if the user is authenticated
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/" replace={true} />
        )
      }
    />
  );
};

export default ProtectedRoute;
