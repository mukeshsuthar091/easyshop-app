import * as argon from 'argon2';
import { Response } from "express";
import { HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Twilio } from 'twilio'
import * as fs from "fs";
import { ErrorCode, ErrorMessage, SuccessMessage } from "src/core/constants";
import { GenerateError, ResponseHandler } from "src/pkg/common";
import { LoginDTO, GenerateOtpDTO, PhoneDTO, RefreshTokenDTO, RegisterCustomerDTO, TokenDTO, VerifyOtpDTO, ChangePasswordDTO, RegisterBusinessDTO } from "src/pkg/dto";
import { UploadImage } from 'src/pkg/cloudinary';
import { TokenHelper, UserHelper } from 'src/pkg/helper';

@Injectable()
export class AuthService {

    constructor(
        private jwt: JwtService,
        private rest: ResponseHandler,
        private user: UserHelper,
        private token: TokenHelper,
    ) { }

    private signAccessToken(
        userId: number,
        phone: string | number,
        role: number,
    ): Promise<string> {
        const payload = {
            sub: userId,
            userId: userId,
            role,
            phone,
        }

        return this.jwt.signAsync(
            payload,
            {
                expiresIn: process.env.ACCESS_TOKEN_LIFE,
                secret: process.env.ACCESS_TOKEN_SECRET,
            }
        )
    }

    private signRefreshToken(
        userId: number,
        phone: string | number,
        role: number,
    ): Promise<string> {
        const payload = {
            sub: userId,
            userId: userId,
            role,
            phone,
        }

        return this.jwt.signAsync(
            payload,
            {
                expiresIn: process.env.REFRESH_TOKEN_LIFE,
                secret: process.env.REFRESH_TOKEN_SECRET,
            }
        )
    }

