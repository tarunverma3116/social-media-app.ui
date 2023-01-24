import PrimaryButton from "../../components/Button/Button";
import FormTextInput from "../../components/Input/FormTextInput";
import Loginimage from "../../assets/images/login/login.png";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToaster } from "../../utils/toast-utils";
import { FcGoogle } from "react-icons/fc";

type Inputs = {
  email: string;
  password: string;
};

interface Props {}

const ResetPassword = (props: Props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  //   const loginMutation = useLoginMutation();
  const [showDialog, setShowDialog] = useState(false);

  //   const onSubmit: SubmitHandler<Inputs> = (data) => {
  //     console.log(data, errors);
  //     loginMutation.mutate(data);
  //   };

  return (
    <>
      <div style={{ width: "100%" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
          <div className="relative hidden lg:flex">
            <img src={Loginimage} className="w-full h-screen" alt="" />
          </div>
          <div className="form-container bg-foreground-highlight grid place-items-center justify-items-center">
            <form className="flex-col place-items-center  py-6 lg:w-1/2">
              <AiOutlineLeft />
              <div className="font-semibold text-3xl mb-12 text-neutral-50 mt-5">
                Reset Password
              </div>
              {/* {loginMutation?.error instanceof Error && <p>{loginMutation?.error?.response?.data?.message!}</p>} */}
              <FormTextInput
                label="Email"
                className="mb-6"
                register={() => register("email", { required: true })}
                error={errors.email && "Email Required"}
              />

              <div className="btn w-full  my-2 bg-foreground-accent disabled:bg-opacity-70 border-0 oultline-none">
                Next
              </div>
            </form>
            {/* { showDialog&& <ForgotPasswordDialog onClose={()=>setShowDialog(false)}/>} */}
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};
export default ResetPassword;
