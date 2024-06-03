import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class ApplyCouponDTO {

    @IsInt()
    @IsNotEmpty()
    couponId: number;

    @IsNumber()
    @IsNotEmpty()
    sub_total: number;
}