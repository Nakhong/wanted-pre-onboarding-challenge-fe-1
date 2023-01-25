import React from "react";
import { Navigate, Outlet } from "react-router-dom";
/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */

interface PrivateRouteProps {
  authentication: boolean;
}

function PrivateRoute({
  authentication,
}: PrivateRouteProps): React.ReactElement | null {
  const isAuthenticated = localStorage.getItem("token");

  if (authentication) {
    return isAuthenticated === null || isAuthenticated === "false" ? (
      <Navigate to="/auth/login" />
    ) : (
      <Outlet />
    );
  } else {
    return isAuthenticated === null || isAuthenticated === "ture" ? (
      <Navigate to="/" />
    ) : (
      <Outlet />
    );
  }
}

export default PrivateRoute;
