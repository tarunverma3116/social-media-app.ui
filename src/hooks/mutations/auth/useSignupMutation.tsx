import api from "api/axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { showToaster } from "utils/toast-utils";

type SignupResponse = {
  hash: string;
  message: string;
};

interface ISignUp {
  emailId: string;
  password: string;
  name: string;
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
    async ({ emailId, password, name }: ISignUp) => {
      const payload = {
        name,
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
      const signupResponse = await api.post("/issuers/create", payload);
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