import React, { useEffect, useState } from "react";
import Rectangle from "../../assets/images/profile/Rectangle.jpeg";
import Robo from "../../assets/images/profile/Robo.png";
import { Skeleton } from "@mui/material";
import getUserDetails from "../../hooks/mutations/account/getUserDetails";
import Settings from "../Settings/Settings";
import AllPosts from "./components/AllPosts";
import useFetchUserPosts from "../../hooks/queries/account/useFetchUserPosts";

type Props = {};

const Profile = (props: Props) => {
  const [accDetails, setAccDetails] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState<any>([]);

  const fetchAccountDetails = async () => {
    setLoading(true);
    const response = await getUserDetails();
    console.log("account details", response.data);
    setAccDetails(response.data);
    setLoading(false);
  };

  const FetchUserPosts = async () => {
    const response = await useFetchUserPosts();
    console.log("user posts", response);
    setPosts(response.data);
  };

  const convertTimeStampToDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toDateString().slice(4);
  };

  useEffect(() => {
    fetchAccountDetails();
    FetchUserPosts();
  }, []);

  useEffect(() => {
    // fetchAccountDetails();
  }, [open]);

  const [activeTab, setActiveTab] = useState("posts");

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
                className="h-[180px] w-[180px] rounded-2xl"
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
        </div>
        <div className="sm:flex justify-between sm:mb-0 mb-10">
          <div className="ml-10">
            <div className="token-group flex flex-col gap-3 text-white dark:text-black">
              <p className="text-3xl"> {accDetails?.name}</p>
              <h3 className="text-xl font-bold">
                @{accDetails.userName ? accDetails.userName : "Loading..."}
              </h3>
              <div className="flex items-center gap-6">
                {/* <div class="flex items-center btn  bg-white text-black px-6  ">
                    <FiUserPlus class="mr-2  " />
                    <p> Follow</p>
                  </div> */}
                {/* <div className="flex justify-center rounded-lg w-32 border p-4 border-gray-500">
                    SHARE 
                    SHARE <FiUpload />
                  </div> */}
                {/* <div className="rounded-lg border p-4 border-gray-500">
                    <BsThreeDots />
                  </div> */}
              </div>
            </div>

            {/* <div class="flex flex-row justify-between">
          <div class="mt-[25px]">
            <button class="btn bg-white text-black    w-[147px] h-[48px] ">
              <FiUserPlus class=" w-[22.5px] h-[21px] mr-[2px] " />
              Follow
            </button>
            <button class="btn btn-active btn-ghost ml-[12px]  w-[48px] h-[48px]">
              <FiShare class="stroke-white w-[18px] h-[21px] " />
            </button>
            <button class="btn btn-active btn-ghost ml-[12px] w-[48px] h-[48px] ">
              <BsThreeDots class="stroke-white w-[22.5px] h-[21px]" />
            </button>
          </div>
        </div> */}
          </div>
          <div>
            <label
              htmlFor="my-modal"
              onClick={() => setOpen(true)}
              className="mb-6 flex flex-end justify-end text-background-highlight font-bold text-sm mt-2 cursor-pointer hover:underline"
            >
              Edit Profile
            </label>
            <div className="w-[380px] border border-gray-700 rounded-2xl backdrop-blur-lg backdrop-filter ">
              <div className="flex justify-between p-8">
                <div className="text-white flex flex-col gap-2 text-base font-light dark:text-black">
                  <p>Followers</p>
                  <p>Following</p>
                  <p>Joined</p>
                </div>
                <div className="flex flex-col gap-2 text-right text-white text-base font-semibold dark:text-black">
                  <p>{accDetails?.following?.length}</p>
                  <p>{accDetails?.followers?.length}</p>
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
