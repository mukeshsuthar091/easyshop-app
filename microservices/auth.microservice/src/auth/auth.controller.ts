import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { diskStorage } from "multer";
import { BadRequestException, Body, Controller, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";

import { LoginDTO, GenerateOtpDTO, PhoneDTO, RefreshTokenDTO, RegisterCustomerDTO, VerifyOtpDTO, ChangePasswordDTO, RegisterBusinessDTO } from "src/pkg/dto";
import { AuthService } from "./auth.service";
import { UserClaims } from "src/core/decorator";
import { claims } from "src/pkg/interfaces";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { MultiDtoValidationPipe } from "src/pkg/dto/multi-dto.validation.pipe";
import { MdType } from "src/pkg/dto/md-type.enum";

@Controller('auth')
@ApiTags('Authentication Module')

export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('register')
    Register(
        @Body(new MultiDtoValidationPipe([RegisterCustomerDTO, RegisterBusinessDTO])) 
            ReqBody: RegisterCustomerDTO | RegisterBusinessDTO,
        @Res() Response: Response
    ){
        
        if (ReqBody.md_type == MdType.CUSTOMER) {
            // console.log(Images, ReqBody as RegisterCustomerDTO)
            return this.authService.RegisterCustomer(ReqBody as RegisterCustomerDTO, Response);
        }
    
        if (ReqBody.md_type == MdType.BUSINESS) {
            // console.log(Images, ReqBody as RegisterBusinessDTO)
            return this.authService.RegisterBusiness(ReqBody as RegisterBusinessDTO, Response);
        }
      
        throw new BadRequestException('Invalid role specified');

    }

    @Post('login')
    Login(
        @Body() ReqBody: LoginDTO,
        @Res() Response: Response
    ) {
        return this.authService.Login(ReqBody, Response);
    }

    @Post('check-phone')
    CheckPhone(
        @Body() ReqBody: PhoneDTO,
        @Res() Response: Response
    ) {
        return this.authService.CheckPhone(ReqBody, Response);
    }

    @Post('refresh-token')
    RefreshToken(
        @Body() ReqBody: RefreshTokenDTO,
        @Res() Response: Response
    ) {
        return this.authService.RefreshToken(ReqBody, Response);
    }

    @Post('send-otp')
    GenerateOTP(
        @Body() ReqBody: GenerateOtpDTO,
        @Res() Response: Response
    ) {
        return this.authService.GenerateOTP(ReqBody, Response);
    }

    @Post('verify-otp')
    VerifyOTP(
        @Body() ReqBody: VerifyOtpDTO,
        @Res() Response: Response
    ) {
        return this.authService.VerifyOTP(ReqBody, Response);
    }

    @Post('change-password')
    @ApiBearerAuth('access-token')
    ChangePassword(
        @UserClaims() claims: claims,
        @Body() ReqBody: ChangePasswordDTO,
        @Res() Response: Response
    ) {
        return this.authService.ChangePassword(claims.userId, ReqBody, Response);
    }

}