import React from "react";
import { Navigate } from "react-router-dom";
import SignIn from "../components/SignIn";
import { useAuth } from "../contexts/authContext";

const SignInPage = () => {
  const auth = useAuth();

  if (auth?.currentUser) {
    return <Navigate to="/dashboard" />;
  }
  return <SignIn />;
};

export default SignInPage;
