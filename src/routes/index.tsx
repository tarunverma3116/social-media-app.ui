import React from "react";
import { Route, Routes } from "react-router-dom";
import SignInForm from "../pages/Login";
import SignUp from "../pages/SignUp";
import ResetPassword from "../pages/ResetPassword";
import Layout from "../components/Layout";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import Create from "../pages/Create";
import getUserDetails from "../hooks/mutations/account/getUserDetails";
import Users from "../pages/Users";
import Conversations from "pages/Conversations";

export const PublicRoutes = () => {
  const [account, setAccount] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const fetchAccount = async () => {
    const response = await getUserDetails();
    setAccount(response.data);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchAccount();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout account={account} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile account={account} />} />
        <Route path="/profile/:id" element={<Profile account={account} />} />
        <Route path="/create" element={<Create />} />
        <Route path="/users" element={<Users />} />
        <Route
          path="/conversations"
          element={<Conversations account={account} />}
        />
      </Route>
      <Route path="/login" element={<SignInForm />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};
