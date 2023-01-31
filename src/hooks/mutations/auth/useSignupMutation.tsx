import api from "../../../api/axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { showToaster } from "../../../utils/toast-utils";

type SignupResponse = {
  hash: string;
  message: string;
};

interface ISignUp {
  userName: string;
  password: string;
  name: string;
  emailId: string;
  // contact:string;
  // countryCode:string;
  // postCode:string;
  // state:string;
  // country:string;
  // city:string;
}

const useSignupMutation = () => {
  const navigate = useNavigate();

  return useMutation(
    async ({ userName, password, name, emailId }: ISignUp) => {
      const payload = {
        name,
        userName,
        emailId,
        // firstname: " ",
        // lastname: " ",
        // contact,
        password,
        // countryCode,
        // address: {
        //   postCode: postCode,
        //   state: state,
        //   country: country,
        //   city:city
        // },
        // role: ['buyer'],
      };
      const signupResponse = await api.post("/users/signup", payload);
      console.log("Response ye hai", signupResponse);

      return signupResponse.data as SignupResponse;
    },
    {
      onSuccess: (signupResponse) => {
        showToaster("success", signupResponse.message);
        navigate("/home");
      },
    }
  );
};

export default useSignupMutation;
