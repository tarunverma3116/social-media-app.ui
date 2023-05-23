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
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Stream from "pages/Stream/index";

type Props = {
  account: any;
  setAccount: any;
};

export const PublicRoutes = (props: Props) => {
  return (
    <Routes>
      <Route path="/login" element={<SignInForm />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export const PrivateRoutes = (props: Props) => {
  const [loading, setLoading] = React.useState<boolean>(true);

  const navigate = useNavigate();
  useEffect(() => {
    const item = localStorage.getItem("access_token");
    console.log(item);
    if (item) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  const fetchAccount = async () => {
    setLoading(false);
    const response = await getUserDetails();
    props.setAccount(response.data);
  };

  React.useEffect(() => {
    console.log("fetching account");
    fetchAccount();
  }, []);

  React.useEffect(() => {
    console.log("account in layout", props.account);
  }, [props.account]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<SignInForm />} />
      <Route
        path="/"
        element={
          <Layout account={props.account} setAccount={props.setAccount} />
        }
      >
        <Route path="/home" element={<Home />} />
        <Route
          path="/profile"
          element={
            <Profile account={props.account} setAccount={props.setAccount} />
          }
        />
        <Route
          path="/profile/:id"
          element={
            <Profile account={props.account} setAccount={props.setAccount} />
          }
        />
        <Route path="/create" element={<Create />} />
        <Route path="/users" element={<Users />} />
        <Route path="/stream" element={<Stream account={props.account} />} />
        <Route
          path="/conversations"
          element={<Conversations account={props.account} />}
        />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
