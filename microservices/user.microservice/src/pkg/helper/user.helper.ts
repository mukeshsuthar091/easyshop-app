import { Injectable } from "@nestjs/common";

import { db } from "src/modules";
import { Business } from "src/modules/business.entity";
import { User } from "src/modules/user.entity";
import { business, user } from "../interfaces/user.interface";

@Injectable()
export class UserHelper {
    constructor() { }

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

    async GetMe(uid: number): Promise<User> {
        try {
            return await db.User.findOne({
                where: {id: uid}
            });
        } catch (error) {
            throw error;
        }
    }

    async GetBusinessDetail(uid: number): Promise<Business> {
        try {
            return await db.Business.findOne({
                where: {userId: uid}
            });
        } catch (error) {
            throw error;
        }
    }
    

    async UpdateUser({ u, uid }: { u: user, uid: number }) {
        try {
            return await db.User.update(u, { where: { id: uid } })
        } catch (error) {
            throw error;
        }
    }

    async UpdateBusiness({ b, uid }: { b: business, uid: number }) {
        try {
            return await db.Business.update(b, { where: { userId: uid } })
        } catch (error) {
            throw error;
        }
    }
}