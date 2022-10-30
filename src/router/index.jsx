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
      {/* Rotas Públicas */}
      <Route index path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/unauthorized" element={<h1>Não autorizado</h1>} />
      <Route path="*" element={<ErrorPage />} />

      {/* Rotas privadas */}
      <Route element={<PrivateRoute allowedRoles={["student"]}/>} >
        <Route path="/" element={<Dashboard />} />
      </Route>
      <Route element={<PrivateRoute allowedRoles={["admin"]}/>} >
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
