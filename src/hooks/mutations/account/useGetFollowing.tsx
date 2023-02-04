import api from "api/axios";

const useGetFollowing = async () => {
  const response = await api.get("/users/following/");
  return response.data;
};

export default useGetFollowing;
