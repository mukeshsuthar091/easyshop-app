import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsArray } from "class-validator";
import { order_prod } from "../interfaces";

export class CheckOutDTO {

    @IsString()
    @IsEnum(["COD", "ONLINE"])
    @IsNotEmpty()
    payment_method: string;

    @IsOptional()
    promo_discount: number;

    @IsOptional()
    delivery_charge: number;

    @IsNumber()
    @IsNotEmpty()
    sub_total: number;

    @IsNumber()
    @IsNotEmpty()
    total_amount: number;

    @IsNumber()
    // @IsNotEmpty()
    @IsOptional()
    couponId: number;

    @IsNumber()
    @IsNotEmpty()
    addressId: number;

    @IsNumber()
    @IsNotEmpty()
    b_userId: number;

    @IsArray()
    @IsNotEmpty()
    order_items: Array<order_prod>;
}