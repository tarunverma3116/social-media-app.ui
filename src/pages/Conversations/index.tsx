import React, { useEffect } from "react";
import Chat from "./components/Chat";
import People from "./components/People";

type Props = {
  account: any;
};

const Conversations = (props: Props) => {
  const { account } = props;
  const [chat, setChat] = React.useState<any>(null);
  const [user, setUser] = React.useState<any>(null);

  useEffect(() => {
    console.log("chat", chat);
  }, [chat]);

  return (
    <section>
      <div className="flex flex-row justify-between gap-3 w-full min-h-full">
        <div className="flex flex-col basis-1/3">
          <People chat={chat} setChat={setChat} user={user} setUser={setUser} />
        </div>
        <div className="flex flex-col basis-2/3">
          <Chat chat={chat} user={user} setUser={setUser} />
        </div>
      </div>
    </section>
  );
};

export default Conversations;
