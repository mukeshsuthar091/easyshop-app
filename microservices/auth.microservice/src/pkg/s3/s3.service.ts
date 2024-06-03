import * as fs from 'fs';
import { S3 } from 'aws-sdk'
import { v4 as uuid } from 'uuid';

export async function UploadImage(Image: Express.Multer.File) {

    const Id = uuid().split('-').join('').toUpperCase() + '_';

    const fileStream = fs.createReadStream(Image.path)
    const s3 = new S3({
        region: process.env.AWS_BUCKET_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    })
    const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Body: fileStream,
        Key: 'AWS_' + Id + Image.originalname
    }
    return await s3.upload(uploadParams).promise()
}