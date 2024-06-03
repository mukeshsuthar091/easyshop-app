import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { UserClaims } from "src/core/decorator";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

import { AddFavDTO, ApplyCouponDTO, ApplyFilterDTO, CartDTO, DeleteFavDTO, GetFilterDTO, GetProdQueryDTO, SearchDTO, UpdateItemQuantityDTO} from "src/pkg/dto";
import { CheckOutDTO } from "src/pkg/dto/order.dto";
import { claims } from "src/pkg/interfaces";
import { OrderService } from "./order.service";
import { FilterService } from "./shop.filter.service";
import { ShopService } from "./shop.service";

@Controller('customer')
@ApiTags('Customer Module')
@ApiBearerAuth('access-token')

export class ShopController {
    constructor(
        private shopService: ShopService,
        private filterService: FilterService,
        private orderService: OrderService,
    ) { }

    @Get('/easyshop-customer')
    Login(
        @Res() Response: Response
    ) {
        return this.shopService.HomePage(Response);
    }

    @Get('/coupon')
    GetCoupon(
        @UserClaims() claims: claims,
        @Res() Response: Response
    ) {
        return this.shopService.GetCoupon(claims.userId, Response);
    }

    @Post('/apply-coupon')
    ApplyCoupon(
        @UserClaims() claims: claims,
        @Body() ReqBody: ApplyCouponDTO,
        @Res() Response: Response
    ) {
        return this.shopService.ApplyCoupon(claims.userId, ReqBody, Response);
    }

    @Get('/get-products')
    GetProduct(
        @Query() Query: GetProdQueryDTO,
        @Res() Response: Response
    ) {
        return this.shopService.GetProduct(Query, Response);
    }

    @Get('/search')
    GetSearch(
        @Query() Query: SearchDTO,
        @Res() Response: Response
    ) {
        return this.shopService.GetSearch(Query, Response);
    }

    @Get('/filter')
    GetFilter(
        @Query() Query: GetFilterDTO,
        @Res() Response: Response
    ) {
        return this.filterService.GetFilter(Query, Response);
    }

    @Post('/apply-filter')
    ApplyFilter(
        @Body() ReqBody: ApplyFilterDTO,
        @Res() Response: Response
    ) {
        return this.filterService.ApplyFilter(ReqBody, Response);;
    }

    @Post('/add-favourite')
    AddFav(
        @UserClaims() claims: claims,
        @Body() ReqBody: AddFavDTO,
        @Res() Response: Response
    ) {
        return this.shopService.AddFav(claims.userId, ReqBody, Response)
    }

    @Get('/favorites')
    GetFav(
        @UserClaims() claims: claims,
        @Res() Response: Response
    ) {
        return this.shopService.GetFav(claims.userId, Response)
    }

    @Delete('/favorite')
    DeteteFav(
        @UserClaims() claims: claims,
        @Query() Query: DeleteFavDTO,
        @Res() Response: Response
    ) {
        return this.shopService.DeleteFav(claims.userId, Query, Response)
    }

    @Get('/get-cartItems')
    GetCartItem(
        @UserClaims() claims: claims,
        @Res() Response: Response
    ) {
        return this.shopService.GetAllCartItems(claims.userId, Response);
    }

    @Get('/cartItem-count')
    GetCount(
        @UserClaims() claims: claims,
        @Res() Response: Response
    ) {
        return this.shopService.GetCount(claims.userId, Response);
    }
    
    @Post('/add-to-cart')
    AddToCart(
        @UserClaims() claims: claims,
        @Body() ReqBody: CartDTO,
        @Res() Response: Response
    ) {
        return this.shopService.AddToCart(ReqBody, claims.userId, Response);
    }

    @Put('/product-quantity')
    UpdateItemsQuantity(
        @UserClaims() claims: claims,
        @Body() ReqBody: UpdateItemQuantityDTO,
        @Res() Response: Response
    ) {
        return this.shopService.UpdateItemsQuantity(ReqBody, claims.userId, Response);
    }

    @Delete('/cartItem/:cartItem')
    RemoveCartItem(
        @UserClaims() claims: claims,
        @Param('cartItem') cid: number,
        @Res() Response: Response
    ){
        return this.shopService.RemoveCartItem(claims.userId, cid, Response)
    }


    @Post('/order/checkout')
    CheckOut(
        @UserClaims() claims: claims,
        @Body() ReqBody: CheckOutDTO,
        @Res() Response: Response
    ) {
        return this.orderService.CheckOut(ReqBody, claims.userId, Response);
    }
}