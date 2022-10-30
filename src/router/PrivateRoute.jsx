import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const PrivateRoute = ({ allowedRoles }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth?.loggedUserRoles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to={from} state={{ from: location }} replace />
  );

  // return auth?.currentUser ? children : <Navigate to={"/signin"} state={{ from: location}} replace/>;
};

export default PrivateRoute;
