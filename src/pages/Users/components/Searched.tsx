import React from "react";
import { RiUserLine } from "react-icons/ri";
import UserCard from "../../../components/Cards/OrderCard";

type Props = {
  users: any;
};

const Searched = (props: Props) => {
  console.log(props.users, "ye users hai");
  return (
    <div>
      <div className="w-full grid grid-cols-3 gap-2 py-4 text-white dark:text-black">
        {props.users?.map((user: any) => {
          return <UserCard user={user} key={user._id} />;
        })}
      </div>
    </div>
  );
};

export default Searched;
