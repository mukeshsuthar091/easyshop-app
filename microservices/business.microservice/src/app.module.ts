import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { DatabaseModule } from './core/database/database.module';
import { JwtMiddleware, LoggerMiddleware } from './middlewares';
import { BusinessModule } from './business/business.module';
import { UploadModule } from './Upload/uplaod.module';

@Module(
    {
        imports: [
            DatabaseModule,
            ConfigModule.forRoot({ isGlobal: true }),
            BusinessModule,
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
        consumer.apply(JwtMiddleware).forRoutes('*');
    }
}