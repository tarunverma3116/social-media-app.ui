import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiPlus, BiLockAlt } from "react-icons/bi";
import Toggle from "../../components/ToggleButton";
import { useSpinner } from "../../context/Spinner";
import useCreatePost from "../../hooks/queries/posts/useCreatePost";
import { toast } from "react-toastify";

type Props = {};

const Create = (props: Props) => {
  const spinner = useSpinner();
  const [fileUrl, setFileUrl] = useState(null);
  const [fileImage, setFileImage] = useState<any>("");

  async function onChange(e: any) {
    const file = e.target.files[0];
    setFileImage(URL.createObjectURL(file));
    setFileUrl(file);
  }

  const [formInput, updateFormInput] = useState({
    caption: "",
  });

  const CreateData = async (e: any) => {
    e.preventDefault();
    spinner.setLoadingState(true);
    if (fileUrl === null) {
      alert("Please upload a file");
    } else {
      const { caption } = formInput;
      var formData = new FormData();
      formData.append("caption", caption);
      formData.append("post", fileUrl);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const res = await useCreatePost(formData);
      toast.success("Posted Successfully", { toastId: "toast-message" });
    }
    spinner.setLoadingState(false);
  };

  return (
    <section>
      <div className="flex flex-col">
        <p className="text-2xl text-white font-bold text-shadow dark:text-foreground-secondary">
          Create a post
        </p>
        <div className="flex">
          <div className="md:columns-2xl lg:columns-3xl columns-xs mr-5">
            <p className="font-semibold text-xl text-white dark:text-foreground-secondary mt-6 mb-2">
              Upload file
            </p>
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center justify-start w-full">
                <label className="flex flex-col w-full h-[330px] box-border border-2 rounded-lg border-dashed dark:border-[#6A8099] border:[#6A8099]">
                  <div className="flex flex-col place-items-center justify-center mt-32">
                    <div className="btn bg-white dark:bg-[#F4F4F5] border dark:border-[#BFCBD9] text-black px-8 py-2 font-bold text-sm dark:text-foreground-secondary">
                      Choose File
                    </div>
                    <p className="mt-12 text-white text-base font-semibold dark:text-foreground-secondary">
                      Files Supported
                    </p>
                    <p className="text-[#BFCBD9] font-light text-base dark:text-foreground-secondary">
                      JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF
                    </p>
                  </div>
                  <input
                    type="file"
                    className="opacity-0"
                    id="upload-photo"
                    onChange={onChange}
                  />
                </label>
                {/* } */}
              </div>
            </div>
            <div className="md:block  lg:hidden block">
              <div className="columns-xs flex flex-col top-20 md:w-full w-full lg:w-[280px] lg:h-[330px] ">
                <p className="mt-12 mb-2 font-semibold text-xl text-white dark:text-foreground-secondary">
                  Preview
                </p>
                <div className="dark:bg-white mb-4">
                  {fileUrl ? (
                    <img
                      className="w-full h-[330px] min-h-[330px] rounded-lg object-cover cursor-pointer"
                      src={fileImage}
                      alt=""
                    />
                  ) : (
                    <div>
                      <div className="preview-box dark:bg-white dark:backdrop-blur-xl dark:shadow-[0px 8px 36px rgba(132, 145, 179, 0.18)] h-[330px] grid place-items-center items-center text-center p-8">
                        Upload file and choose collection to preview your brand
                        new NFT
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col my-6">
              <div className="flex flex-col ">
                <label className="text-base text-white font-semibold  mb-2 dark:text-foreground-secondary ">
                  Caption
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full text-xs text-white bg-[#0C111A] dark:text-foreground-secondary dark:bg-white dark:text-foreground-secondary border dark:border-[#BFCBD9] border-[#6A8099]"
                  onChange={(e) =>
                    updateFormInput({ ...formInput, caption: e.target.value })
                  }
                />
              </div>
            </div>
            <label
              className="bg-gradient-to-r from-[#23AEE3] via-[#9B71D8] to-[#FD3DCE] border-0 text-white rounded-lg font-sm font-bold  outline-0 mr-3 w-1/4 btn"
              onClick={CreateData}
            >
              Create
            </label>
          </div>
          <div className="md:hidden lg:block hidden">
            <div className="columns-xs flex flex-col  top-20 w-[280px] h-[330px] ">
              <p className="mt-6 mb-2 font-semibold text-xl text-white dark:text-foreground-secondary">
                Preview
              </p>
              <div className="dark:bg-white mb-4">
                {fileUrl ? (
                  <img
                    className="w-full h-[330px] min-h-[330px] rounded-lg object-cover cursor-pointer"
                    src={fileImage}
                    alt=""
                  />
                ) : (
                  <div>
                    <div className="preview-box dark:bg-white dark:backdrop-blur-xl dark:shadow-[0px 8px 36px rgba(132, 145, 179, 0.18)] h-[330px] grid place-items-center items-center text-center p-8">
                      Upload file and choose collection to preview your brand
                      new NFT
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Create;
