import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminPage from "../views/AdminPage";
import Dashboard from "../views/Dashboard";
import ErrorPage from "../views/ErrorPage";
import ForgotPasswordPage from "../views/ForgotPasswordPage";
import SignInPage from "../views/SignInPage";
import SignUpPage from "../views/SignUpPage";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/unauthorized" element={<h1>Não autorizado</h1>} />

      {/* Rotas privadas */}
      <Route
        path="/dashboard"
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

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
