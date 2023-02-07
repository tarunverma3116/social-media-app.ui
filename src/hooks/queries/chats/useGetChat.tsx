import React from "react";
import axios from "axios";
import api from "../../../api/axios";

const useGetChat = async (id: any) => {
  const response = await api.get(`chats/${id}/`);
  return response.data;
};

export default useGetChat;
