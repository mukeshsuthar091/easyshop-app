import * as amqp from 'amqplib';
import * as EventEmitter from "events";
import { v4 as uuid } from 'uuid';
import { HttpStatus, Injectable } from "@nestjs/common";
import { Response } from "express";

import { ResponseHandler } from "src/pkg/common"; ``
import { CheckOutDTO } from "src/pkg/dto/order.dto";
import { Order } from 'src/modules/order.entity';
import { OrderProd } from 'src/modules/order_product.entity';
import { ErrorCode, ErrorMessage } from 'src/core/constants';
import { db } from 'src/modules';
import { ProductHelper } from 'src/pkg/helper';
// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);


@Injectable()
export class OrderService {

    constructor(
        private rest: ResponseHandler,
        private product: ProductHelper
    ) { }

    async CheckOut(payload: CheckOutDTO, uid: number, Response: Response) {
        try{

            if ( (payload.promo_discount && !payload.couponId) || 
                (!payload.promo_discount && payload.couponId) ){
                throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, ErrorMessage.ERROR_VALIDATION, undefined);   
            }
            
            const order_details = {
                payment_method: payload.payment_method,
                promo_discount: payload.promo_discount,
                delivery_charge: payload.delivery_charge,
                sub_total: payload.sub_total,
                total_amount: payload.total_amount,
                couponId: payload.couponId,
                addressId: payload.addressId,
                userId: uid,
                b_userId: payload.b_userId,
            }
            console.log("payload: ", payload);

            const order = await Order.create(order_details);


            const orderItemsData = payload.order_items.map(item => ({
                quantity: item.quantity,
                productId: item.productId,
                productColorId: item.productColorId,
                productSizeId: item.productSizeId,
                orderId: order.id
            }));

            const result = await OrderProd.bulkCreate(orderItemsData);
            
            orderItemsData.forEach(async (item) => {
                const product = await this.product.GetProductById(item.productId);
                product.order_count += 1;
                product.save();
            })
            

            //----------- payment is pending -------------

            return this.rest.SuccessJSONResponse(Response, HttpStatus.CREATED, "Order created successfully.", undefined);
        }catch(error){
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

}