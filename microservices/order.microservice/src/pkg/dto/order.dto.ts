import { IsArray, IsEnum, isEnum, IsInt, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { order_prod } from "../interfaces";


export class BaseOrderDTO {
    @IsNumber()
    @IsNotEmpty()
    orderId: number;
}

export class RateOrderDTO extends BaseOrderDTO{

    @IsInt()
    @IsNotEmpty()
    @Min(0)
    @Max(5)
    rate: number;

    @IsString()
    @IsNotEmpty()
    rate_description: string;

    @IsNotEmpty()
    productId: number;

    // @IsNotEmpty()
    // orderId: number;
}

export class GetOrderDTO {

    @IsString()
    @IsEnum(["current", "past"])
    status: string;

    @IsString()
    @IsNotEmpty()
    page: string;
    
    @IsString()
    @IsNotEmpty()
    limit: string;
}

export class CheckOutDTO {

    @IsString()
    @IsEnum(["COD", "ONLINE"])
    payment_method: string;

    @IsOptional()
    promo_discount: number;

    @IsOptional()
    delivery_charge: number;

    @IsNumber()
    sub_total: number;

    @IsNumber()
    total_amount: number;

    @IsNumber()
    @IsNotEmpty()
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

export class CancelOrderDTO extends BaseOrderDTO{
    @IsString()
    @IsNotEmpty()
    cancellation_reason: string;
}

export class ReturnOrderDTO extends BaseOrderDTO{
    @IsString()
    @IsNotEmpty()
    return_reason: string;
}


export class PostPaymentStatusDTO{
    @IsNumber()
    @IsNotEmpty()
    paymentId: number;

    @IsString()
    @IsEnum(['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'])
    status: string;
}

export class ReturnOrderedProductDTO{
    @IsNumber()
    @IsNotEmpty()
    orderProdId: number;

    @IsString()
    @IsNotEmpty()
    return_reason: string;
}


export class RejectOrderDTO extends BaseOrderDTO{
    @IsString()
    @IsNotEmpty()
    reject_reason: string;
}