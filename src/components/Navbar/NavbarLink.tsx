import * as React from "react";
import { DivProps } from "react-html-props";
import { Link } from "react-router-dom";
interface INavbarLink extends DivProps {
  to: string;
  isActive: boolean;
}

const NavbarLink: React.FunctionComponent<INavbarLink> = (props) => {
  return (
    <Link to={props.to}>
      <div
        className={`py-2 px-2 text-white text-sm ${
          props.isActive ? "font-bold" : "font-normal"
        }`}
      >
        {props.children}
      </div>
    </Link>
  );
};

export default NavbarLink;
