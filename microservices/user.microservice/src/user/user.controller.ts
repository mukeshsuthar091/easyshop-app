import { Body, Controller, Get, Res, Put, UseInterceptors, UploadedFile, Param, Post, Delete, UploadedFiles } from "@nestjs/common";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { ApiTags, ApiBearerAuth, ApiConsumes } from "@nestjs/swagger";
import { Response } from "express";

import { UserClaims } from "src/core/decorator";
import { claims } from "src/pkg/interfaces";
import { UserService } from "./user.service";
import { StoreAddressDTO, UpdateAddressDTO, UpdateUserDTO } from "src/pkg/dto";
import { AddressService } from "./address.service";

@Controller('user')
@ApiTags('User Module')
@ApiBearerAuth('access-token')

export class UserController {
    constructor(
        private user: UserService,
        private address: AddressService,
    ) { }

    @Get('/my-profile')
    GetMyProfile(
        @UserClaims() claims: claims,
        @Res() Response: Response,
    ): Promise<Response<any, Record<string, any>>> {
        return this.user.GetMyProfile({ uid: claims.userId, role: claims.role, Response });
    }

    
    @Put('/update-profile')
    UpdateProfile(
        @UserClaims() claims: claims,
        @Body() user: UpdateUserDTO,
        @Res() Response: Response,
    ): Promise<Response<any, Record<string, any>>> {
        return this.user.UpdateUser(claims, user, Response);
    }
    
    @Get('/all-addresses')
    GetAllAddress(
        @UserClaims() claims: claims,
        @Res() Response: Response,
    ): Promise<Response<any, Record<string, any>>> {
        return this.address.GelAll({ uid: claims.userId, Response });
    }

    @Get('/:uid/address/:aid')
    GetAddress(
        @Param('uid') uid: number,
        @Param('aid') aid: number,
        @Res() Response: Response,
    ): Promise<Response<any, Record<string, any>>> {
        return this.address.GetOne({ uid, aid, Response });
    }

    @Post('/create-address')
    StoreAddress(
        @Body() a: StoreAddressDTO,
        @UserClaims() claims: claims,
        @Res() Response: Response,
    ): Promise<Response<any, Record<string, any>>> {
        return this.address.Store({ a, uid: claims.userId, Response });
    }

    @Put('/address/:aid')
    UpdateAddress(
        @Param('aid') aid: number,
        @Body() a: UpdateAddressDTO,
        @UserClaims() claims: claims,
        @Res() Response: Response,
    ): Promise<Response<any, Record<string, any>>> {
        return this.address.Update({ a, uid: claims.userId, aid, Response });
    }

    @Delete('/address/:aid')
    DeleteAddress(
        @Param('aid') aid: number,
        @UserClaims() claims: claims,
        @Res() Response: Response,
    ): Promise<Response<any, Record<string, any>>> {
        return this.address.Delete({ uid: claims.userId, aid, Response });
    }

}