import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { AppModule } from "./app.module";

async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}

if (!module.parent) {
    console.log("Starting bootstrap");
    try {
        bootstrap().catch((e) => {
            console.error(`Bootstrap Error => ${e}`);
        });
    } catch (e) {
        console.error(e);
    }
}
