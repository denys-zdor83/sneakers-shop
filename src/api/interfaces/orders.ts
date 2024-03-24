export interface IOneOrder {
    favoriteId: number | null;
    id: number;
    imageUrl: string;
    isAdded: boolean;
    isFavorite: boolean;
    price: number;
    title: string;
}

export interface IPostAllOrdersData {
    items: IOneOrder[];
    totalPrice: number;
}

export interface RPostAllOrders {
    id: number;
    items: IOneOrder[];
    totalPrice: number;
}