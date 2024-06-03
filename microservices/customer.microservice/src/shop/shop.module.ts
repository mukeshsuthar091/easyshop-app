import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { ResponseHandler } from "src/pkg/common";
import { BannerHelper, CouponHandler, FavouriteHelper, FilterHelper, ProductHelper } from "src/pkg/helper";
import { OrderService } from "./order.service";
import { ShopController } from "./shop.controller";
import { FilterService } from "./shop.filter.service";
import { ShopService } from "./shop.service";
import { CartHelper } from "src/pkg/helper/cart.helper";

@Module({
    imports: [
        JwtModule.register({}),
    ],
    controllers: [ShopController],
    providers: [ShopService, FilterService, ResponseHandler, BannerHelper, ProductHelper, CouponHandler, FilterHelper, FavouriteHelper, OrderService, CartHelper],
})

export class ShopModule { }