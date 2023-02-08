import React, { useEffect, useRef } from "react";
import FormTextInput from "../../../components/Input/FormTextInput";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { useSpinner } from "../../../context/Spinner";
import useSendMessage from "../../../hooks/queries/chats/useSendMessage";

type Props = {
  chat: any;
  user: any;
  setUser: any;
  setChat: any;
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
  const divRef = useRef<null | HTMLDivElement>(null);
  const divRef2 = useRef<null | HTMLDivElement>(null);

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

  const HandleComment = async (e: any) => {
    e.preventDefault();
    spinner.setLoadingState(true);
    const formData = new FormData();
    formData.append("message", comment);
    const response = await useSendMessage(props.user._id, formData);
    console.log(response);
    props.setChat(response);
    setComment("");
    spinner.setLoadingState(false);
    // setCs(!cs);
    setCsi(!csi);
    // console.log(response.data);
  };

  useEffect(() => {}, [props.chat]);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [cs]);

  useEffect(() => {
    if (divRef2.current) {
      divRef2.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [csi]);

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
          <div className="chat-card__body mt-3 overflow-y-scroll scrollbar-hide max-h-[450px]">
            <div className="chat-card__body__messages grid grid-cols-1">
              {props.chat.data.conversation?.map((message: any, key: any) => (
                <div
                  className={`flex flex-col ${
                    message.senderId !== props.user._id
                      ? "justify-self-end speech-bubble-right"
                      : "justify-self-start speech-bubble-left"
                  }`}
                >
                  <p className="chat-card__body__messages__message__content__text">
                    {message.text}
                  </p>
                  {message.image && (
                    <img
                      className="w-32 h-32 object-cover rounded-xl"
                      src={`https://pixelpark-images.s3.amazonaws.com/${message.image}`}
                      alt="profile"
                    />
                  )}
                  <p
                    className={`text-xs text-slate-600 ${
                      message.senderId !== props.user._id
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    {findLapsedTime(message.time)}
                  </p>
                </div>
              ))}
              <div ref={divRef} />
              <div ref={divRef2} />
            </div>
          </div>
          <div className="chat-card__footer fixed bottom-0 w-[97%]">
            <div className="speech-bubble border border-slate-700 my-2 flex items-center">
              <form className="w-full" onSubmit={HandleComment}>
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
                onClick={HandleComment}
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
