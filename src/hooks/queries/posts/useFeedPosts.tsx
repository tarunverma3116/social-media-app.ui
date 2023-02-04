import React from "react";
import axios from "axios";
import api from "../../../api/axios";

const useFeedPosts = async () => {
  const response = await api.get("users/feed/");
  return response.data;
};

export default useFeedPosts;
