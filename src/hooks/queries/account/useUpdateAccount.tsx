import React from "react";
import axios from "axios";
import api from "../../../api/axios";

const useUpdateAccount = async (data: any) => {
  console.log("data line 3 in hook", data);
  const response = await api.post("users/", data);
  console.log(response.data);
  return response.data;
};
export default useUpdateAccount;
