import React from "react";
import { IoChatbubbleOutline } from "react-icons/io5";
import { BsSuitHeart } from "react-icons/bs";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BiDotsHorizontal } from "react-icons/bi";

type Props = {
  post: any;
};

const PostCard = (props: Props) => {
  const findLapsedTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diff / 1000 / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else if (diffInDays < 30) {
      return `${diffInDays}d`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths}mo`;
    } else {
      return `${diffInYears}y`;
    }
  };

  return (
    <div className="post-card py-2 px-4 mb-6 text-white dark:text-black flex flex-col gap-2">
      <div className="post-card__header flex flex-row justify-between">
        <div className="flex flex-row gap-3 items-center">
          <img
            className="w-8 h-8 object-cover rounded-xl"
            src={`https://pixelpark-images.s3.amazonaws.com/${props.post.user.profileImage}`}
            alt="profile"
          />
          <div className="flex flex-col justify-between">
            <p className="post-card__header__left__details__name">
              {props.post.user.userName}
            </p>
            <p className="post-card__header__left__details__date text-xs">
              {findLapsedTime(props.post.post.createdAt)}
            </p>
          </div>
        </div>
        <div className="post-card__header__right">
          <button className="btn btn-ghost">
            <BiDotsHorizontal />
          </button>
        </div>
      </div>
      <div className="post-card__body">
        <img
          className="w-full h-96 object-cover rounded-xl"
          src={`https://pixelpark-images.s3.amazonaws.com/${props.post.post.image}`}
          alt="post"
        />
      </div>
      <div className="post-card__caption flex flex-row gap-2 items-center">
        <img
          className="w-6 h-6 object-cover rounded-xl"
          src={`https://pixelpark-images.s3.amazonaws.com/${props.post.user.profileImage}`}
          alt="profile"
        />
        <p className="post-card__header__left__details__name text-xs">
          @{props.post.user.userName}
        </p>
        <p className="post-card__caption__text">{props.post.post.caption}</p>
      </div>
      <div className="post-card__footer flex flex-row justify-between">
        <button className="btn btn-ghost">
          <BsSuitHeart />
        </button>
        <button className="btn btn-ghost">
          <IoChatbubbleOutline />
        </button>
        <button className="btn btn-ghost">
          <IoPaperPlaneOutline />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
