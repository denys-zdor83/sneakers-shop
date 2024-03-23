import axiosApiInstance from "../../plugins/axios";
import { EndpointsEnum } from "../http-common/prefix.enum";

import type {
  ServiceResponseType,
} from "../interfaces";

export class UrlsService {
  public GetAllGoods (
    params: any,
  ): ServiceResponseType<any> {
    return axiosApiInstance.get(EndpointsEnum.Urls.AllGoods, { params });
  }

  public GetAllOrders (
    data: any,
  ): ServiceResponseType<any> {
    return axiosApiInstance.post(EndpointsEnum.Urls.AllOrders, data);
  }

  public GetAllFavorites (
    params: any,
  ): ServiceResponseType<any> {
    return axiosApiInstance.get(EndpointsEnum.Urls.AllFavorites, { params });
  }

  public AddToFavorites (
    data: any,
  ): ServiceResponseType<any> {
    return axiosApiInstance.post(EndpointsEnum.Urls.AllFavorites, data);
  }

  public DeleteFromFavorites (
    itemId: number,
  ): ServiceResponseType<any> {
    return axiosApiInstance.delete(EndpointsEnum.Urls.DeleteFromFavorites(itemId));
  }
}