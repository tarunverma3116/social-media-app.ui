import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  user: any;
};

const UserCard = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/profile/${props.user._id}`);
      }}
      className="user-card bg-neutral min-w-[250px] max-w-[320px] cursor-pointer rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out"
    >
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
