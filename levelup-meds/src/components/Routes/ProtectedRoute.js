import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

const ProtectedRoute = ({ children }) => {
  const { user } = useSignup();
  // if (!user) {
  //   return <Navigate to="/login" />;
  // }
  // return children;
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
