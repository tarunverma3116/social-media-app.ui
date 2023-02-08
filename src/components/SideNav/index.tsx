import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import NavbarLink from "../Navbar/NavbarLink";
import { useLocation } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { HiViewGridAdd } from "react-icons/hi";
import { HiUsers } from "react-icons/hi";
import { RiUserLine } from "react-icons/ri";
import { CgFeed } from "react-icons/cg";
import { AiOutlineMessage } from "react-icons/ai";

interface ISideNavProps {}

const SideNav: React.FunctionComponent<ISideNavProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { pathname } = useLocation();

  const mainNavSettings = [
    {
      label: "Home",
      link: "/home",
      icon: <CgFeed />,
      active: pathname === "/home",
    },
    {
      label: "Create",
      link: "/create",
      icon: <HiViewGridAdd />,
      active: pathname === "/create" || pathname === "/create",
    },
    {
      label: "Conversations",
      link: "/conversations",
      icon: <AiOutlineMessage />,
      active: pathname === "/conversations" || pathname === "/conversations",
    },
    {
      label: "Users",
      link: "/users",
      icon: <HiUsers />,
      active: pathname === "/users" || pathname === "/users",
    },
    {
      label: "Profile",
      link: "/profile",
      icon: <RiUserLine />,
      active: pathname === "/profile" || pathname === "/profile",
    },
  ];

  const secNavSettings = [
    {
      label: "Logout",
      link: "/login",
      icon: <MdOutlineLogout />,
      active: pathname === "/login",
    },
  ];

  return (
    <div
      className={twMerge(
        "overflow-hidden transition-all border-t-5  border-indigo-400 rounded hidden lg:flex",
        isCollapsed ? "w-18" : "w-60"
      )}
    >
      <div
        className={twMerge(
          "w-60  flex flex-col text-white fixed inset-y-0 left-0 rounded",
          isCollapsed ? "w-18" : "w-60"
        )}
      >
        <nav className="flex-col flex px-2 pt-14 mt-12">
          <ul className="flex flex-col gap-2">
            {mainNavSettings.map((navItem, key: any) => (
              <SideNavListItem
                label={isCollapsed ? "" : navItem.label}
                active={navItem.active}
                icon={navItem.icon}
                link={navItem.link}
                key={key}
              />
            ))}
          </ul>
        </nav>
        <ul className="flex flex-col gap-2 mt-auto ml-1 mb-2">
          {secNavSettings.map((navItem, key: any) => (
            <div
              title="Logout"
              onClick={() => {
                console.log("logout pressed");
                localStorage.removeItem("access_token");
              }}
            >
              <SideNavListItem
                label={isCollapsed ? "" : navItem.label}
                active={navItem.active}
                icon={navItem.icon}
                link={navItem.link}
                key={key}
              />
            </div>
          ))}
        </ul>
        {/* <button
          className="p-4 text-black"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <MdOutlineDoubleArrow /> : "Close"}
        </button> */}
      </div>
    </div>
  );
};

interface ISideNavListItemProps {
  label: React.ReactNode;
  icon: React.ReactElement;
  active?: boolean;
  link: string;
}

const SideNavListItem: React.FunctionComponent<ISideNavListItemProps> = ({
  label,
  icon,
  active,
  link,
}) => {
  return (
    <NavbarLink
      to={link}
      isActive={window.location && window.location.pathname === "/marketplace"}
    >
      <li
        className={twMerge(
          " flex px-3 gap-2 py-2 items-center text-white dark:text-black",
          active &&
            "bg-gradient-to-r from-[#23AEE3] via-[#9B71D8] to-[#FD3DCE] rounded-xl py-3 text-white font-bold"
        )}
      >
        {React.cloneElement(icon, {
          className: twMerge("w-5 h-auto", icon.props.className),
        })}
        {label}
      </li>
    </NavbarLink>
  );
};

export default SideNav;
