import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { DatabaseModule } from './core/database/database.module';
import { LoggerMiddleware, JwtMiddleware } from './middlewares';
import { ShopModule } from './shop/shop.module';

@Module(
    {
        imports: [
            ConfigModule.forRoot({ isGlobal: true }),
            ShopModule,
            DatabaseModule,
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