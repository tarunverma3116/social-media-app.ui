import React, { useState, useEffect } from "react";
import Host from "./components/Host";
import Join from "./components/Join";

type Props = {
  account: any;
};

const Stream = (props: Props) => {
  const { account } = props;
  const [chat, setChat] = React.useState<any>(null);
  const [activeTab, setActiveTab] = useState("host");

  useEffect(() => {
    console.log("chat", chat);
  }, [chat]);

  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center w-full">
          <p className="text-2xl text-white font-bold text-shadow dark:text-foreground-secondary">
            Live Stream
          </p>
          <div className="collections-tab-group">
            <button
              className={
                activeTab === "host"
                  ? "collection-tab-active"
                  : "collection-tab-non-active"
              }
              onClick={() => setActiveTab("host")}
            >
              Host
            </button>
            <button
              className={
                activeTab === "join"
                  ? "collection-tab-active"
                  : "collection-tab-non-active"
              }
              onClick={() => setActiveTab("join")}
            >
              Join
            </button>
          </div>
        </div>
        <div>{activeTab === "host" && <Host />}</div>
        <div>{activeTab === "join" && <Join />}</div>
      </div>
    </section>
  );
};

export default Stream;
