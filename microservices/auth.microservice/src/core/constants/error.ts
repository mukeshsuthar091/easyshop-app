// Error Code
export const ErrorCode = {
    ERR_BAD_REQUEST: "BadRequestError",
    ERR_INTERNAL_SERVER: "InternalServerError",
    ERR_CONFLICT: "ConflictError",
    ERR_NOT_FOUND: "NotFoundError",
    ERR_UNAUTHORIZED: "UnauthorizedError",
    ERR_TWILIO_SERVICE_NOT_FOUND: "TwilioServiceNotFoundError",
}

// Error Message
export const ErrorMessage = {
    ERROR_VALIDATION: "Please ensure that required fields are supplied correctly!",
    ERROR_INTERNAL_SERVER: "Some thing wents wrong!",
    ERROR_USER_ALREADY_EXIST: "User already exist!",
    ERROR_CREDENTIALS_NO_TFOUND: "Credentials not found!",
    ERROR_INVALID_CREDENTIALS: "Invalid credentials!",
    ERROR_TOKEN_NOT_FOUND: "Token not found!",
    ERROR_PRODUCT_NOT_FOUND: "Products not found!",
    ERROR_NO_DATA: "No data!",
    ERROR_NO_HEADER: "Authorization header not found!",
    ERROR_INVALID_TOKEN_TYPE: "Inavlid token_type!",
    ERROR_INVALID_TOKEN: "Invalid token signature or expired!",
    ERROR_OTP_SEND_FAILED: "Failed to send OTP!",
    ERROR_OTP_VERIFICATION_FAILED: "Invalid OTP!",
    ERROR_TWILIO_SERVICE_NOT_FOUND(code: string, phone: string | number) { return `Twilio service may be not_found or expired for ${code + phone}!` },
    ERROR_SAME_PASSWORD: "Please use different credentials!",
}