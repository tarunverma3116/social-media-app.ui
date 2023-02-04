import api from "api/axios";

const getUserDetailsFromId = async (id: any) => {
  const response = await api.get(`/users/user/${id}`);
  console.log(response.data);
  return response.data;
};

export default getUserDetailsFromId;
