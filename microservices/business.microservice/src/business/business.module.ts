import { Module } from "@nestjs/common";
import { ResponseHandler } from "src/pkg/common";
import { BusinessController } from "./business.controller";
import { BusinessService } from "./business.service";
import { BannerHelper, BusinessHelper, CategoryHelper, ProductHelper, SubCategoryHelper } from "src/pkg/helper";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [
        JwtModule.register({})
    ],
    controllers: [BusinessController],
    providers: [ResponseHandler, BusinessService, BusinessHelper, BannerHelper, ProductHelper, CategoryHelper, SubCategoryHelper],
})

export class BusinessModule { }