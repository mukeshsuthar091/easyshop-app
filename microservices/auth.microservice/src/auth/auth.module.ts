import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { ResponseHandler } from 'src/pkg/common';
import { TokenHelper, UserHelper } from 'src/pkg/helper';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports:[JwtModule.register({})],
    providers: [AuthService, ResponseHandler, UserHelper, TokenHelper],
    controllers: [AuthController]
})

export class AuthModule {}
