import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import * as helmet from 'helmet'
import * as rateLimit from 'express-rate-limit'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

var responseTime = require('response-time')
var StatsD = require('node-statsd')

import { AppModule } from "./app.module";
import { RATE_LIMIT_MAX } from "./environments";
import { TimeoutInterceptor } from "./common/interceptors/timeout.interceptor";

async function bootstrap() {

    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.use(compression())

    app.use(helmet())

    app.use(bodyParser.json({ limit: '50mb' }))
    
    app.use(
        bodyParser.urlencoded({
            limit: '50mb',
            extended: true,
            parameterLimit: 50000
        })
    )

    app.use(
        rateLimit({
            windowMs: 1000 * 60 * 60, // an hour
            max: RATE_LIMIT_MAX!, // limit each IP to 100 requests per windowMs
            message:
                'Too many request created from this IP, please try again after an hour'
        })
    )

    app.useGlobalInterceptors(new TimeoutInterceptor())
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(4000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}


bootstrap().catch((e) => {
    console.error(`Bootstrap Error => ${e}`);
});

