import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';


// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { AppModule } from "./app.module";


async function bootstrap() {

    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    app.enableCors();

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(4001);
    console.log(`Application is running on: ${await app.getUrl()}`);
}


bootstrap().catch((e) => {
    console.error(`Bootstrap Error => ${e}`);
});

