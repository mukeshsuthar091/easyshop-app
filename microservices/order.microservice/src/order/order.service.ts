import { HttpStatus, Injectable } from "@nestjs/common";
import { Response, response } from "express";

import { ResponseHandler } from "src/pkg/common";
import { ErrorCode, ErrorMessage, SuccessMessage } from "src/core/constants";
import { BaseOrderDTO, CancelOrderDTO, CheckOutDTO, GetOrderDTO, PostPaymentStatusDTO, RateOrderDTO, RejectOrderDTO, ReturnOrderDTO, ReturnOrderedProductDTO } from "src/pkg/dto";
import { OrderHelper, ProductHelper } from "src/pkg/helper";
import { Payment } from "src/modules/payment.entity";
import { Order } from "src/modules/order.entity";
import { OrderProd } from "src/modules/order_product.entity";
import { Product } from "src/modules/product.entity";
import Stripe from "stripe";
import { Coupon } from "src/modules/coupon.entity";
import { ProdSize } from "src/modules/product_size.entity";
import { ProdColor } from "src/modules/product_color.entity";
import { ProdSpec } from "src/modules/product_spec.entity";
import { db } from "src/modules";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

@Injectable()
export class OrderService {

    constructor(
        private rest: ResponseHandler,
        private order: OrderHelper,
        private product: ProductHelper,
    ) { }

    async RateOrder(payload: RateOrderDTO, Response: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const order_prod = await this.order.GetOrderProduct(payload.orderId, payload.productId);
            if (!order_prod) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, ErrorMessage.ERROR_NO_ORDER, undefined);

