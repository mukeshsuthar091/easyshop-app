import { HttpStatus, Injectable } from "@nestjs/common";
import { Response } from "express";
import { ErrorCode, SuccessMessage } from "src/core/constants";

import { ResponseHandler } from "src/pkg/common";
import { AddressHelper } from "src/pkg/helper";
import { address } from "src/pkg/interfaces";

@Injectable()
export class AddressService {
    constructor(
        private address: AddressHelper,
        private rest: ResponseHandler
    ) { }

    async GelAll({ uid, Response }: { uid: number; Response: Response; }): Promise<Response<any, Record<string, any>>> {
        try {
            const addresses = await this.address.GetAllByUid(uid);

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, 'Get addresses succeed.', addresses);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async GetOne({ uid, aid, Response }: { uid: number; aid: number; Response: Response; }): Promise<Response<any, Record<string, any>>> {
        try {
            const address = await this.address.GetOneByID({ uid, aid });
            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, 'Get address succeed.', address);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async Store({ a, uid, Response }: { a: address, uid: number, Response: Response }): Promise<Response<any, Record<string, any>>> {
        try {
            a.userId = uid;
            const address = await this.address.StoreOne({ address: a });
            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, 'Address created successfully.', address);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async Update({ a, uid, aid, Response }: { a: address, uid: number, aid: number, Response: Response }): Promise<Response<any, Record<string, any>>> {
        try {
            const address = await this.address.GetOneByID({ uid, aid });
            if (!address) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, 'Address not found!', undefined);

            const new_address = {
                address: a.address ? a.address : address.address,
                address_type: a.address_type ? a.address_type : address.address_type,
                latitude: a.latitude ? a.latitude : address.latitude,
                longitude: a.longitude ? a.longitude : address.longitude,
                city: a.city ? a.city : address.city,
                state: a.state ? a.state : address.state,
                country: a.country ? a.country : address.country,
                userId: uid
            }

            const updated = await this.address.UpdateOne({ a: new_address, aid });
            let changedAddress = await this.address.GetOneByID({ uid, aid });

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, 'Address updated successfully.', changedAddress);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async Delete({ uid, aid, Response }: { uid: number; aid: number; Response: Response; }): Promise<Response<any, Record<string, any>>> {
        try {
            const address = await this.address.GetOneByID({ uid, aid });
            await address.destroy();
            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, 'Address deleted successfully.', undefined);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

}