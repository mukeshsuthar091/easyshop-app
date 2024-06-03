import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './core/database/database.module';
import { JwtMiddleware, LoggerMiddleware } from './middlewares';
import { UploadModule } from './Upload/uplaod.module';

@Module(
    {
        imports: [
            DatabaseModule,
            ConfigModule.forRoot({ isGlobal: true }),
            AuthModule,
            UploadModule,
            MulterModule.register({ dest: './uploads' })
        ],
        controllers: [],
        providers: [],
    }
)

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
        consumer.apply(JwtMiddleware).forRoutes({ path: '/auth/change-password', method: RequestMethod.POST })
    }
}