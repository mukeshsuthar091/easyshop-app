import { Module } from "@nestjs/common";
import { ResponseHandler } from "src/pkg/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";


@Module({
    imports: [],
    controllers: [UploadController],
    providers: [ResponseHandler, UploadService],
})

export class UploadModule { }