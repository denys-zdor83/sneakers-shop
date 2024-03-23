export * from "./urls.js";

import type { AxiosResponse } from "axios";

interface ApiResponseInterface<T> {
  success: boolean;
  result: T[];
  message: null | string;
  pagination: ApiPaginationInterface | null;
}

export type ServiceResponseType<T> = Promise<
  AxiosResponse<ApiResponseInterface<T>>
>;

export interface ApiPaginationInterface {
  total: number;
  page: number;
  pageSize: number;
  pages: number;
}
