import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { loggedUserRoles } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const content = loggedUserRoles.some((role) =>
    allowedRoles.includes(role)
  ) ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );

  return content;

  // return auth?.loggedUserRoles?.find((role) => allowedRoles?.includes(role)) ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to={from} state={{ from: location }} replace />
  // );

  // return auth?.currentUser ? children : <Navigate to={"/signin"} state={{ from: location}} replace/>;
};

export default PrivateRoute;
