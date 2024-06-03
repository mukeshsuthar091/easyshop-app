import { Body, Controller, Get, Post, Put, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

import { UserClaims } from "src/core/decorator";
import { BaseOrderDTO, CancelOrderDTO, GetOrderDTO, PostPaymentStatusDTO, RateOrderDTO, RejectOrderDTO, ReturnOrderDTO, ReturnOrderedProductDTO } from "src/pkg/dto";

import { claims } from "src/pkg/interfaces";
import { OrderService } from "./order.service";

@Controller('order')
@ApiTags('Order Module')
@ApiBearerAuth('access-token')

export class OrderController {
    constructor(
        private orderService: OrderService,
    ) { }

    @Post('/rate-order')
    RateOrder(
        @Body() ReqBody: RateOrderDTO,
        @Res() Response: Response
    ) {
        return this.orderService.RateOrder(ReqBody, Response);
    }

    @Get('/get-orders')
    GetOrders(
        @UserClaims() claims: claims,
        @Query() ReqQue: GetOrderDTO,
        @Res() Response: Response
    ) {
        return this.orderService.GetOrders(ReqQue, claims.userId, claims.role, Response);
    }


    @Put('/cancel-order')
    CancelOrder(
        @Body() ReqBody: CancelOrderDTO,
        @Res() Response: Response
    ){
        return this.orderService.CancelOrder(ReqBody, Response);
    }


    @Put('/post-payment-status')
    PostPaymentStatus(
        @Body() ReqBody: PostPaymentStatusDTO,
        @Res() Response: Response
    ){
        return this.orderService.PostPaymentStatus(ReqBody, Response);
    }

    @Post('/return-order')
    ReturnRequest(
        @Body() ReqBody: ReturnOrderDTO,
        @Res() Response: Response
    )
    {
       return this.orderService.ReturnRequest(ReqBody, Response);
    }

    @Post('/refund-payment')
    Refund(
        @Body() ReqBody: BaseOrderDTO,
        @Res() Response: Response
    ){
        return this.orderService.Refund(ReqBody, Response);
    }

    @Post('/return-ordered-product')
    ReturnOrderedProduct(
        @Body() ReqBody: ReturnOrderedProductDTO,
        @Res() Response: Response
    ){
        return this.orderService.ReturnOrderedProduct(ReqBody, Response);
    }


    @Post('/accept-order')
    AcceptOrder(
        @Body() ReqBody: BaseOrderDTO,
        @Res() Response: Response
    )
    {
       return this.orderService.AcceptOrder(ReqBody, Response);
    }


    @Post('/reject-order')
    RejectOrder(
        @Body() ReqBody: RejectOrderDTO,
        @Res() Response: Response
    )
    {
       return this.orderService.RejectOrder(ReqBody, Response);
    }
    
}