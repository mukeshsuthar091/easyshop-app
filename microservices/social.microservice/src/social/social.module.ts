import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { NotificationService } from "src/core/notifications/notification.service";

import { ResponseHandler } from "src/pkg/common";
import { PostHelper } from "src/pkg/helper";
import { SocialController } from "./social.controller";
import { SocialService } from "./social.service";

@Module({
    imports: [
        JwtModule.register({}),
    ],
    controllers: [SocialController],
    providers: [SocialService, ResponseHandler, PostHelper, NotificationService],
})

export class SocialModule { }