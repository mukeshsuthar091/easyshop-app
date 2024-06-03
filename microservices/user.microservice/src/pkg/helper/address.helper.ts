import { Injectable } from "@nestjs/common";

import { db } from "src/modules";
import { Address } from "src/modules/address.entity";
import { address } from "../interfaces";

@Injectable()
export class AddressHelper {
    constructor() { }

    async GetAllByUid(uid: number): Promise<Array<Address>> {
        try {
            return await db.Address.findAll({
                where: { userId: uid }
            });
        } catch (error) {
            throw error;
        }
    }

    async GetOneByID({ uid, aid }: { uid: number, aid: number }): Promise<Address> {
        try {
            return await db.Address.findOne({
                where: { userId: uid, id: aid }
            });
        } catch (error) {
            throw error;
        }
    }

    async StoreOne({ address }: { address: address; }): Promise<Address> {
        try {
            return await db.Address.create(address);
        } catch (error) {
            throw error;
        }
    }

    async UpdateOne({ a, aid }: { a: address, aid: number }) {
        try {
            return await db.Address.update(a, { where: { id: aid } })
        } catch (error) {
            throw error;
        }
    }
}