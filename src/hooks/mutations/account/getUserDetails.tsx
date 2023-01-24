import api from "../../../api/axios";

const getUserDetails = async () => {
  const response = await api.get("/users/");
  console.log(response.data);
  return response.data;
};

export default getUserDetails;
