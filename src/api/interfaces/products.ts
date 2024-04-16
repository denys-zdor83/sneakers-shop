export interface IGetAllProductsParams {
    sortBy: string;
    title?: string;
}

export interface RGetAllProducts {
    id: number;
    imageUrl: string;
    price: number;
    title: number;
}
