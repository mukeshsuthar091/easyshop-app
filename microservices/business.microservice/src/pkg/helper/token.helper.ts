import { HttpStatus } from "@nestjs/common";
import { ErrorCode, ErrorMessage } from "src/core/constants";
import { AppToken } from "src/modules/app_token.entity";
import { GenerateError } from "../common";

export class TokenHelper {

    GetMinutes() {
        const time = process.env.ACCESS_TOKEN_LIFE.split(' ');

        let newMinutes: number;

        switch (time[1]) {
            case "m": {
                newMinutes = parseInt(time[0]);
            }
            case "h": {
                newMinutes = parseInt(time[0]) * 60;
            }
            case "d": {
                newMinutes = parseInt(time[0]) * 24 * 60;
            }
            case "w": {
                newMinutes = parseInt(time[0]) * 24 * 60 * 7;
            }
            case "y": {
                newMinutes = parseInt(time[0]) * 24 * 60 * 365;
            }
            case "s": {
                newMinutes = parseInt(time[0]) / 60;
            }
        }

        return newMinutes;
    }

    async CreateToken(token: any) {
        try {
            const newToken = await AppToken.create(token);
            return newToken;
            
        } catch (error) {
            throw error;
        }
    }

    async UpdateToken(
        access_token: string,
        ttl: any,
        device_token: any,
        userId: any
    ) {
        try {

            const token = await AppToken.findOne(
                {
                    where: {
                        userId: userId
                    }
                }
            );

            if (!token) throw GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, ErrorMessage.ERROR_TOKEN_NOT_FOUND, undefined);

            token.access_token = access_token;
            token.expiry = ttl;
            token.device_token = device_token;
            token.access_count += 1;

            await token.save();

            return token;

        } catch (error) {
            throw error;
        }
    }
}