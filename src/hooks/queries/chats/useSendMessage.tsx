import React from "react";
import axios from "axios";
import api from "../../../api/axios";

const useSendMessage = async (id: any, data: any) => {
  const response = await api.post(`chats/create/${id}`, data);
  return response.data;
};

export default useSendMessage;
