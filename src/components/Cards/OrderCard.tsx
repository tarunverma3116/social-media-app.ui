import React from "react";

type Props = {
  user: any;
};

const UserCard = (props: Props) => {
  return (
    <div className="user-card bg-neutral min-w-[250px] max-w-[320px]">
      <div className="grid grid-cols-1">
        <div className="p-3">
          <img
            className="mx-auto w-full h-[200px] object-cover rounded-md"
            src={`https://pixelpark-images.s3.amazonaws.com/${props.user.profileImage}`}
            alt="car!"
          />
          <p className="card-title text-base py-3">@{props.user.userName}</p>
          <p className="text-xs flex gap-2 items-center mb-1">
            Member Since {props.user.createdAt?.replace("T", " ").slice(0, -5)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
