import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class BannerDTO{
    @IsString()
    @IsNotEmpty()
    image?: string;

    @IsNumber()
    @IsNotEmpty()
    productId: number;
}
