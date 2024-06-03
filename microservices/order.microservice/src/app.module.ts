import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { DatabaseModule } from './core/database/database.module';
import { LoggerMiddleware, JwtMiddleware } from './middlewares';
import { OrderModule } from 'src/order/order.module';

@Module(
    {
        imports: [
            ConfigModule.forRoot({ isGlobal: true }),
            OrderModule,
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