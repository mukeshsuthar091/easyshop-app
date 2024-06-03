import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";
import { md } from './multi-dto.decorator';
import { MdType } from './md-type.enum';

export class RegisterCustomerDTO {
    @md.TypeField(MdType.CUSTOMER)
    readonly md_type: MdType.CUSTOMER;    

    @IsNotEmpty()
    @IsEnum([0, 1, 2])
    role: number; // 0 for admin, 1 for user, 2 for business

    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    country_code: string;

    @IsString()
    @IsNotEmpty()
    phone: string | number;

    @IsOptional()
    @IsString()
    image?: string;
}

export class RegisterBusinessDTO {
    @md.TypeField(MdType.BUSINESS)
    readonly md_type: MdType.BUSINESS;
    
    @IsNotEmpty()
    @IsEnum([0, 1, 2])
    role: string; // 0 for admin, 1 for user, 2 for business

    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    country_code: string;

    @IsString()
    @IsNotEmpty()
    phone: string | number;
    
    @IsString()
    @IsNotEmpty()
    business_name: string;
    
    @IsNotEmpty()
    @IsString()
    category: string;
    
    @IsNotEmpty()
    @IsString()
    sub_category: string;

    @IsString()
    @IsNotEmpty()
    city: string;
    
    @IsString()
    @IsNotEmpty()
    state: string;
    
    @IsString()
    @IsNotEmpty()
    country: string;
    
    @IsNotEmpty()
    @IsString()
    address: string;
    
    @IsNotEmpty()
    @Matches(/^\d{12}$/)
    aadhaar_no: string;
    
    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    aadhaar_image?: string;
    
    @IsOptional()
    @IsString()
    business_logo?: string;
}


export class LoginDTO {

    @IsNotEmpty()
    phone: string | number;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    device_token: string;
}

export class PhoneDTO {

    @IsNotEmpty()
    phone: string | number;
}

export class ChangePasswordDTO {

    @IsNotEmpty()
    @IsString()
    old_password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    new_password: string;
}