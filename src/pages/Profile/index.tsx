import React, { useEffect } from "react";
import Rectangle from "../../assets/images/profile/Rectangle.jpeg";
import Robo from "../../assets/images/profile/Robo.png";
import { Skeleton } from "@mui/material";
import getUserDetails from "../../hooks/mutations/account/getUserDetails";

type Props = {};

const Profile = (props: Props) => {
  const [accDetails, setAccDetails] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchAccountDetails = async () => {
    setLoading(true);
    const response = await getUserDetails();
    console.log("account details", response.data);
    setAccDetails(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAccountDetails();
  }, []);

  return (
    <section className="mx-auto container w-full">
      <div className="relative w-full pb-40 text-white dark:text-black">
        <div className="w-full inherit z-10">
          {!loading ? (
            <img
              src={
                accDetails?.bannerImageURI
                  ? `https://pixelpark-images.s3.amazonaws.com/${accDetails?.bannerImageURI}`
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
                accDetails?.avatarImageURI
                  ? `https://pixelpark-images.s3.amazonaws.com/${accDetails?.avatarImageURI}`
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
    </section>
  );
};

export default Profile;
