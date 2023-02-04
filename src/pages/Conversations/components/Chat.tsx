import React from "react";

type Props = {
  chat: any;
};

const Chat = (props: Props) => {
  const findLapsedTime = (date: any) => {
    const now = new Date();
    const postDate = new Date(date);
    const diff = now.getTime() - postDate.getTime();
    const diffDays = Math.floor(diff / (1000 * 3600 * 24));
    const diffHours = Math.floor(diff / (1000 * 3600));
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffSeconds = Math.floor(diff / 1000);
    if (diffDays > 0) {
      return `${diffDays}d`;
    } else if (diffHours > 0) {
      return `${diffHours}h`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes}m`;
    } else {
      return `${diffSeconds}s`;
    }
  };

  return (
    <div className="w-full chat-card p-2">
      <div className="chat-card__header flex flex-row justify-between">
        <div className="flex flex-row gap-3 items-center">
          <img
            className="w-8 h-8 object-cover rounded-xl"
            src={`https://pixelpark-images.s3.amazonaws.com/${props.chat.user.profileImage}`}
            alt="profile"
          />
          <div className="flex flex-col justify-between">
            <p className="chat-card__header__left__details__name">
              {props.chat.user.userName}
            </p>
            <p className="chat-card__header__left__details__date text-xs">
              {findLapsedTime(props.chat.post.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
