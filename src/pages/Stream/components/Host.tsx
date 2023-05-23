import React from "react";

type Props = {};

const Host = (props: Props) => {
  return (
    <div>
      <div className="md:hidden lg:block hidden">
        <div className="columns-xs flex flex-col gap-6 top-20 w-full h-[500px]">
          <div className="flex justify-between items-center">
            <p className="mt-6 mb-2 font-semibold text-xl text-white dark:text-foreground-secondary">
              Preview
            </p>
            <label
              className="bg-gradient-to-r from-[#23AEE3] via-[#9B71D8] to-[#FD3DCE] border-0 text-white rounded-lg font-sm font-bold  outline-0 mr-3 w-1/4 btn"
              //   onClick={CreateData}
            >
              Start Livestream
            </label>
            {/* <button className="primary-button">Start Live Stream</button> */}
          </div>
          <div className="dark:bg-white mb-4">
            <div className="preview-box dark:bg-white dark:backdrop-blur-xl dark:shadow-[0px 8px 36px rgba(132, 145, 179, 0.18)] h-[330px] grid place-items-center items-center text-center p-8">
              Live Stream Preview
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Host;