            const product = await this.product.GetProductById(payload.productId);
            if (!product) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, ErrorMessage.ERROR_NO_PRODUCT, undefined);

            order_prod.rate = payload.rate;
            order_prod.rate_description = payload.rate_description;

            const avg_rate = (payload.rate + (product.rate_avg * product.rate_count)) / (product.rate_count + 1);

            product.rate_avg = parseFloat(avg_rate.toFixed(2));
            product.rate_count += 1;

            await order_prod.save();
            await product.save();

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, SuccessMessage.POST_RATE_SUCCEED, order_prod);

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async GetOrders(ReqQue: GetOrderDTO, uid: number, role: number, Response: Response): Promise<Response<any, Record<string, any>>> {
        try {
            let {status} = ReqQue;
            let orders: any;

            switch (status) {
                case "current": {
                    orders = await this.order.GetOrderByStatus(ReqQue, uid, role);
                    break;
                }
                case "past": {
                    orders = await this.order.GetOrderByStatus(ReqQue, uid, role);
                    break;
                }
                default: {
                    throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, "status value must be either current or past!", undefined);
                }
            }

            if (orders.orders.length <= 0) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, "Orders not found!", undefined);

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Get order succeed.", orders);
        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }


    async PostPaymentStatus(payload: PostPaymentStatusDTO, Response: Response){
        try {
            
            // const payment = await Payment
            const payment   = await Payment.findOne(
                {
                    where   : { id : payload.paymentId },
                    attributes  : [ 'id', 'status', 'orderId' ]
                }
            );
            // console.log(payment)
            
            if (!payment) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, ErrorMessage.ERROR_NO_PRODUCT, undefined);

            /*---------------------------------START_SUCCESS_PAYMENT---------------------------------*/
            if(payload.status === 'SUCCESS'){
                const order = await Order.findOne(
                    {
                        where   : { id : payment.orderId },
                        attributes  : [ 'id', 'status'],
                        include : {
                            model  : OrderProd,
                            as : "order_products",
                            attributes  : [ 'quantity', 'productId', 'status' ]
                        }
                    }
                );

                if (!order) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, ErrorMessage.ERROR_NO_PRODUCT, undefined);

                const prods = await OrderProd.findAll(
                    {
                        where   : { orderId : order.id},
                        attributes  : ['id', 'quantity', 'productId', 'status' ]
                    }
                );

                for(let i = 0; i < prods.length; i++){
                    const product   = await Product.findOne(
                        {
                            where   : { id : prods[i].productId },
                            attributes  : [ 'id', 'order_count' ]
                        }
                    );

                    // console.log(product);
                    if (!product) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, ErrorMessage.ERROR_NO_PRODUCT, undefined);

                    // prods[i].status = 'ORDERED';
                    // await product.save();

                    product.order_count += prods[i].quantity;
                    await prods[i].save();
                }

                payment.status  = 'SUCCESS';
                order.status    = 'ORDERED';

                await payment.save();
                await order.save();

                return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Update order and payment status succeed.", undefined);

            }

            /*---------------------------------END_SUCCESS_PAYMENT---------------------------------*/

            else if ( payload.status === 'FAILED') {

                payment.status  = 'FAILED';

                await payment.save();

                return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Update order and payment status succeed.", undefined);
                
            }
            else{
                throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, "Please ensure that payment status is supplied correctly!", undefined);
            }


        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }


    async CancelOrder(payload: CancelOrderDTO, Response: Response): Promise<Response<any, Record<string, any>>>{
        try {
            const order = await this.order.GetOrderWithPaymentDetails(payload.orderId);
            // console.log("order:", order)

            if(!order) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, ErrorMessage.ERROR_NO_ORDER, undefined);

            if( order.cancellation_reason ) throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, 'Order is already cancelled!', undefined);

            order.status = 'CANCELLED';
            order.cancellation_reason = payload.cancellation_reason;

            await order.save();

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Cancel order succeed.", order);

        }catch(error){
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }


    async ReturnRequest(payload: ReturnOrderDTO, Response: Response){
        try {
            const order = await Order.findOne(
                {
                    where : { id : payload.orderId },
                    attributes  : [ 'id', 'status', 'return_reason', 'updatedAt' ]
                }
            );
            
            if(!order) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, ErrorMessage.ERROR_NO_ORDER, undefined);

            if ( order.status !== 'DELIVERED' ){
                throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, 'Order return operation not applicable!', undefined);   
            }

            order.status    = 'RETURN_REQUESTED' ;
            order.return_reason = payload.return_reason ;

            await order.save();

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Order return request succeed!", order);

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error); 
        }
    }

    async Refund(payload: BaseOrderDTO, Response: Response){
        try {
            
            const order = await Order.findOne(
                {
                    where  : { id : payload.orderId },
                    attributes  : [ 'id', 'status', 'return_reason', 'reject_reason' ]
                }
            );

            if (!order) {
                throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, 'Order not found!', undefined);   
            };

            if ( order.status !== 'REJECTED' && order.status !== 'RETURN_REQUESTED'){
                throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, 'Order refund operation not applicable!', undefined);   
            }
            
            const payment  = await Payment.findOne(
                {
                    where   : { orderId : order.id },
                    attributes  : [
                        'id',
                        'transaction_id',
                        'paymentIntent',
                        'client_secret',
                        'ephemeral_key',
                        'customer_id',
                        'refund_id',
                        'refund_amount',
                        'balance_transaction',
                        'charge',
                        'amount',
                        'status',
                        'createdAt',
                        'updatedAt'
                    ]
                }
            );

            let refund;
            try {
                refund    = await stripe.refunds.create(
                    {
                        payment_intent  : payment.paymentIntent,
                    }
                );
            } 
            catch (error) {
                throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, 'Payment refund failed', error);   
            }

            if ( refund.status  !== 'succeeded' ) {
                throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, 'Payment refund failed', refund);   
            }

            payment.status  = 'REFUNDED' ;
            payment.refund_id   = refund.id ;
            payment.refund_amount   = refund.amount / 100 ;
            payment.balance_transaction = refund.balance_transaction;
            payment.charge  = refund.charge ;
            order.status    = 'RETURNED';

            await payment.save();
            await order.save();

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Payment refund succeed!", payment);

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error); 
        }
    }

    async ReturnOrderedProduct(payload: ReturnOrderedProductDTO, Response: Response){
        try {

            const order_product: any = await db.OrderProd.findOne(
                {
                    where   : { id : payload.orderProdId },
                    attributes  : [ 'id', 'quantity', 'rate', 'rate_description', 'status', 'refund_amount','return_reason', 'orderId', 'productId', 'productSpecificationId', 'productColorId', 'productSizeId', 'createdAt', 'updatedAt' ],
                    include : [{
                        model   : db.Order,
                        attributes  : [ 'id', 'payment_method', 'promo_discount', 'delivery_charge', 'sub_total', 'total_amount', 'status', 'cancellation_reason', 'refund_amount','return_reason', 'couponId', 'createdAt', 'updatedAt' ],
                        include : [{
                            model  : db.Coupon,
                            attributes  : [ 'id', 'code', 'title', 'description', 'expiry', 'is_percentage', 'value', 'min_order_value', 'max_discount', 'applicable', 'createdAt', 'updatedAt' ],
                        }]
                    }]
                }
            );

            if(!order_product) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, ErrorMessage.ERROR_NO_ORDER_PRODUCT, undefined);

            if (order_product.status === 'RETURN_REQUESTED' || order_product.status === 'RETURNED') {
                throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, 'Product may be returned or return_requested!', undefined);
            }


            const product: any  = await Product.findOne(
                    {
                        where   : { id : order_product.productId },
                        attributes  : [ 'id', 'name', 'description', 'additional_info', 'additional_details', 'order_count', 'rate_avg', 'rate_count', 'categoryId', 'subCategoryId', 'createdAt', 'updatedAt' ],
                        include : [
                            {
                                model   : ProdSize,
                                where   : { id : order_product.productSizeId },
                                attributes  : [ 'id', 'size', 'price', 'createdAt', 'updatedAt' ]
                            },
                            {
                                model   : ProdColor,
                                where   : { id : order_product.productColorId },
                                attributes  : [ 'id', 'color', 'createdAt', 'updatedAt' ]
                            },
                            {
                                model   : ProdSpec,
                                where   : { id : order_product.productSpecificationId },
                                attributes  : [ 'id', 'title', 'value', 'createdAt', 'updatedAt' ]
                            }
                        ]
                    }
                );

            let refund_amount;

            // console.log(order_product.Order.Coupon)
            /*---------------------------------START_NO_PROMO_CODE---------------------------------*/
            
            if ( !order_product.Order.Coupon ){
                
                refund_amount   =  order_product.quantity * product.ProdSizes[0].price;
                                  
            }

            /*----------------------------------END_NO_PROMO_CODE----------------------------------*/
            
            
            /*----------------------------------START_PROMO_CODE----------------------------------*/

            if ( order_product.Order.Coupon.is_percentage == 1 ){
                const coupon = order_product.Order.Coupon;

                const value = coupon.value;

                const new_sub_total = order_product.Order.sub_total - (order_product.quantity * product.ProdSizes[0].price)

                const discount: number  = ( new_sub_total * value ) / 100;

                let promo_discount = 0 ;
                
                if( new_sub_total >= coupon.min_order_value) {
                    if ( discount   > coupon.max_discount ) {
                        promo_discount  = coupon.max_discount
                    } 
                    else {
                        promo_discount  = discount
                    }
                }

                const new_s_total = new_sub_total - promo_discount;
                
                refund_amount  = order_product.Order.total_amount  - new_s_total - order_product.Order.delivery_charge;
                
                console.log('new_sub_total  ->', new_sub_total);
                console.log('promo          ->', promo_discount);   
                console.log('new_total      ->', new_s_total);
                console.log('old_total      ->', order_product.Order.total_amount);

                console.log('refund_amount  ->', refund_amount);
                console.log('remaining      ->', (order_product.Order.total_amount - refund_amount));

            }

            console.log(order_product.Order.Coupon.is_percentage)
            if ( order_product.Order.Coupon.is_percentage == 0 ){

                const coupon = order_product.Order.Coupon;
                console.log("", coupon)

                const value = coupon.value;

                const new_sub_total = order_product.Order.sub_total - (order_product.quantity * product.ProdSizes[0].price)

                const discount = value;

                let promo_discount = 0 ;
                
                if( new_sub_total >= coupon.min_order_value) {
                    if ( discount   > coupon.max_discount ) {
                        promo_discount  = coupon.max_discount
                    } 
                    else {
                        promo_discount  = discount
                    }
                }

                const new_s_total = new_sub_total - promo_discount;
                
                refund_amount  = order_product.Order.total_amount  - new_s_total - order_product.Order.delivery_charge;
                
                console.log('new_sub_total  ->', new_sub_total);
                console.log('promo          ->', promo_discount);   
                console.log('new_total      ->', new_s_total);
                console.log('old_total      ->', order_product.Order.total_amount);

                console.log('refund_amount  ->', refund_amount);
                console.log('remaining      ->', (order_product.Order.total_amount - refund_amount));

            }

            /*----------------------------------END_PROMO_CODE----------------------------------*/

            order_product.status    = 'RETURN_REQUESTED';
            order_product.refund_amount = refund_amount;
            order_product.return_reason = payload.return_reason;
                
            order_product.Order.status  = 'PARTIAL_RETURN_REQUESTED';
            order_product.Order.refund_amount  += refund_amount;
            order_product.Order.return_reason === null 
                ? order_product.Order.return_reason  = `Order product id ${order_product.id} is partially returned! ` 
                : order_product.Order.return_reason += `Order product id ${order_product.id} is partially returned! `
                
            await order_product.save();
            await order_product.Order.save();
            
            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Place return order_product request succeed!", { refund_amount, order_product, product })

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error); 
        }
    }


    async AcceptOrder(payload: BaseOrderDTO, Response: Response){
        try {
            const order = await this.order.GetOrderWithPaymentDetails(payload.orderId);
            // console.log("order:", order)

            if(!order) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, ErrorMessage.ERROR_NO_ORDER, undefined);

            order.status = 'ACCEPTED';

            await order.save();

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Order accept succeed.", order);

        }catch(error){
            return this.rest.ErrorJSONResponse(Response, error);
        }
    }

    async RejectOrder(payload: RejectOrderDTO, Response: Response){
        try {
            const order = await Order.findOne(
                {
                    where : { id : payload.orderId },
                    attributes  : [ 'id', 'status', 'reject_reason', 'updatedAt' ]
                }
            );
            
            if(!order) throw this.rest.GenerateError(HttpStatus.NOT_FOUND, ErrorCode.ERR_NOT_FOUND, ErrorMessage.ERROR_NO_ORDER, undefined);

            if(order.status === "REJECTED"){
                throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, 'Order is already rejected!', undefined);   
            }

            if( order.status !== 'PENDING' && order.status !== 'RETURN_REQUESTED'){
                throw this.rest.GenerateError(HttpStatus.BAD_REQUEST, ErrorCode.ERR_BAD_REQUEST, 'Order reject operation not applicable!', undefined);   
            }

            order.status    = 'REJECTED' ;
            order.reject_reason = payload.reject_reason ;

            await order.save();

            return this.rest.SuccessJSONResponse(Response, HttpStatus.OK, "Order return request succeed!", order);

        } catch (error) {
            return this.rest.ErrorJSONResponse(Response, error); 
        }
    }

}
