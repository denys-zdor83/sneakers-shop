import { AxiosError, type AxiosResponse } from 'axios';
import { useToast } from "vue-toastification";

export const ErrorInterceptor = (error: AxiosError): Promise<AxiosResponse> => {
  const getJsonErrorData = error.toJSON();
  const responseData = error?.response?.data || getJsonErrorData;
  const toast = useToast();

  if (getJsonErrorData.status === 404) {
    toast.error(responseData.message);

    return Promise.reject(responseData);
  }

  return Promise.reject(getJsonErrorData);
};