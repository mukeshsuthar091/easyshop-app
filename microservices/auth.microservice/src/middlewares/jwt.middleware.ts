import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";

import { ErrorCode, ErrorMessage } from 'src/core/constants';
import { ResponseHandler } from 'src/pkg/common';

@Injectable()
export class JwtMiddleware extends ResponseHandler implements NestMiddleware {

    constructor() { super() }

    use(request: Request, response: Response, next: NextFunction) {

        const header: string = request.get("Authorization");

        if (!header) {
            const newError = this.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, ErrorMessage.ERROR_NO_HEADER, undefined);
            return this.ErrorJSONResponse(response, newError);
        }

        if (header.split(" ")[0] !== "Bearer") {
            const newError = this.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, ErrorMessage.ERROR_INVALID_TOKEN_TYPE, undefined);
            return this.ErrorJSONResponse(response, newError);
        }

        const token = header.split(" ")[1];

        try {
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                (err, user) => {
                    if (err) {
                        throw this.GenerateError(HttpStatus.UNAUTHORIZED, ErrorCode.ERR_UNAUTHORIZED, ErrorMessage.ERROR_INVALID_TOKEN, undefined);
                    }
                    // console.log(user);
                    request.user = user
                    next();
                }
            );
        } catch (error) {
            return this.ErrorJSONResponse(response, error);
        }
    }
}