import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import { ROLES } from "../firebase/roles";
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
      <Route path="/" element={<Layout />}>
        {/* Rotas Públicas */}
        <Route index element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/unauthorized" element={<h1>Não autorizado</h1>} />

        {/* Rotas privadas */}
        <Route element={<PrivateRoute allowedRoles={[ROLES.Student]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={[ROLES.Admin]} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
