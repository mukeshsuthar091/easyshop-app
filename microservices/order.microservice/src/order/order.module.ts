import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ResponseHandler } from "src/pkg/common";
import { OrderHelper, ProductHelper } from "src/pkg/helper";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";


@Module({
    imports: [JwtModule.register({})],
    controllers: [OrderController],
    providers: [OrderService, OrderHelper, ProductHelper, ResponseHandler],
})

export class OrderModule { }