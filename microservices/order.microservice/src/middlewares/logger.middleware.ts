import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('EasyShopServer');

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, originalUrl, hostname, } = request;
        const userAgent = request.get('user-agent') || '';

        const startHrTime = process.hrtime();

        response.on('finish', () => {
            const elapsedHrTime = process.hrtime(startHrTime);
            const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
            const { statusCode } = response;
            const contentLength = response.get('content-length');

            this.logger.log(
                `{"time":"${new Date().toISOString()}","remote_ip":"${ip}","host":"${hostname}",` +
                `"method":"${method}","url":"${originalUrl}","user_agent":"${userAgent}",` +
                `"status":"${statusCode}","latency":"${elapsedTimeInMs}","content_length":"${contentLength}"}`
            );
        });

        next();
    }
}