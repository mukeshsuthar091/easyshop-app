import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator";

export class UpdateUserDTO {

    @IsOptional()
    first_name: number;

    @IsOptional()
    last_name: number;

    @IsOptional()
    email: string;

    @IsOptional()
    password: string;

    @IsOptional()
    country_code: string;

    @IsOptional()
    phone: string | number;

    @IsOptional()
    image: string

    @IsOptional()
    business_name: string;

    @IsOptional()
    category: string;

    @IsOptional()
    sub_category: string;
    
    @IsOptional()
    city: string;

    @IsOptional()
    state: string;

    @IsOptional()
    country: string;

    @IsOptional()
    address: string;

    @IsOptional()
    aadhaar_no: string;

    @IsOptional()
    business_logo: string

    @IsOptional()
    aadhaar_image: string
}