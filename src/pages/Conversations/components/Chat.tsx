import React, { useEffect } from "react";
import FormTextInput from "../../../components/Input/FormTextInput";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { useSpinner } from "../../../context/Spinner";

type Props = {
  chat: any;
  user: any;
  setUser: any;
};

type Inputs = {
  message: string;
};

const Chat = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

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

  useEffect(() => {
    console.log("chat", props.chat);
  }, [props.chat]);

  useEffect(() => {
    console.log("user", props.user);
  }, [props.user]);

  const [comment, setComment] = React.useState<any>(null);
  const [imageFile, setImageFile] = React.useState<any>(null);
  const [cs, setCs] = React.useState(false);
  const [csi, setCsi] = React.useState(false);
  const spinner = useSpinner();
  const imageFileExtentions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];

  const handleFileUpload = async (e: any) => {
    spinner.setLoadingState(true);
    setImageFile(e.target.files[0]);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("message", "");

    // const response = await api.post("/orders/comment", formData);
    // fetchOrder(order._id);
    setCsi(!csi);
    spinner.setLoadingState(false);
  };

  const handleComment = async (e: any) => {
    e.preventDefault();
    // const response = await api.post("/orders/comment", {
    //   orderId: order._id,
    //   comment: comment,
    // });
    // fetchOrder(order._id);
    setComment("");
    // setCs(!cs);
    // setCsi(!csi);
    // console.log(response.data);
  };

  return (
    props.user &&
    props.chat && (
      <div className="w-full chat-card p-2 text-white dark:text-black min-h-[600px]">
        <div className="relative max-w-full">
          <div className="chat-card__header flex flex-row justify-between pb-2 border-b border-slate-700">
            <div className="flex flex-row gap-3 items-center">
              <img
                className="w-10 h-10 object-cover rounded-xl"
                src={`https://pixelpark-images.s3.amazonaws.com/${props.user.profileImage}`}
                alt="profile"
              />
              <div className="flex flex-col justify-between">
                <p className="chat-card__header__left__details__name">
                  {props.user.userName}
                </p>
                <p className="chat-card__header__left__details__date text-xs">
                  {findLapsedTime(props.chat.data.updatedAt)}
                </p>
              </div>
            </div>
          </div>
          <div className="chat-card__body flex flex-col gap-3 p-2 text-white dark:text-black">
            {props.chat?.data?.conversation.map((message: any) => {
              return (
                <div
                  className={`chat-card__body__message flex flex-row gap-3 items-center py-2 px-1 border-t border-slate-700 cursor-pointer hover:bg-slate-800 ${
                    message.senderId === props.user.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div className="flex flex-col">
                    <img
                      src={`https://pixelpark-images.s3.amazonaws.com/${message.sender.profileImage}`}
                      className="rounded-xl w-10 h-10"
                      alt="profile"
                    />

                    <p className="text-xs text-center">
                      {findLapsedTime(message.createdAt)}
                    </p>

                    <p className="text-xs text-center">
                      {message.sender.userName}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs text-center">{message.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="chat-card__footer fixed bottom-0 w-[97%]">
            <div className="speech-bubble border border-slate-700 my-2 flex items-center">
              <form className="w-full" onSubmit={handleComment}>
                <input
                  type="text"
                  placeholder="Type anything here..."
                  className="input w-full focus:border-0 text-white dark:text-black bg-transparent"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
              </form>
              <label
                className="flex h-full text-xl text-white justify-center items-center cursor-pointer pr-3"
                htmlFor="dropzone-file"
              >
                <BiImageAdd />
                <input
                  className="hidden"
                  id="dropzone-file"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  // accept={imageFileExtentions}
                />
              </label>
              <button
                onClick={handleComment}
                // disabled={comment.length() == 0}
                className="h-full text-xl justify-center items-center text-white pr-3"
                type="submit"
              >
                <AiOutlineSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Chat;
