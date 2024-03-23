export const EndpointsEnumUrls = {
  AllGoods: `goods`,
  AllFavorites: `favorites`,
  DeleteFromFavorites: (itemId: number) => `favorites/${itemId}`,
  AllOrders: `orders`,
};
