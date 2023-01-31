import React from "react";
import axios from "axios";
import api from "../../../api/axios";

const useFetchUserPosts = async () => {
  const response = await api.get("users/posts");
  return response.data;
};
export default useFetchUserPosts;
