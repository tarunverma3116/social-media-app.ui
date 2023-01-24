import api from "api/axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

type CreateDealResponse = {
  accessToken: string;
};

interface ICreateDeal {
  emailId: string;
  password: string;
}

const useCreateDeal = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    async ({ emailId, password }: ICreateDeal) => {
      const createDealResponse = await api.post("/deals/create", {
        emailId,
        password,
      });

      const { accessToken } = createDealResponse.data.data;

      if (!accessToken) {
        throw new Error("Login failed");
      }
      return createDealResponse.data as any;
    },
    {
      onSuccess: (createDealResponse) => {
        return createDealResponse;
      },
    }
  );
};

export default useCreateDeal;
