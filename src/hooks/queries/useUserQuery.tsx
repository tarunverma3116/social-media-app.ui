import { useQuery, UseQueryOptions } from "react-query";
import api from "api/axios";

type User =
  | {
      profileUrl: string;
      email: string;
      firstname: string;
      middlename: string;
      lastname: string;
      countryCode: string;
      contact: string;
      address: {
        addressLine: string;
        city: string;
        country: string;
        postCode: string;
        state: string;
      };
      emailId: string;
      isEmailVerified: boolean;
      role: ["buyer"];
    }
  | undefined;

export default function useUserQuery(options?: UseQueryOptions<User>) {
  return useQuery<User>(
    "user",
    async () => {
      if (
        !localStorage.getItem("access_token")
        // !localStorage.getItem("refresh_token")
      ) {
        return undefined;
      }
      try {
        const userResponse = await api.get("/users");
        return userResponse.data as User;
      } catch (e) {
        // throwing the error causes query to always be stale
        // this is unintentional, and there doesn't appear to
        // be a way to stop this behaviour. So simply set user
        // to undefined.
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return undefined;
      }
    },
    {
      staleTime: Infinity,
      retry: 3,
      retryOnMount: false,
      // ...options,
    }
  );
}
