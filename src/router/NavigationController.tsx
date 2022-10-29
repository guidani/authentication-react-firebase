import React from 'react'
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const NavigationController = ({ children }) => {
  const auth = useAuth();
  return !auth.currentUser ? <Navigate to={"/signin"} /> : { children };
};

export default NavigationController;
