import React from "react";
import { Navigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

const ProtectedRoute = ({ children }) => {
  const { user } = useSignup();
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