    async RegisterCustomer(ReqBody: RegisterCustomerDTO, Response: Response) {
        try {
            const userExist = await this.user.GetUser(ReqBody.phone);

            if (userExist) throw this.rest.GenerateError(HttpStatus.CONFLICT, ErrorCode.ERR_CONFLICT, ErrorMessage.ERROR_USER_ALREADY_EXIST, undefined);
            
            const hash = await argon.hash(ReqBody.password);

            ReqBody.password = hash;

            const user: any = await this.user.CreateUser(ReqBody);

            delete user.dataValues.password;

            const access_token = await this.signAccessToken(user.id, user.phone, user.role);

            const refresh_token = await this.signRefreshToken(user.id, user.phone, user.role);

            const ttl: any = new Date();
            ttl.setMinutes(ttl.getMinutes() + this.token.GetMinutes());

            const token_payload: TokenDTO = {
                access_token: access_token,
                device_token: null,
                expiry: ttl,
                access_count: 1,
                device_type: null,
                status: 'active',
                token_type: 'Bearer',
                userId: user.id
            }

            await this.token.CreateToken(token_payload);

            const response = {
                ...user.dataValues,
                access_token,
                ttl,
                refresh_token,
                access_count: 1,
            }

            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.CREATED,
                SuccessMessage.UserCreated,
                response
            );
        }
        catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async RegisterBusiness(ReqBody: RegisterBusinessDTO, Response: Response) {
        try {

            const userExist = await this.user.GetUser(ReqBody.phone);
            
            if (userExist) throw this.rest.GenerateError(HttpStatus.CONFLICT, ErrorCode.ERR_CONFLICT, ErrorMessage.ERROR_USER_ALREADY_EXIST, undefined);
            
            if(!(ReqBody && ReqBody.aadhaar_image) || !(ReqBody && ReqBody.business_logo)) {
                throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, ErrorMessage.ERROR_VALIDATION, undefined);   
            }

            const hash = await argon.hash(ReqBody.password);

            ReqBody.password = hash;

            const {role, first_name, last_name, email, password, country_code, phone, image} = ReqBody
            
            const user: any = await this.user.CreateUser({
                role, 
                first_name, 
                last_name, 
                email, 
                password, 
                country_code, 
                phone, 
                image
            });

            let userId = user.dataValues.id;

            const {business_name, business_logo, category, sub_category, city, state, country, address, aadhaar_no, aadhaar_image} = ReqBody;

            const businessDetail: any = await this.user.StoreBusinessData({
                userId,
                business_name,
                business_logo,
                category,
                sub_category,
                city,
                state,
                country,
                address,
                aadhaar_no,
                aadhaar_image
            });

            delete user.dataValues.password;

            const access_token = await this.signAccessToken(user.id, user.phone, user.role);

            const refresh_token = await this.signRefreshToken(user.id, user.phone, user.role);

            const ttl: any = new Date();
            ttl.setMinutes(ttl.getMinutes() + this.token.GetMinutes());

            const token_payload: TokenDTO = {
                access_token: access_token,
                device_token: null,
                expiry: ttl,
                access_count: 1,
                device_type: null,
                status: 'active',
                token_type: 'Bearer',
                userId: user.id
            }

            await this.token.CreateToken(token_payload);

            const response = {
                ...user.dataValues,
                business_detail: {...businessDetail.dataValues},
                access_token,
                ttl,
                refresh_token,
                access_count: 1,
            }

            // console.log(response);

            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.CREATED,
                SuccessMessage.UserCreated,
                response
            );
        }
        catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async Login(ReqBody: LoginDTO, Response: Response) {
        try {
            const user: any = await this.user.GetUser(ReqBody.phone);

            if (!user) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, ErrorMessage.ERROR_CREDENTIALS_NO_TFOUND, undefined);

            const validPass = await argon.verify(
                user.password,
                ReqBody.password
            );

            if (!validPass) throw this.rest.GenerateError(HttpStatus.UNAUTHORIZED, ErrorCode.ERR_UNAUTHORIZED, ErrorMessage.ERROR_INVALID_CREDENTIALS, undefined);

            delete user.dataValues.password;
            
            const access_token = await this.signAccessToken(user.id, user.phone, user.role);
            
            const refresh_token = await this.signRefreshToken(user.id, user.phone, user.role);
            console.log(access_token)

            const ttl: Date = new Date();
            ttl.setMinutes(ttl.getMinutes() + this.token.GetMinutes());

            const token = await this.token.UpdateToken(access_token, ttl, ReqBody.device_token, user.dataValues.id);

            const response = {
                ...user.dataValues,
                access_token,
                ttl,
                refresh_token,
                access_count: token.access_count,
            }

            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.OK,
                SuccessMessage.LoginSucceed,
                response
            );
        }
        catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async CheckPhone(ReqBody: PhoneDTO, Response: Response) {
        try {
            const userExist = await this.user.GetUser(ReqBody.phone);

            if (userExist) throw this.rest.GenerateError(HttpStatus.CONFLICT, ErrorCode.ERR_CONFLICT, ErrorMessage.ERROR_USER_ALREADY_EXIST, undefined);

            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.OK,
                SuccessMessage.GoodToGo,
                ReqBody.phone
            )
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async RefreshToken(ReqBody: RefreshTokenDTO, Response: Response) {
        try {

            const check = await this.jwt.verifyAsync(
                ReqBody.refresh_token,
                {
                    secret: process.env.REFRESH_TOKEN_SECRET
                },
            );

            let access_token: string;

            if (check) {
                access_token = await this.signAccessToken(check.userId, check.phone, check.role);
            }

            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.OK,
                SuccessMessage.FetchRefreshToken,
                { access_token }
            );

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async GenerateOTP(ReqBody: GenerateOtpDTO, Response: Response) {
        try {
            const country_code = ReqBody.country_code;
            const number = ReqBody.phone;

            const client = new Twilio(
                process.env.ACCOUNT_SID as string,
                process.env.AUTH_TOKEN as string,
            );

            const otp = await client.verify
                .services(process.env.SERVICE_ID as string)
                .verifications.create(
                    {
                        to: `${country_code}${number}`,
                        channel: 'sms',
                    }
                );

            if (otp.status === 'pending') {
                return this.rest.SuccessJSONResponse(
                    Response,
                    HttpStatus.OK,
                    SuccessMessage.SendOTP,
                    undefined
                )
            } else {
                throw this.rest.GenerateError(HttpStatus.INTERNAL_SERVER_ERROR, ErrorCode.ERR_INTERNAL_SERVER, ErrorMessage.ERROR_OTP_SEND_FAILED, undefined);
            }

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async VerifyOTP(ReqBody: VerifyOtpDTO, Response: Response) {
        try {
            const country_code = ReqBody.country_code;
            const number = ReqBody.phone;
            const otp = ReqBody.otp;

            const client = new Twilio(
                process.env.ACCOUNT_SID as string,
                process.env.AUTH_TOKEN as string,
            );

            const check = await client.verify
                .services(process.env.SERVICE_ID as string)
                .verificationChecks.create(
                    {
                        to: `${country_code}${number}`,
                        code: otp,
                    }
                );

            if (check.valid == false) {
                throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, ErrorMessage.ERROR_OTP_VERIFICATION_FAILED, undefined);
            }

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, SuccessMessage.VerifyOTP, undefined);
        }
        catch (error) {
            if (error?.status === 404) {
                error.status_code = HttpStatus.NOT_FOUND,
                    error.code = ErrorCode.ERR_TWILIO_SERVICE_NOT_FOUND,
                    error.message = ErrorMessage.ERROR_TWILIO_SERVICE_NOT_FOUND(ReqBody.country_code, ReqBody.phone)
            }
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async ChangePassword(userId: number, ReqBody: ChangePasswordDTO, Response: Response) {
        try {
            if (ReqBody.new_password === ReqBody.old_password) throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, ErrorMessage.ERROR_SAME_PASSWORD, undefined);

            const user = await this.user.GetUserById(userId);

            if (!user) {
                throw GenerateError(HttpStatus.INTERNAL_SERVER_ERROR, ErrorCode.ERR_INTERNAL_SERVER, ErrorMessage.ERROR_INTERNAL_SERVER, undefined);
            }

            const validPass = await argon.verify(user.password, ReqBody.old_password);

            if (!validPass) throw this.rest.GenerateError(HttpStatus.UNAUTHORIZED, ErrorCode.ERR_UNAUTHORIZED, ErrorMessage.ERROR_INVALID_CREDENTIALS, undefined);

            const newHash = await argon.hash(ReqBody.new_password);

            user.password = newHash;
            await user.save();

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, SuccessMessage.PasswordChanged, undefined);

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }
}