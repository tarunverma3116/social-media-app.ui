import React from "react";
import axios from "axios";
import api from "../../../api/axios";

const useCreatePost = async (data: any) => {
  console.log("data line create post hook", data);
  const response = await api.post("posts/create/", data);
  console.log(response.data);
  return response.data;
};

export default useCreatePost;
