import PrimaryButton from "../../components/Button/Button";
import FormTextInput from "../../components/Input/FormTextInput";
import Login from "assets/images/login/login.png";
import useLoginMutation from "../../hooks/mutations/auth/useLoginMutation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToaster } from "../../utils/toast-utils";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
// import useGoogleAuthMutation from "../../hooks/mutations/account/useGoogleAuthMutation";

type Inputs = {
  userName: string;
  password: string;
};

interface Props {}

const SignInForm = (props: Props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const loginMutation = useLoginMutation();
  const [showDialog, setShowDialog] = useState(false);
  const [authType, setAuthType] = useState("email");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data, errors);
    loginMutation.mutate({
      ...data,
      setIsAuthenticated: setIsAuthenticated,
    });
  };

  if (loginMutation.error) {
    const error = loginMutation.error as any;
    if (error.message === "Network Error") {
      showToaster("error", error.message);
    } else {
      showToaster(
        "error",
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data.message
      );
    }
    loginMutation.reset();
  } else if (loginMutation.isSuccess) {
    loginMutation.reset();
    showToaster("success", "Login successful");
  }

  // const GAuthMutaion = useGoogleAuthMutation();
  // const loginGoogle = useGoogleLogin({
  //   onSuccess: (tokenResponse) => {
  //     GAuthMutaion.mutate({ token: tokenResponse?.code });
  //   },
  //   flow: "auth-code",
  // });

  return (
    <>
      <div style={{ width: "100%" }}>
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
              <figure>
                <img src={Login} className="w-full h-screen" alt="" />
              </figure>
            </div>
          </div>
          <div className="relative h-full bg-foreground-highlight grid items-center place-items-center w-full">
            <div className="form-container ">
              <form onSubmit={handleSubmit(onSubmit)} className="">
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
                      navigate("/signup");
                    }}
                    className="btn btn-ghost text-xs font-bold"
                  >
                    Signup
                  </button>
                </div>
                <div className="font-semibold text-3xl mb-12 mt-5 text-center">
                  Login to your account
                </div>
                {/* {loginMutation?.error instanceof Error && <p>{loginMutation?.error?.response?.data?.message!}</p>} */}
                <div className="mb-6">
                  <FormTextInput
                    label="Username"
                    className=""
                    register={() => register("userName", { required: true })}
                    error={errors.userName && "Username Required"}
                  />
                </div>
                <div className="mb-6">
                  <FormTextInput
                    label="Password"
                    type="password"
                    register={() => register("password", { required: true })}
                    error={errors.password && "Password Required"}
                  />
                </div>
                <div className="flex justify-between my-8 flex-wrap text-sm sm:text-base">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded-full shadow"
                    />
                    <label className="mx-1">Remember Me</label>
                  </div>
                  <div
                    className="underline hover:text-slate-700 text-sm"
                    onClick={() => {
                      setShowDialog(true);
                    }}
                  >
                    Forgot Password?
                  </div>
                </div>
                <PrimaryButton
                  type="submit"
                  disabled={loginMutation.isLoading}
                  className="disabled:bg-opacity-70 w-full"
                  onClick={() => {
                    setAuthType("email");
                  }}
                >
                  {loginMutation.isLoading ? "Signing In" : "Sign In"}
                </PrimaryButton>
              </form>
              <div
                className=""
                onClick={() => {
                  setAuthType("google");
                }}
              >
                {/* <button
                  className="block place-items-center f w-full mt-4 border-2  text-black  rounded-lg p-3 bg-white disabled:bg-opacity-70 hover:bg-gray-200"
                  onClick={loginGoogle}
                >
                  <span className="text-sm sm:text-base">
                    <FcGoogle className="inline mx-4 scale-150" />
                    Continue With Google
                  </span>
                </button> */}
              </div>

              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignInForm;
