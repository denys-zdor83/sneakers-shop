import {
  UrlsService,
} from "./http-services";

export * from "./http-services";
export * from "./interseptors";

export class API_CONTEXT {
  UrlsService: UrlsService = new UrlsService();
}

export const API: API_CONTEXT = new API_CONTEXT();