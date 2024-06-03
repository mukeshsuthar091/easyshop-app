import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class TokenDTO {

    @IsString()
    access_token: string;

    @IsString()
    token_type: string;

    @IsString()
    status: string;

    @IsString()
    expiry: any;

    @IsInt()
    access_count: number;

    @IsString()
    device_token: string;

    @IsInt()
    device_type: number;

    @IsNotEmpty()
    userId: string | number;
}

export class RefreshTokenDTO {
    
    @IsString()
    @IsNotEmpty()
    refresh_token: string;
}