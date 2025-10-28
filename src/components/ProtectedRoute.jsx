import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to home page which shows the landing page for non-authenticated users
    return <Navigate to="/" replace />;
  }

  return children;
}
