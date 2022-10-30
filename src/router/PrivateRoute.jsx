import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const PrivateRoute = ({ allowedRoles }) => {
  const auth = useAuth();
  const location = useLocation();
  // useEffect(() => {
  //   console.log(auth?.loggedUserRoles?.find((role) => allowedRoles?.includes(role)));
  // }, []);

  return auth?.loggedUserRoles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.currentUser ? (
    <Navigate to="/signin" state={{ from: location }} replace />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );

  // return auth?.currentUser ? children : <Navigate to={"/signin"} state={{ from: location}} replace/>;
};

export default PrivateRoute;
