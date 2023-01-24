import React from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface IDropdownProps {
  button: React.ReactNode;
  body: React.ReactNode;
}

const Dropdown: React.FunctionComponent<IDropdownProps> = ({
  body,
  button,
}) => {
  return (
    <>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button>{button}</Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 -translate-x-1/2 transform">
                {body}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};

export default Dropdown;
