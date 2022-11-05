import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import ForgotPassword from "../components/ForgotPassword";
import { useAuth } from "../contexts/authContext";

const ForgotPasswordPage = () => {
  const auth = useAuth();

  if (auth?.currentUser) {
    return <Navigate to="/dashboard" />;
  }
  return <ForgotPassword />;
};

export default ForgotPasswordPage;
