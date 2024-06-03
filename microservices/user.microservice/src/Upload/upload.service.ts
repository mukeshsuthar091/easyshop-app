import { HttpStatus, Injectable, Req } from "@nestjs/common";
import { Response, response } from "express";
import { ResponseHandler } from "src/pkg/common";
import { ErrorCode, ErrorMessage, SuccessMessage } from "src/core/constants";
import { UploadImage } from "src/pkg/cloudinary";
import { UploadImageDTO } from "src/pkg/dto";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class UploadService {

    constructor(private rest: ResponseHandler){}

    async UploadFile (Image: Express.Multer.File, ReqBody: UploadImageDTO, Response: Response){
        try {
                     
            console.log(Image);
            
            if(!Image) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, 'No file uploaded.', undefined);
            
            if (Image) {
                const key = await UploadImage(Image);
                ReqBody.image = key.secure_url;
            }
            
            const Url = ReqBody.image;

            //remove image after upload
            fs.unlinkSync(Image.path);            
 
            return this.rest.SuccessJSONResponse(
                Response,
                HttpStatus.CREATED,
                SuccessMessage.FileUploadSucceed,
                {Url}
            );

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

} 