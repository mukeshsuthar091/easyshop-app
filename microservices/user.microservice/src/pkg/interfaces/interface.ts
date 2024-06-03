export type NumString = number | string;

export interface response {
    status_code: number;
    message: string;
    data: any;
    status: number;
}

export interface paginationResponse {
    status_code: number;
    message: string;
    page: number;
    limit: number;
    total: number;
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

export interface pagination {
    limit: number;
    page: number;
}