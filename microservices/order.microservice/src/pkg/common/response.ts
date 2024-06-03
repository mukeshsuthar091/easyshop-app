import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Response } from "express";

import { ErrorCode, ErrorMessage } from "src/core/constants";
import { error_response, response } from "../interfaces";

@Injectable()
export class ResponseHandler {

    private logger = new Logger('EasyShop_Server');

    SuccessJSONResponse(Res: Response, status_code: number, message: string, data: any): Response<any, Record<string, any>> {

        const response: response = {
            status_code, message, data, status: 1,
        }

        return Res.status(status_code).json(response);
    }

    ErrorJSONResponse(Res: Response, error: any): Response<any, Record<string, any>> {

        const response: error_response = {
            status_code: error.status_code || HttpStatus.INTERNAL_SERVER_ERROR,
            code: error.code || error.name || ErrorCode.ERR_INTERNAL_SERVER,
            message: error.message || ErrorMessage.ERROR_INTERNAL_SERVER,
            timestamp: error.timestame || new Date(),
            error: JSON.stringify(error.error) || JSON.stringify(error),
            status: 0,
        }

        this.logger.error(response)

        return Res.status(response.status_code).json(response);
    }

    GenerateError(status_code: number, code: any, message: string, error: any): error_response {

        const newError: any = new Error();

        newError.status_code = status_code;
        newError.code = code;
        newError.message = message;
        newError.error = error ? error : undefined;
        newError.timestamp = new Date();

        return newError;
    }
}

export function ErrorResponse(status_code: number, code: any, message: string, timestamp: Date, error: any) {

    const response: error_response = {
        status_code, code, message, error: JSON.stringify(error), timestamp, status: 0,
    }

    return response;
}