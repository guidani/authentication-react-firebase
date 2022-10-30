import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const PrivateRoute = ({children}) => {
  const auth = useAuth();
  const location = useLocation()

  useEffect(() => {
    console.log("olá");
  }, []);

  return auth?.currentUser ? children : <Navigate to={"/signin"} state={{ from: location}} replace/>;
};

export default PrivateRoute;
