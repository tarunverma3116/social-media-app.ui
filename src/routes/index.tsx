import React from "react";
import { Route, Routes } from "react-router-dom";
import SignInForm from "../pages/Login";
import SignUp from "../pages/SignUp";
import ResetPassword from "../pages/ResetPassword";
import Layout from "../components/Layout";
import Profile from "../pages/Profile";
import Home from "../pages/Home";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/login" element={<SignInForm />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};
