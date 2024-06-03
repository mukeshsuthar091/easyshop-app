import { HttpStatus, Injectable } from "@nestjs/common";

import { ErrorCode, ErrorMessage } from "src/core/constants";
import { User } from "src/modules/user.entity";
import { ResponseHandler } from "../common";
import { Business } from "src/modules/business.entity";

@Injectable()
export class UserHelper {

    constructor(private rest: ResponseHandler) { }

    async GetUser(phone: string | number) {
        try {
            const user = await User.findOne(
                {
                    where: {
                        phone
                    }
                }
            );

            return user;
        }
        catch (error) {
            throw error;
        }
    }

    async GetUserById(userId: number) {
        try {
            const user = await User.findByPk(userId);
            
            return user;
        } catch (error) {
            throw error;
        }
    }

    async CreateUser(user: any) {
        try {
            const newUser = await User.create(user);

            return newUser;
        }
        catch (error) {
            throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, ErrorMessage.ERROR_VALIDATION, error);
        }
    }

    async StoreBusinessData(data: any) {
        try {
            const userData = await Business.create(data);

            return userData;
        }
        catch (error) {
            throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, ErrorMessage.ERROR_VALIDATION, error);
        }
    }
}