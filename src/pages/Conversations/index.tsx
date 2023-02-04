import React from "react";
import Chat from "./components/Chat";
import People from "./components/People";

type Props = {
  account: any;
};

const Conversations = (props: Props) => {
  return (
    <section>
      <div className="flex flex-row justify-between w-full min-h-full">
        <div className="flex flex-col basis-1/3">
          <People />
        </div>
        <div className="flex flex-col basis-2/3">
          {/* <Chat chat={"abc"} /> */}
        </div>
      </div>
    </section>
  );
};

export default Conversations;
