import React from "react";
import { Redirect, Route } from "react-router";

const ProtectedRoute = (rest) => {
  const isAuthenticated = localStorage.getItem("accessToken");
  if (isAuthenticated || localStorage.length >= 1) return <Route {...rest} />;
  return <Redirect to="/login" />;
};

export default ProtectedRoute;
