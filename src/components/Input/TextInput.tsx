import React from "react";
import { InputPropsWithoutRef } from "react-html-props";
import { twMerge } from "tailwind-merge";

export interface ITextInputProps extends InputPropsWithoutRef {}

export const TextInput = React.forwardRef<any, ITextInputProps>(
  ({ ...props }, ref) => (
    <input
      {...props}
      className={twMerge(
        "input w-full mx-auto  rounded text-black border-1 p-3 focus:outline-none border-gray-300",
        props.className
      )}
      ref={ref}
    />
  )
);

export default TextInput;