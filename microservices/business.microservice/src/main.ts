import { BadRequestException, HttpStatus, ValidationError, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ErrorCode, ErrorMessage } from "./core/constants";
import { ErrorResponse } from "./pkg/common";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const API_V1: string = 'api/v1';
const PORT: string | number = process.env.PORT || 8086;
const HOST: string = process.env.HOST || "localhost";

async function StartServer() {

    const app = await NestFactory.create(AppModule);

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
                transformOptions: {
                    enableImplicitConversion: true, // allow conversion underneath
                },
            }
        )
    );

    app.setGlobalPrefix(API_V1);

    const config = new DocumentBuilder()
        .setTitle('EasyShop - Business')
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
        .addTag('Business Module')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/docs', app, document);

    await app.listen(PORT, HOST)
        .then(result => {
            console.log(`Server running on ${result._connectionKey}`);
        })
        .catch(err => console.error(err));
}

StartServer();