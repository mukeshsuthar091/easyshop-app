import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UID {

    @IsNotEmpty()
    uid: number;
}

export class AID {

    @IsNotEmpty()
    aid: number;
}

export class StoreAddressDTO {
    
    @IsNotEmpty()
    address: string;

    @IsEnum(['Home', 'Office', 'Other'])
    address_type: string;

    @IsNotEmpty()
    @IsNumber()
    latitude: number;

    @IsNotEmpty()
    @IsNumber()
    longitude: number;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    country: string;
}

export class UpdateAddressDTO {
    
    @IsOptional()
    address: string;

    @IsOptional()
    @IsEnum(['Home', 'Office', 'Other'])
    address_type: string;

    @IsOptional()
    latitude: number;

    @IsOptional()
    longitude: number;

    @IsOptional()
    city: string;

    @IsOptional()
    state: string;

    @IsOptional()
    country: string;
}