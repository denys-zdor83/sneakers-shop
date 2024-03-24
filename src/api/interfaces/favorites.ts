export interface IGetAllFavoritesParams {
    _relations: string;
}

interface IOneGoodsItem {
    id: number;
    imageUrl: string;
    price: number
    title: string;
}

export interface RGetAllFavorites {
    good: IOneGoodsItem;
    id: number
}

export interface IAddToFavoritesData {
    good_id: number;
}

export interface RAddToFavorites {
    good_id: number;
    id: number;
}