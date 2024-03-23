import {
  ErrorInterceptor,
  UrlInterceptor,
} from "../api/interseptors";
import axios from "axios";

const createApi = () => {
  const axiosInstance = axios.create({
    withCredentials: true
  });

  axiosInstance.interceptors.request.use(UrlInterceptor);

  axiosInstance.interceptors.response.use(
    (response) => { return response.data }, 
    ErrorInterceptor,
  );

  return axiosInstance;
};

export default createApi();