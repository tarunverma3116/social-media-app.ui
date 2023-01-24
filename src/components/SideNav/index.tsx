import React, { useState } from "react";
import { TbCurrencyDollar, TbHeartRateMonitor } from "react-icons/tb";
import {
  AiOutlineFolderOpen,
  AiFillSetting,
  AiOutlineBarChart,
  AiOutlineAppstore,
  AiOutlineTable,
} from "react-icons/ai";
import { BsCollection } from "react-icons/bs";
import { MdPodcasts, MdOutlineDoubleArrow } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FiDollarSign, FiHelpCircle } from "react-icons/fi";
import { IoPricetagOutline } from "react-icons/io5";
import { BiHomeAlt } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { HiOutlinePencil } from "react-icons/hi";
import NavbarLink from "../Navbar/NavbarLink";
import { useLocation } from "react-router-dom";
interface ISideNavProps {}

const SideNav: React.FunctionComponent<ISideNavProps> = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { pathname } = useLocation();

  const mainNavSettings = [
    {
      label: "Home",
      link: "/home",
      icon: <BiHomeAlt />,
      active: pathname === "/home",
    },
    {
      label: "Deals",
      link: "/deals/all",
      icon: <IoPricetagOutline />,
      active: pathname === "/deals/all" || pathname === "/deals/create",
    },
    {
      label: "Membership",
      link: "/membership",
      icon: <MdOutlinePeopleAlt />,
      active: pathname === "/membership",
    },
    {
      label: "Rewards",
      link: "/rewards",
      icon: <FiDollarSign />,
      active: pathname === "/rewards",
    },
    // {
    //   label: "Collections",
    //   link: "/collections",
    //   icon: <BsCollection />,
    //   active: pathname === "/collections",
    // },
    {
      label: "Customize Homepage",
      link: "/customizehomepage",
      icon: <HiOutlinePencil />,
      active: pathname === "/customizehomepage",
    },
  ];

  const secNavSettings = [
    {
      label: "Help/wiki",
      link: "/help",
      icon: <FiHelpCircle />,
      active: pathname === "/help",
    },
    {
      label: "Settings",
      link: "/settings",
      icon: <AiFillSetting />,
      active: pathname === "/settings",
    },
  ];

  return (
    <div
      className={twMerge(
        "overflow-hidden flex-shrink-0 transition-all border-t-5 shadow-md border-indigo-400",
        isCollapsed ? "w-22" : "w-72"
      )}
    >
      <div
        className={twMerge(
          "w-72 bg-foreground-primary flex flex-col text-white absolute inset-y-0 left-0",
          isCollapsed ? "w-22" : "w-72"
        )}
      >
        <nav className="flex-col flex px-2 pt-6 mt-12">
          <ul className="flex flex-col gap-2">
            {mainNavSettings.map((navItem) => (
              <SideNavListItem
                label={isCollapsed ? "" : navItem.label}
                active={navItem.active}
                icon={navItem.icon}
                link={navItem.link}
              />
            ))}
          </ul>
        </nav>
        <ul className="flex flex-col gap-2 mt-auto ">
          <hr />
          {secNavSettings.map((navItem) => (
            <SideNavListItem
              label={isCollapsed ? "" : navItem.label}
              active={navItem.active}
              icon={navItem.icon}
              link={navItem.link}
            />
          ))}
        </ul>
        <button
          className="p-4 text-black"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <MdOutlineDoubleArrow /> : "Close"}
        </button>
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
          " flex px-3 gap-2 py-2 items-center text-foreground-secondary ",
          active && "bg-foreground-accent py-3 text-white"
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
