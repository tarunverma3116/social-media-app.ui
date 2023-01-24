import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { queryClient } from 'index';

const defaultOptions = {
  baseURL: "http://localhost:5001/api/v1/",
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`, 
    'Content-Type': 'application/json',
  },
};

// Create instance
export const api = axios.create(defaultOptions);

// Set the AUTH token for any request
api.interceptors.request.use(function (config:any) {
  const token = localStorage.getItem('access_token');
  if (token){
    config.headers = {
      Authorization:`Bearer ${token}`
    }
  }
  return config;
}
);

api.interceptors.response.use((response) => {
  return response;
},
(err) => {
  //401 logic
  if(err?.response?.status === 401) {
    queryClient.setQueryData("user", undefined);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
  return Promise.reject(err);
}
);

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest: any) => axios.post('https://www.example.com/auth/token/refresh', {
  refresh_token: localStorage.getItem('refresh_token')
}).then(tokenRefreshResponse => {
    localStorage.setItem('access_token', tokenRefreshResponse.data.token);
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
    return Promise.resolve();
});

//createAuthRefreshInterceptor(api, refreshAuthLogic);
export default api;