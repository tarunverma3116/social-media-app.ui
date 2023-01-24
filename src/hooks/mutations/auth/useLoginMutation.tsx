import api from "../../../api/axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

type LoginResponse = {
  data: { token: string };
};

interface ILogin {
  userName: string;
  password: string;
  setIsAuthenticated: any;
}

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    async ({ userName, password, setIsAuthenticated }: ILogin) => {
      const loginResponse = await api.post("/users/login", {
        userName,
        password,
      });
      console.log(loginResponse, "line 47");
      const { token } = loginResponse.data;
      localStorage.setItem("access_token", token);
      if (!token) {
        throw new Error("Login failed");
      }
      setIsAuthenticated(true);
      return loginResponse.data as LoginResponse;
    },
    {
      onSuccess: (loginResponse) => {
        navigate("/home");
        localStorage.setItem("token", loginResponse?.data?.token);
      },
    }
  );
};

export default useLoginMutation;
