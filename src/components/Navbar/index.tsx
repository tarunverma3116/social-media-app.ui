import React from "react";
import { Link, Navigate } from "react-router-dom";
import { RiUserLine } from "react-icons/ri";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoWalletOutline } from "react-icons/io5";
import { linkSync } from "fs";
import { useNavigate } from "react-router-dom";
import useDarkMode from "../../hooks/theme/useDarkMode";
import DarkModeToggle from "react-dark-mode-toggle";

interface Props {}

const Navbar = (props: Props) => {
  const navigate = useNavigate();
  const [colorTheme, setTheme] = useDarkMode();
  const [lightToggle, setLightToggle] = React.useState(
    colorTheme === "dark" ? true : false
  );

  const toggleDarkMode = (checked: any) => {
    setTheme(colorTheme);
    setLightToggle(checked);
  };

  return (
    <div className="bg-transparent text-white dark:text-black backdrop-filter backdrop-blur-lg bg-opacity-5">
      <div className="navbar">
        <div className="container">
          <div className="flex-1">
            <div className="dropdown z-20">
              <label tabIndex={0} className="btn btn-ghost text-xl lg:hidden">
                <HiMenuAlt4 />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52 z-100"
                style={{ zIndex: "100" }}
              >
                {/* <li className="z-10">
                    <Link to="/portfolio">
                      <a>My Portfolio</a>
                    </Link>
                  </li>
                  <li className="z-10">
                    <Link to="/rewards">
                      <a>My Rewards</a>
                    </Link>
                  </li> */}
                <li>
                  <a>
                    <RiUserLine />
                    Profile
                    <svg
                      className="fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                    </svg>
                  </a>
                  <ul className="p-2 bg-primary">
                    <li>
                      <Link to="/profile">Settings</Link>
                    </li>
                    <li>
                      <a>Logout</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <Link to="/home">
              <a className="btn btn-ghost normal-case text-xl">DIAGON Alley</a>
            </Link>
          </div>
          <div className="flex">
            <DarkModeToggle
              onChange={toggleDarkMode}
              checked={lightToggle}
              size={56}
              // onClick={handleThemeSwitch}
            />
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal p-0 font-bold hidden lg:flex">
              <li>
                <a>
                  <RiUserLine />
                  Profile
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </a>
                <ul className="p-1 menu-dropdown bg-background-primary dark:bg-white shadow-xl">
                  <li>
                    <Link to="/profile">User Settings</Link>
                  </li>
                  <li>
                    <div
                      onClick={() => {
                        localStorage.removeItem("access_token");
                        navigate("/login");
                      }}
                    >
                      Logout
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
