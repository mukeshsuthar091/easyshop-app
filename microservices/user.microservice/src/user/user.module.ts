import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { ResponseHandler } from "src/pkg/common";
import { AddressHelper, UserHelper } from "src/pkg/helper";
import { AddressService } from "./address.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [
        JwtModule.register({}),
    ],
    controllers: [UserController],
    providers: [UserService, ResponseHandler, UserHelper, AddressService, AddressHelper],
})

export class UserModule { }