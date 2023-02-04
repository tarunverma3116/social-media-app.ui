import React from "react";
import axios from "axios";
import api from "../../../api/axios";

const useFetchPostsFromId = async (id: any) => {
  const response = await api.get(`users/posts/${id}`);
  return response.data;
};
export default useFetchPostsFromId;
