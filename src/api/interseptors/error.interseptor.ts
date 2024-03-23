import { AxiosError, type AxiosResponse } from 'axios';

export const ErrorInterceptor = (error: AxiosError): Promise<AxiosResponse> => {
  const getJsonErrorData = error.toJSON();
  const responseData = error?.response?.data || getJsonErrorData;

  if (getJsonErrorData.status === 401) {
    if(!import.meta.env.VITE_SERVER_AUTH.includes(window.location.host)){
      window.location.href = import.meta.env.VITE_SERVER_AUTH
    }

    return Promise.reject(responseData);
  }

  return Promise.reject(getJsonErrorData);
};