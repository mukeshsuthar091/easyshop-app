import * as fs from 'fs';
import { v2 as cloudinary } from 'cloudinary'
import { v4 as uuid } from 'uuid';

export async function UploadImage(Image: Express.Multer.File) {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    return await cloudinary.uploader.upload(Image.path)
}