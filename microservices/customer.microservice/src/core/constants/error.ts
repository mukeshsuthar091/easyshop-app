// Error Code
export const ErrorCode = {
    ERR_BAD_REQUEST: "BadRequestError",
    ERR_INTERNAL_SERVER: "InternalServerError",
    ERR_CONFLICT: "ConflictError",
    ERR_NOT_FOUND: "NotFoundError",
    ERR_UNAUTHORIZED: "UnauthorizedError",
}

// Error Message
export const ErrorMessage = {
    ERROR_VALIDATION: "Please ensure that required fields are supplied correctly!",
    ERROR_INTERNAL_SERVER: "Some thing wents wrong!",
    ERROR_TOKEN_NOT_FOUND: "Token not found!",
    ERROR_PRODUCT_NOT_FOUND: "Products not found!",
    ERROR_NO_DATA: "No data!",
    ERROR_NO_HEADER: "Authorization header not found!",
    ERROR_INVALID_TOKEN_TYPE: "Inavlid token_type!",
    ERROR_INVALID_TOKEN: "Invalid token signature or expired!",
    ERROR_COUPON_NOT_FOUND: "Coupon not found!",
    ERROR_CART_ITEMS_NOT_FOUND: "CartItems not found!",
    ERROR_LIMIT_REACHED: "Coupon usage limit has been reached!",
    ERROR_MIN_ORDER_VALUE(min_order_value: number): string { return `Min order value must be grater than ${min_order_value}!` },
    ERROR_FAVOURITE_ALREADY_EXIST: "Product already in favourite list!",
    ERROR_FAVOURITE_NOT_EXIST: "Product not found in favourite list!",
}