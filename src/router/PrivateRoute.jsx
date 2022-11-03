import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  useEffect(() => {
    console.log("olá");
  }, []);

  return auth?.currentUser ? children : <Navigate to={"/signin"} />;
};

export default PrivateRoute;
