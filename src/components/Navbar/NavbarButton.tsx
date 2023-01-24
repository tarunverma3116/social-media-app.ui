import * as React from 'react';
import { ButtonProps } from 'react-html-props';

interface INavbarButtonProps extends ButtonProps {}

const NavbarButton: React.FunctionComponent<INavbarButtonProps> = (props) => {
  return (
    <button
      className="py-2 px-3 bg-white/25 rounded-md text-white font-bold text-sm"
      {...props}
    >
      {props.children}
    </button>
  );
};

export default NavbarButton;
