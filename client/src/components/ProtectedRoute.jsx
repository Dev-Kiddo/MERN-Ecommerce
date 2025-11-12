import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children, isAdmin, user }) => {

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
