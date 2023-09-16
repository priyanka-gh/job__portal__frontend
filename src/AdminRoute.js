import React from "react";
import { Route } from "react-router-dom";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  const token = Cookies.get("access_token");
  var role = 1;
  if (token) {
    const tokenParts = token?.split(".");
    const payload = JSON.parse(atob(tokenParts[1]));
    role = payload.role;
  }

  return (
    <Route
      {...rest}
      element={role === 0 ? Component : <Navigate to="/jobs" replace={true} />}
    />
  );
};

export default AdminRoute;
