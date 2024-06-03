import { BadRequestException, HttpStatus, Logger, ValidationError, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as amqp from 'amqplib';

import { AppModule } from "./app.module";
import { ErrorCode, ErrorMessage } from "./core/constants";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { db } from "./modules";
import { ErrorResponse } from "./pkg/common";
import { NumString } from "./pkg/interfaces";

const API_V1: string = 'api/v1';
const PORT: NumString = process.env.PORT || 8083;
const HOST: string = process.env.HOST || "localhost";

async function StartServer() {

    const app = await NestFactory.create(AppModule);
    const logger = new Logger('EasyShopServer');

    app.useGlobalPipes(
        new ValidationPipe(
            {
                whitelist: true,
                exceptionFactory: (error: ValidationError[]) => new BadRequestException(
                    ErrorResponse(
                        HttpStatus.BAD_REQUEST,
                        ErrorCode.ERR_BAD_REQUEST,
                        ErrorMessage.ERROR_VALIDATION,
                        new Date(),
                        error.map(err => err.constraints)
                    )
                ),
            }
        )
    );

    app.setGlobalPrefix(API_V1);

    // const RABBITMQ = 'amqp://guest:guest@localhost:5672';
    // const QUEUE = 'easyshop.order';

    // amqp
    //     .connect(RABBITMQ)
    //     .then(conn => {
    //         logger.log(`[ ${new Date().toISOString()} ] Server started`);
    //         return conn.createChannel();
    //     })
    //     .then(ch => {
    //         return ch.assertQueue(QUEUE, { durable: true }).then(ok => {
    //             return ch.consume(QUEUE, async (msg: any) => {

    //                 const order_payload = JSON.parse(msg.content);

    //                 logger.log(`[ ${new Date().toISOString()} ] Order received from userId: ${order_payload.uid}`);

    //                 const order = await db.Order.create({ ...order_payload, userId: order_payload.uid })

    //                 const order_response = order;

    //                 logger.log(`[ ${new Date().toISOString()} ] Order response send to userId: ${order.id}`);

    //                 ch.sendToQueue(
    //                     msg.properties.replyTo,
    //                     Buffer.from(JSON.stringify(order_response)),
    //                     {
    //                         correlationId: msg.properties.correlationId,
    //                     },
    //                 );
    //                 ch.ack(msg);

    //             });
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         process.exit();
    //     });

    const config = new DocumentBuilder()
        .setTitle('EasyShop - Order')
        .setDescription('NestJS 9.1.1')
        .setVersion('1.0')
        .addBearerAuth(
            {
                description: `[just text field] Please enter token in following format: Bearer <JWT>`,
                name: 'Authorization',
                bearerFormat: 'Bearer',
                scheme: 'Bearer',
                in: 'Header',
                type: "http"
            },
            'access-token',
        )
        .addTag('Order Module')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/docs', app, document);

    await app.listen(PORT, HOST)
        .then(result => {
            console.log(`Server running on ${result._connectionKey}`);
        })
        .catch(err => {console.error(err)});
}

StartServer();