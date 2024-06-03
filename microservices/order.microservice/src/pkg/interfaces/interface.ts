export type NumString = number | string;

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
    readonly error?: any;
}

export interface order_prod {
    readonly quantity: number;
    readonly productId: number;
    readonly productSizeId: number;
    readonly productColorId?: number;
    readonly productSpecificationId?: number;
}