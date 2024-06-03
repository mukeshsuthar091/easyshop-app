import { IsOptional, IsString } from "class-validator";

export class UploadImageDTO {
    @IsOptional()
    @IsString()
    image?: string;
}