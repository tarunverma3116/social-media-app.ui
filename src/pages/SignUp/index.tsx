import PrimaryButton from "../../components/Button/Button";
import FormTextInput from "../../components/Input/FormTextInput";
import SignupImage from "../../assets/images/login/login.png";
import useSignUpMutation from "../../hooks/mutations/auth/useSignupMutation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToaster } from "../../utils/toast-utils";
import { FcGoogle } from "react-icons/fc";
import back from "assets/images/Login/Mask group(1).png";

type Inputs = {
  emailId: string;
  password: string;
  confirmed_password: string;
  name: string;
};

interface Props {}

const SignUp = (props: Props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const signupMutation = useSignUpMutation();
  const [showDialog, setShowDialog] = useState(false);

  const onSubmitHandler = (data: Inputs) => {
    console.log({ data });
    const {
      emailId,
      password,
      name,
      //   contact,
      //   countryCode,
      //   postCode,
      //   state,
      //   country,
      //   city,
    } = data;
    signupMutation.mutate({
      emailId,
      password,
      name,
      //   contact,
      //   countryCode,
      //   postCode,
      //   state,
      //   country,
      //   city,
    });
  };

  if (signupMutation.error) {
    const error = signupMutation.error as any;
    showToaster(
      "error",
      error?.response && error?.response.data.message
        ? error?.response.data.message
        : error?.message
    );
    signupMutation.reset();
  }

  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen lg:h-full">
          <div className="relative hidden lg:flex">
            <div className="w-full">
              <div className="absolute top-10 left-10">
                <a
                  className="btn btn-ghost text-white normal-case text-xl"
                  href="/"
                >
                  DIAGON ALLEY
                </a>
              </div>

              <img src={SignupImage} className="w-full h-screen" alt="" />
            </div>
          </div>
          <div className="relative">
            <div className="form-container h-full grid place-items-center bg-foreground-highlight  justify-items-center  z-20">
              <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="flex-col place-items-center py-6 lg:w-1/2"
              >
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      navigate(-1);
                    }}
                    className="btn btn-ghost text-xl font-bold"
                  >
                    <AiOutlineLeft />
                  </button>
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="btn btn-ghost text-xs font-bold"
                  >
                    Login
                  </button>
                </div>
                <div className="font-semibold text-3xl mb-12 text-neutral-50 mt-5 text-center">
                  Create a new account{" "}
                </div>
                {/* {loginMutation?.error instanceof Error && <p>{loginMutation?.error?.response?.data?.message!}</p>} */}
                <FormTextInput
                  type="text"
                  label="Name"
                  className="mb-6"
                  register={() => register("name", { required: true })}
                  error={errors.name && "Name Required"}
                />
                <FormTextInput
                  label="Email"
                  className="mb-6"
                  register={() => register("emailId", { required: true })}
                  error={errors.emailId && "Email Required"}
                />
                <FormTextInput
                  label="Password"
                  type="password"
                  register={() => register("password", { required: true })}
                  error={errors.password && "Password Required"}
                />
                <br />
                <FormTextInput
                  label="Confirm Password"
                  type="password"
                  register={() =>
                    register("confirmed_password", { required: true })
                  }
                  error={errors.confirmed_password && "Confirmation Required"}
                />
                <br />
                <br />
                <PrimaryButton
                  type="submit"
                  disabled={signupMutation.isLoading}
                  className="disabled:bg-opacity-70 w-full h-12"
                >
                  {signupMutation.isLoading ? "Signing Up" : "Sign Up"}
                </PrimaryButton>
                {/* <div className="">
                  <button className="block w-full border-2  text-black  rounded-lg p-2 my-3 bg-white disabled:bg-opacity-70 hover:bg-gray-200">
                    <span className="text-sm sm:text-base">
                      <FcGoogle className="inline mx-4 scale-150" />
                      Continue With Google
                    </span>
                  </button>
                </div> */}
              </form>
              {/* { showDialog&& <ForgotPasswordDialog onClose={()=>setShowDialog(false)}/>} */}
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
