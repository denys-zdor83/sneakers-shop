import axiosApiInstance from "@axios";
import { EndpointsEnum } from "@api/http-common/prefix.enum";
import type {
  ServiceResponseType,
  IGetAllGoodsParams,
  RGetAllGoods,
  IPostAllOrdersData,
  RPostAllOrders,
  IGetAllFavoritesParams,
  RGetAllFavorites,
  IAddToFavoritesData,
  RAddToFavorites,
} from "@api/interfaces";

export class UrlsService {
  public GetAllGoods (
    params: IGetAllGoodsParams,
  ): ServiceResponseType<RGetAllGoods> {
    return axiosApiInstance.get(EndpointsEnum.Urls.AllGoods, { params });
  }

  public PostAllOrders (
    data: IPostAllOrdersData,
  ): ServiceResponseType<RPostAllOrders> {
    return axiosApiInstance.post(EndpointsEnum.Urls.AllOrders, data);
  }

  public GetAllFavorites (
    params: IGetAllFavoritesParams,
  ): ServiceResponseType<RGetAllFavorites[]> {
    return axiosApiInstance.get(EndpointsEnum.Urls.AllFavorites, { params });
  }

  public AddToFavorites (
    data: IAddToFavoritesData,
  ): ServiceResponseType<RAddToFavorites> {
    return axiosApiInstance.post(EndpointsEnum.Urls.AllFavorites, data);
  }

  public DeleteFromFavorites (
    itemId: number,
  ): ServiceResponseType<any> {
    return axiosApiInstance.delete(EndpointsEnum.Urls.DeleteFromFavorites(itemId));
  }
}