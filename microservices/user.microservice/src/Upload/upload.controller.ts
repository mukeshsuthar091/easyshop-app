import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { Response } from "express";
import { ApiTags, ApiBearerAuth, ApiConsumes } from "@nestjs/swagger";
import * as fs from "fs";

import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { UploadService } from "./upload.service";
import { claims } from "src/pkg/interfaces";
import { UserClaims } from "src/core/decorator";
import { UploadImageDTO } from "src/pkg/dto";


@Controller('upload')
@ApiTags('Upload Module')
@ApiBearerAuth('access-token')

export class UploadController {

    constructor(private uploadService: UploadService) {}

    @Post('/upload-file')
     @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/image',
                filename: (_req, file, callback) => {
                    const fileName = file.originalname;
                    callback(null, fileName)
                },
            })
        })
    )
    @ApiConsumes('multipart/form-data')
    CreateCategory(
        @UploadedFile() Image: Express.Multer.File,
        @UserClaims() claims: claims,
        @Body() ReqBody: UploadImageDTO,
        @Res() Response: Response
    ){
        return this.uploadService.UploadFile(Image, ReqBody, Response);
    }

}
 