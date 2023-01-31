import React from "react";
import { Link, Navigate } from "react-router-dom";
import { RiUserLine } from "react-icons/ri";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoLogOutOutline, IoWalletOutline } from "react-icons/io5";
import { linkSync } from "fs";
import { useNavigate } from "react-router-dom";
import useDarkMode from "../../hooks/theme/useDarkMode";
import DarkModeToggle from "react-dark-mode-toggle";
import robo from "../../assets/images/profile/Robo.png";
import { CgExtensionAdd } from "react-icons/cg";

interface Props {
  account: any;
}

const Navbar = (props: Props) => {
  const navigate = useNavigate();
  console.log(props.account, "account in navbar");
  const [colorTheme, setTheme] = useDarkMode();
  const [lightToggle, setLightToggle] = React.useState(
    colorTheme === "dark" ? true : false
  );

  const toggleDarkMode = (checked: any) => {
    setTheme(colorTheme);
    setLightToggle(checked);
  };

  return (
    <div className="flex flex-shrink-0 h-16 pl-5 pr-8 bg-transparent fixed inset-x-0 top-0 items-stretch z-50 text-white dark:text-black backdrop-filter backdrop-blur-lg bg-opacity-5">
      <div className="navbar">
        <div className="container relative px-[10rem]">
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
          <div className="flex mr-2">
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
                <div className="profile-button rounded-full">
                  <Link to="/profile">
                    {props.account ? (
                      <img
                        src={`https://pixelpark-images.s3.amazonaws.com/${props.account.profileImage}`}
                        className="rounded-full w-8 h-8"
                        alt="dp"
                      />
                    ) : (
                      <RiUserLine className="rounded-full w-8 h-8" />
                    )}
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
