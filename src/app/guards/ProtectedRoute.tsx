import React from "react";
import { Navigate, Outlet } from "react-router";

export const isAuthenticated = () => {
  return true;
};

const ProtectedRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
