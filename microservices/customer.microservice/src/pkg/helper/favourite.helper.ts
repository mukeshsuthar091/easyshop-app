import { HttpStatus, Injectable } from "@nestjs/common";

import { db } from "src/modules";
import { ResponseHandler } from "../common";
import { ErrorCode, ErrorMessage } from "src/core/constants";


@Injectable()
export class FavouriteHelper {

    constructor(
        private rest: ResponseHandler,
    ) { }

    async CreateFav(uid: number, prodId: number) {
        try {
            const isExist = await db.Favourite.findOne({ where: { userId: uid, productId: prodId } });
            if (isExist) throw this.rest.GenerateError(HttpStatus.CONFLICT, ErrorCode.ERR_CONFLICT, ErrorMessage.ERROR_FAVOURITE_ALREADY_EXIST, undefined);

            const favourite = await db.Favourite.create({ productId: prodId, userId: uid });
            return favourite;
        } catch (error) {
            throw error
        }
    }

    async GetFav(uid: number) {
        try {
            const favourites = await db.Favourite.findAll({ where: { userId: uid } });
            
            return favourites;
        } catch (error) {
            throw error
        }
    }

    async DeleteFav(uid: number, prodId: number) {
        try {
            const isExist = await db.Favourite.findOne({ where: { userId: uid, productId: prodId } });
            if (!isExist) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND , ErrorMessage.ERROR_FAVOURITE_NOT_EXIST, undefined);

            await isExist.destroy();
            return
        } catch (error) {
            throw error
        }
    }
}