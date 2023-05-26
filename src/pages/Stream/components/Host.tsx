import React, { useState } from "react";
import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { VideoRoom } from "./VideoRoom";

type Props = {};

const Host = (props: Props) => {
  const [videoCall, setVideoCall] = useState(false);

  const client: IAgoraRTCClient = AgoraRTC.createClient({
    mode: "live",
    codec: "vp8",
  });

  return (
    <div className="md:hidden lg:block hidden">
      <div className="columns-xs flex flex-col gap-6 top-20 w-full h-[500px]">
        <div className="flex justify-between items-center">
          <p className="mt-6 mb-2 font-semibold text-xl text-white dark:text-foreground-secondary">
            Preview
          </p>
          {!videoCall && (
            <label
              className="bg-gradient-to-r from-[#23AEE3] via-[#9B71D8] to-[#FD3DCE] border-0 text-white rounded-lg font-sm font-bold  outline-0 mr-3 w-1/4 btn"
              onClick={() => setVideoCall(true)}
              //   onClick={CreateData}
            >
              Join Livestream
            </label>
          )}
        </div>
        <div className="dark:bg-white mb-4">
          <div className="preview-box dark:bg-white dark:backdrop-blur-xl dark:shadow-[0px 8px 36px rgba(132, 145, 179, 0.18)] h-[330px] grid place-items-center items-center text-center p-8">
            {!videoCall ? (
              <p>Live stream previeew</p>
            ) : (
              <div>
                <VideoRoom />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Host;
