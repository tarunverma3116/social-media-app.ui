import * as React from "react";
import { ButtonProps } from "react-html-props";
import { twMerge } from "tailwind-merge";

interface IPrimaryButtonProps extends ButtonProps {
  onClick?: any;
  onChange?: any;
}

const PrimaryButton: React.FunctionComponent<IPrimaryButtonProps> = (props) => {
  return (
    <button
      {...props}
      className={twMerge(
        "py-2 px-5 font-bold btn border-0 bg-foreground-accent rounded-md text-white  hover:hover:bg-foreground-accent hover:text-white font-bold relative overflow-hidden cursor-pointer",
        props.className
      )}
    >
      <div className="absolute inset-0  transition-colors"></div>
      {props.disabled && (
        <div className="absolute inset-0 transition-colors " />
      )}
      {props.children}
    </button>
  );
};

export default PrimaryButton;
