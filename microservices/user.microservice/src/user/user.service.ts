import { HttpStatus, Injectable } from "@nestjs/common";
import { Response } from "express";
import { ErrorCode, ErrorMessage, SuccessMessage } from "src/core/constants";
import { DeleteImage, UploadImage } from "src/pkg/cloudinary";
import * as fs from "fs";
import { ResponseHandler } from "src/pkg/common";
import { UpdateUserDTO } from "src/pkg/dto";
import { UserHelper } from "src/pkg/helper";
import { claims } from "src/pkg/interfaces";

@Injectable()
export class UserService {
    constructor(
        private user: UserHelper,
        private rest: ResponseHandler
    ) { }

    async GetMyProfile({ uid, role, Response }: { uid: number; role: number; Response: Response; }): Promise<Response<any, Record<string, any>>> {
        try {
            const user: any = await this.user.GetMe(uid);
            if (!user) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "User not found!", undefined);

            let business_details;
            if(role == 2){
                business_details = await this.user.GetBusinessDetail(uid);
                if (!business_details) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "User not found!", undefined); 
            }         

            delete user.dataValues.password;

            const data = {
                ...user.dataValues,
                business_details,
            }

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, 'Get user succeed.', data);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async UpdateUser(
    claims: claims,
    pl: UpdateUserDTO, 
    Response: Response): Promise<Response<any, Record<string, any>>> {
        try {

            const {userId, role} = claims;
            // const uid = claims.userId;
            // const role = claims.role;

            const user: any = await this.user.GetMe(userId);
            if (!user) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "User not found!", undefined);

            if(pl.phone && pl.phone != user.phone) {
                const userExist = await this.user.GetUser(pl.phone);
                if (userExist) throw this.rest.GenerateError(HttpStatus.CONFLICT, ErrorCode.ERR_CONFLICT, ErrorMessage.ERROR_USER_ALREADY_EXIST, undefined);
            }

            const new_user_details = {
                role: user.dataValues.role,
                first_name: pl.first_name ? pl.first_name : user.first_name,
                last_name: pl.last_name ? pl.last_name : user.last_name,
                email: pl.email ? pl.email : user.email,
                country_code: pl.country_code ? pl.country_code : user.country_code,
                phone: pl.phone ? pl.phone : user.phone,
                image: pl.image ? pl.image : user.image,
            }

            const updated = await this.user.UpdateUser({ u: new_user_details, uid: userId });

            const userData: any = await this.user.GetMe(userId);
            delete userData.dataValues.password;
            

            let business_details;
            if(role == 2){

                const business = await this.user.GetBusinessDetail(userId)

                const new_business_details = {
                    business_name: pl.business_name ? pl.business_name : business.business_name,
                    category: pl.category ? pl.category : business.category,
                    sub_category: pl.sub_category ? pl.sub_category : business.sub_category,
                    city: pl.city ? pl.city : business.city,
                    state: pl.state ? pl.state : business.state,
                    country: pl.country ? pl.country : business.country,
                    address: pl.address ? pl.address : business.address,
                    aadhaar_no: pl.aadhaar_no ? pl.aadhaar_no : business.aadhaar_no,
                    business_logo: pl.business_logo ? pl.business_logo : business.business_logo,
                    aadhaar_image: pl.aadhaar_image ? pl.aadhaar_image : business.aadhaar_image,
                }

                const updated = await this.user.UpdateBusiness({ b: new_business_details, uid: userId });
                business_details = await this.user.GetBusinessDetail(userId);
                
            }
            
            // console.log();
            let data = {
                ...userData.dataValues,
                business_details
            }

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, 'User profile updated successfully.', data);

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

}