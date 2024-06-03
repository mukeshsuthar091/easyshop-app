import * as fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import { HttpStatus } from "@nestjs/common";
import { ErrorCode, ErrorMessage } from "src/core/constants";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function UploadImage(Image: Express.Multer.File) {

    return await cloudinary.uploader.upload(Image.path);

}


export async function DeleteImage(imageUrl) {
    try {
        const parts = imageUrl.split("/");
        const filename = parts.pop(); // get the last part of the URL which contains the public ID and format
        const publicID = filename.split(".")[0];

        if (!publicID) {
            throw this.rest.GenerateError(
                HttpStatus.BAD_REQUEST,
                ErrorCode.ERR_BAD_REQUEST,
                "Please ensure that required imageUrl is supplied correctly!",
                undefined
            );
        }

        const result = await cloudinary.api
            .delete_resources([publicID || ""], {
                type: "upload",
                resource_type: "image",
            })
            .catch((err) => {
                console.log(err);
            });

        return result;

    } catch (error) {
        return this.rest.ErrorJSONResponse(Response, error);
    }
}
