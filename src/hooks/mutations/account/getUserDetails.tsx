import api from "../../../api/axios";

const getUserDetails = async () => {
  const response = await api.get("/users/");
  return response.data;
};

export default getUserDetails;
