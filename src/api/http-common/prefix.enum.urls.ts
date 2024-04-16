export const EndpointsEnumUrls = {
  AllProducts: `products`,
  OneProduct: (id: number) => `products/${id}`,
  AllFavorites: `favorites`,
  DeleteFromFavorites: (itemId: number) => `favorites/${itemId}`,
  AllOrders: `orders`,
};
