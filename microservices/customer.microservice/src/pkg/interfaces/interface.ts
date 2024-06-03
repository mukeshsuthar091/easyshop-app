export type NumString = number | string;

export interface search {
    categories?: Array<any> | undefined;
    subCategories?: Array<any> | undefined;
    products?: Array<any> | undefined;
    is_category: boolean;
    is_subCategory: boolean;
    is_product: boolean;
}

export interface searchResult {
    total: number;
    search: search;
}

export interface homepage {
    banners: Array<any>;
    popular_prods: Array<any>;
    categories: Array<any>;
    prodForYou: Array<any>;
}

export interface response {
    status_code: number;
    message: string;
    data: any;
    status: number;
}

export interface error_response {
    status_code: number;
    code: string;
    message: string;
    timestamp: Date;
    status: number;
    error: any;
}

export interface filter {
    is_category: boolean;
    is_subCategory: boolean;
    is_product: boolean;
}

export interface  order_prod {
    readonly quantity: number;
    readonly productId: number;
    readonly productSizeId: number;
    readonly productColorId?: number;
}


