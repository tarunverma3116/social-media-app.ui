import React, { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Zoom } from "react-toastify";
import { UseSpinnerProvider } from "./Spinner";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

export const AppProviders = ({ children, ...props }: Props) => {
  return <UseSpinnerProvider>{children}</UseSpinnerProvider>;
};

export default AppProviders;
