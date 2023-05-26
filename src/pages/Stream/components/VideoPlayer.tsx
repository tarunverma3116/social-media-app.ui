import React, { useEffect, useRef } from "react";

type Props = {
  user: any;
};

const VideoPlayer = (props: Props) => {
  const ref = useRef<any>();

  useEffect(() => {
    props.user.videoTrack.play(ref.current);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-white dark:text-black">Uid: {props.user.uid}</p>
      <div ref={ref} style={{ width: "200px", height: "200px" }}></div>
    </div>
  );
};

export default VideoPlayer;
