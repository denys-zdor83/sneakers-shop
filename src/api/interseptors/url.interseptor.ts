import { type InternalAxiosRequestConfig } from 'axios';

const AXIOS_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const UrlInterceptor = (
  request: InternalAxiosRequestConfig
): InternalAxiosRequestConfig  => {
  request.url = `${AXIOS_BASE_URL}/${request.url}`;
  return request;
};