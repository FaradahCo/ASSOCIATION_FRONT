import React from "react";
import { Navigate, Outlet } from "react-router";
import { isAuthenticated } from "./ProtectedRoute";

const AuthProtectedRoute: React.FC = () => {
  return !isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

export default AuthProtectedRoute;
