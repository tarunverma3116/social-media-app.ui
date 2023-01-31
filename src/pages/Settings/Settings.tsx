import React, { useState, useEffect } from "react";
import upload from "../../assets/images/profile/upload.png";
import Button from "../../components/Button/Button";
import { useSpinner } from "../../context/Spinner";
import useUpdateAccount from "../../hooks/queries/account/useUpdateAccount";

type Props = {
  setOpen: any;
  open: any;
  accDetails: any;
};

const Settings = (props: Props) => {
  const spinner = useSpinner();
  const [bannerFile, setBannerFile] = useState<any>();
  const [avatarFile, setAvatarFile] = useState<any>();
  const [fileUrl, setFileUrl] = useState<any>(null);
  const [avatarfileUrl, setAvatarFileUrl] = useState<any>(null);

  async function onChange(e: any) {
    const file = e.target.files[0];
    setBannerFile(await URL.createObjectURL(file));
    setFileUrl(file);
  }

  async function onChangeAvatar(e: any) {
    const file = e.target.files[0];
    setAvatarFile(await URL.createObjectURL(file));
    setAvatarFileUrl(file);
  }

  async function selectImage1(e: any) {
    const file = e.target.files[0];
    setBannerFile(await URL.createObjectURL(file));
    setFileUrl(file);
    console.log(fileUrl, "file url for upload");
  }

  async function selectImage2(e: any) {
    const file = e.target.files[0];
    setAvatarFile(await URL.createObjectURL(file));
    setAvatarFileUrl(file);
    console.log(avatarfileUrl, "avatar file url for upload");
  }

  const [formInput, updateFormInput] = useState({
    name: "",
  });

  const SendProfileData = async (e: any) => {
    e.preventDefault();
    spinner.setLoadingState(true);
    const { name } = formInput;
    var formData = new FormData();
    formData.append("name", name);
    formData.append("banner", fileUrl);
    formData.append("avatar", avatarfileUrl);
    const data = { name, avatar: avatarfileUrl, banner: fileUrl };
    console.log(data, "data line 52");
    console.log(formData, "form data line 53");
    const res = await useUpdateAccount(formData).then(
      wipeData(),
      props.setOpen(false)
    );
    console.log(res);
    spinner.setLoadingState(false);
    props.setOpen(false);
  };

  const wipeData: any = () => {
    if (props.accDetails) {
      setAvatarFileUrl(null);
      setAvatarFile(
        `https://pixelpark-images.s3.amazonaws.com/${props.accDetails.profileImage}`
      );
      setBannerFile(
        `https://pixelpark-images.s3.amazonaws.com/${props.accDetails.coverImage}`
      );
      setFileUrl(null);
      const { name } = props.accDetails;
      updateFormInput({
        name: name,
      });
    }
  };

  useEffect(() => {
    if (!props.open) {
      wipeData();
    }
  }, [props.open]);
  useEffect(() => {}, [fileUrl, avatarfileUrl, formInput]);

  return (
    <div>
      <p className="text-3xl text-white font-bold text-shadow w-full mb-6">
        Update Profile
      </p>
      <div className="">
        <div className="flex justify-start mt-4 mb-4">
          <div className="flex flex-col mr-5">
            {bannerFile ? (
              <label className="flex flex-col w-[331px] h-[143px] border-2 rounded-lg border-dashed border-gray-500 hover:bg-gray-100 hover:border-gray-300 cursor-pointer">
                <label htmlFor="upload-document">
                  <input
                    className="hidden"
                    id="upload-document"
                    name="upload-document"
                    type="file"
                    onChange={selectImage1}
                  />
                  <img
                    className="w-full h-[139px] rounded-lg object-cover cursor-pointer"
                    src={bannerFile}
                    alt="fetched"
                  />
                </label>
              </label>
            ) : (
              <label className="flex flex-col w-[331px] h-[143px] border-2 rounded-lg border-dashed border-gray-500 cursor-pointer">
                <div className="flex flex-col place-items-center justify-center items-center mt-6">
                  <img alt="upload" src={upload} />
                </div>
                <input type="file" className="opacity-0" onChange={onChange} />
              </label>
            )}
            <p className="text-white font-semibold text-base mt-6">
              Cover Image
            </p>
          </div>
          <div>
            {avatarFile ? (
              <label className="flex flex-col w-[143px] h-[143px] border-2 rounded-lg border-dashed border-gray-500">
                <label htmlFor="upload-document-2">
                  <input
                    className="hidden"
                    id="upload-document-2"
                    name="upload-document-2"
                    type="file"
                    onChange={selectImage2}
                  />
                  <img
                    className="w-[143px] h-[139px] rounded-lg object-cover cursor-pointer"
                    src={avatarFile}
                    alt=""
                  />
                </label>
              </label>
            ) : (
              <label className="flex flex-col w-[143px] h-[143px] border-2 rounded-lg border-dashed border-gray-500 cursor-pointer">
                <div className="flex flex-col place-items-center justify-center items-center mt-6">
                  <img alt="upload" src={upload} />
                </div>
                <input
                  type="file"
                  className="opacity-0"
                  onChange={onChangeAvatar}
                />
              </label>
            )}
            <p className="text-white font-semibold text-base mt-6">
              Profile Avatar
            </p>
          </div>
        </div>
        <div className="mt-12 mb-4 flex flex-col gap-3">
          <label className="font-semibold text-base text-white">
            Profile Name
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full text-sm bg-[#0C111A] text-white  border border-gray-500"
            value={formInput.name}
            onChange={(e) =>
              updateFormInput({ ...formInput, name: e.target.value })
            }
          />
        </div>
        {/* <div className="mt-4 mb-4">
          <label htmlFor="" className="font-semibold text-base text-white">
            Bio (Optional)
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full text-sm bg-[#0C111A] text-white  border border-gray-500"
            value={formInput.bio}
            onChange={(e) =>
              updateFormInput({ ...formInput, bio: e.target.value })
            }
          />
        </div>
        <div className="mt-4 mb-4">
          <label htmlFor="" className="font-semibold text-base text-white">
            External url
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full text-sm bg-[#0C111A] text-white  border border-gray-500"
            value={formInput.externalURL}
            onChange={(e) =>
              updateFormInput({
                ...formInput,
                externalURL: e.target.value,
              })
            }
          />
        </div> */}
        <div className="flex justify-end">
          <label
            className="bg-gradient-to-r from-[#23AEE3] via-[#9B71D8] to-[#FD3DCE] border-0 text-white rounded-lg font-sm font-bold  outline-0  w-full btn"
            onClick={SendProfileData}
            htmlFor="my-modal"
          >
            Update Profile
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
