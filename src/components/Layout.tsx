import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
// import PropertyCard from "pages/Marketplace/components/PropertyCard";
import { Outlet } from "react-router-dom";
// import SideNav from "./SideNav";

interface ILayoutProps {}

const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    const item = localStorage.getItem("access_token");
    if (item) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="hero-section w-screen max-w-screen min-h-screen flex flex-col items-center justify-center">
      <div className="layout flex flex-col min-h-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
