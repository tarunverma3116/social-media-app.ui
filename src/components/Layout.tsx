import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
// import PropertyCard from "pages/Marketplace/components/PropertyCard";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";

interface ILayoutProps {
  account: any;
}

const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    const item = localStorage.getItem("access_token");
    console.log(item);
    if (item) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    // <div className="hero-section w-screen max-w-screen min-h-screen flex flex-col items-center justify-center">
    //   <div className="layout flex flex-col min-h-screen">
    //     <Navbar account={props.account} />
    //     <div className="flex flex-row">
    //       <SideNav />
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>
    <div className="hero-section flex flex-col flex-grow max-h-full max-w-full min-h-[100vh]">
      <Navbar account={props.account} />
      <div className="flex flex-grow max-h-full min-h-0 relative max-w-full overflow-x-hidden">
        <SideNav />
        <div className="min-h-0 max-h-full max-w-full overflow-y-auto flex-grow scrollbar-hide">
          <div className="outlet">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
