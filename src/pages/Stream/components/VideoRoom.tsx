import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import VideoPlayer from "./VideoPlayer";

const APP_ID = "02057217f9e7433eb7293146e6284aa5";
const TOKEN =
  "007eJxTYGhetesexwa23VFrw93D+1V5LUOkjU4pLX5yhmGVu7Vh308FBgMjA1NzI0PzNMtUcxNj49QkcyNLY0MTs1QzIwuTxETT/0YFKQ2BjAx2K0qZGBkgEMTnZkjJTEzPz0vMyUmtZGAAAHAUH6s=";
const CHANNEL = "diagonalley";

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

export const VideoRoom = () => {
  const [users, setUsers] = useState<any>([]);
  const [localTracks, setLocalTracks] = useState<any>([]);

  const handleUserJoined = async (user: any, mediaType: any) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      setUsers((previousUsers: any) => [...previousUsers, user]);
    }

    if (mediaType === "audio") {
      // user.audioTrack.play()
    }
  };

  const handleUserLeft = (user: any) => {
    setUsers((previousUsers: any) =>
      previousUsers.filter((u: any) => u.uid !== user.uid)
    );
  };

  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);

    client
      .join(APP_ID, CHANNEL, TOKEN, null)
      .then((uid) =>
        Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers((previousUsers: any) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish(tracks);
      });

    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.off("user-published", handleUserJoined);
      client.off("user-left", handleUserLeft);
      //   client.unpublish(tracks).then(() => client.leave());
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 200px)",
          gap: "10px",
        }}
      >
        {users.map((user: any) => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
};
