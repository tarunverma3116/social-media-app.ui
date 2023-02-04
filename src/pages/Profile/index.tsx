import React, { useEffect, useState } from "react";
import Rectangle from "../../assets/images/profile/Rectangle.jpeg";
import Robo from "../../assets/images/profile/Robo.png";
import { Skeleton } from "@mui/material";
import getUserDetails from "../../hooks/mutations/account/getUserDetails";
import Settings from "../Settings/Settings";
import AllPosts from "./components/AllPosts";
import useFetchUserPosts from "../../hooks/queries/account/useFetchUserPosts";
import { useParams } from "react-router-dom";
import { useSpinner } from "../../context/Spinner";
import getUserDetailsFromId from "hooks/mutations/account/getUserDetailsFromId";
import { FiUserPlus } from "react-icons/fi";
import useFollowUser from "hooks/mutations/account/useFollowUser";
import { toast } from "react-toastify";
import { SlUserFollowing } from "react-icons/sl";
import useFetchPostsFromId from "hooks/queries/account/useFetchPostsFromId";

type Props = {
  account: any;
};

const Profile = (props: Props) => {
  const { account } = props;
  console.log(account, "account in profile page");
  const { id } = useParams<{ id: string }>(); // this is the id of the user whose profile we are viewing
  console.log(id, "id of the user whose profile we are viewing");
  const [accDetails, setAccDetails] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState<any>([]);
  const spinner = useSpinner();

  const fetchAccountDetailsFromId = async (id: any) => {
    spinner.setLoadingState(true);
    const response = await getUserDetailsFromId(id);
    console.log("account details", response.data);
    setAccDetails(response.data);
    spinner.setLoadingState(false);
  };

  const fetchAccountDetails = async () => {
    spinner.setLoadingState(true);
    const response = await getUserDetails();
    console.log("account details", response.data);
    setAccDetails(response.data);
    spinner.setLoadingState(false);
  };

  const FetchUserPosts = async () => {
    spinner.setLoadingState(true);
    const response = await useFetchUserPosts();
    spinner.setLoadingState(false);
    console.log("user posts", response);
    setPosts(response.data);
  };

  const FetchPostsFromId = async (id: any) => {
    spinner.setLoadingState(true);
    const response = await useFetchPostsFromId(id);
    spinner.setLoadingState(false);
    console.log("user posts", response);
    setPosts(response.data);
  };

  const convertTimeStampToDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toDateString().slice(4);
  };

  useEffect(() => {
    if (id) {
      fetchAccountDetailsFromId(id);
      FetchPostsFromId(id);
    } else {
      fetchAccountDetails();
      FetchUserPosts();
    }
  }, [id]);

  // useEffect(() => {
  //   fetchAccountDetails();
  //   FetchUserPosts();
  // }, []);

  useEffect(() => {}, [open]);

  const FollowUser = async (id: any) => {
    spinner.setLoadingState(true);
    const response = await useFollowUser(id);
    spinner.setLoadingState(false);
    if (response.message === "User followed successfully") {
      toast.success("User followed successfully", { toastId: "toast-message" });
    } else if (response.message === "Already following the user") {
      toast.info("Already following the user", { toastId: "toast-message" });
    } else {
      toast.error("Error", { toastId: "toast-message" });
    }
  };

  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {}, [id]);

  useEffect(() => {}, [FollowUser(id)]);

  return (
    accDetails && (
      <section className="mx-auto container flex flex-col gap-6 w-full">
        <div className="relative w-full pb-40 text-white dark:text-black">
          <div className="w-full inherit z-10">
            {!loading ? (
              <img
                src={
                  accDetails?.coverImage
                    ? `https://pixelpark-images.s3.amazonaws.com/${accDetails?.coverImage}`
                    : Rectangle
                }
                alt="banner"
                className="h-full inherit z-10 md:h-[275px] w-full rounded-2xl object-cover"
              />
            ) : (
              <Skeleton
                variant="rectangular"
                sx={{
                  width: "100%",
                  height: "100%",
                  bgcolor: "#f6f6f6",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
          <div className="absolute md:top-[180px] bottom-10 md:left-10 left-5">
            {!loading ? (
              <img
                src={
                  accDetails?.profileImage
                    ? `https://pixelpark-images.s3.amazonaws.com/${accDetails?.profileImage}`
                    : Robo
                }
                alt="avatar"
                className="h-[180px] w-[180px] rounded-2xl object-cover"
              />
            ) : (
              <Skeleton
                variant="rectangular"
                sx={{
                  width: "100%",
                  height: "100%",
                  bgcolor: "#f6f6f6",
                  objectFit: "fill",
                }}
              />
            )}
          </div>
        </div>
        <div className="sm:flex justify-between sm:mb-0 mb-10">
          <div className="ml-10">
            <div className="token-group flex flex-col gap-3 text-white dark:text-black">
              <p className="text-3xl"> {accDetails?.name}</p>
              <h3 className="text-xl font-bold">
                @{accDetails.userName ? accDetails.userName : "Loading..."}
              </h3>
              {id !== undefined && (
                <div
                  className="flex items-center gap-6"
                  onClick={() => FollowUser(id)}
                >
                  {account.following.includes(id) ? (
                    <button className="flex items-center hero-button gap-2 mt-3">
                      <p> Following</p>
                      <SlUserFollowing />
                    </button>
                  ) : (
                    <button className="flex items-center hero-button gap-2 mt-3">
                      <p>Follow</p>
                      <FiUserPlus />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            {!id && (
              <label
                htmlFor="my-modal"
                onClick={() => setOpen(true)}
                className="mb-6 flex flex-end justify-end text-background-highlight font-bold text-sm mt-2 cursor-pointer hover:underline"
              >
                Edit Profile
              </label>
            )}
            <div className="w-[380px] border border-gray-700 rounded-2xl backdrop-blur-lg backdrop-filter ">
              <div className="flex justify-between p-8">
                <div className="text-white flex flex-col gap-2 text-base font-light dark:text-black">
                  <p>Followers</p>
                  <p>Following</p>
                  <p>Joined</p>
                </div>
                <div className="flex flex-col gap-2 text-right text-white text-base font-semibold dark:text-black">
                  <p>{accDetails?.followers?.length}</p>
                  <p>{accDetails?.following?.length}</p>
                  <p>{convertTimeStampToDate(accDetails.createdAt)}</p>
                </div>
              </div>
            </div>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <label htmlFor="my-modal" className="modal cursor-pointer">
              <div className="w-[680px] relative bg-[#121A23] py-10 px-12 rounded-2xl">
                <label
                  htmlFor="my-modal"
                  className="cursor-pointer bg-transparent absolute right-0 px-8 text-2xl text-foreground-primary"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </label>
                <Settings
                  open={open}
                  setOpen={setOpen}
                  accDetails={accDetails}
                />
              </div>
            </label>
          </div>
        </div>
        <div className="collections-tab-group">
          <button
            className={
              activeTab === "posts"
                ? "collection-tab-active"
                : "collection-tab-non-active"
            }
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </button>
          <button
            className={
              activeTab === "people"
                ? "collection-tab-active"
                : "collection-tab-non-active"
            }
            onClick={() => setActiveTab("people")}
          >
            People
          </button>
        </div>
        <div>{activeTab === "posts" && <AllPosts posts={posts} />}</div>
      </section>
    )
  );
};

export default Profile;
