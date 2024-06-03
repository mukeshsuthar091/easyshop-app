import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class GenerateOtpDTO {

    @IsString()
    @IsNotEmpty()
    country_code: string;

    @IsNotEmpty()
    phone: string | number;
}

export class VerifyOtpDTO {

    @IsString()
    @IsNotEmpty()
    country_code: string;

    @IsNotEmpty()
    phone: string | number;

    @IsNotEmpty()
    otp: any;
}

