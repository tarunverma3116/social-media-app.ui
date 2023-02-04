import React from "react";
import api from "api/axios";

const useFollowUser = async (id: any) => {
  const response = await api.post(`/users/follow/${id}`);
  console.log(response.data);
  return response.data;
};

export default useFollowUser;
