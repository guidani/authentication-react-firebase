import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "../views/AdminPage";
import Dashboard from "../views/Dashboard";
import ErrorPage from "../views/ErrorPage";
import ForgotPasswordPage from "../views/ForgotPasswordPage";
import SignInPage from "../views/SignInPage";
import SignUpPage from "../views/SignUpPage";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  return (
    <Routes>
      {/* Rotas privadas */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        }
      />
      {/* Rotas Públicas */}
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
