import React from "react";
import { Navigate } from "react-router-dom";
import SignUp from "../components/SignUp";
import { useAuth } from "../contexts/authContext";

const SignUpPage = () => {
  const auth = useAuth();

  if (auth?.currentUser) {
    return <Navigate to="/dashboard" />;
  }
  return <SignUp />;
};

export default SignUpPage;
