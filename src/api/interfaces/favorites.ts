export interface IGetAllFavoritesParams {
    _relations: string;
}

interface IOneProductItem {
    id: number;
    imageUrl: string;
    price: number
    title: string;
}

export interface RGetAllFavorites {
    product: IOneProductItem;
    id: number
}

export interface IAddToFavoritesData {
    product_id: number;
}

export interface RAddToFavorites {
    product_id: number;
    id: number;
}