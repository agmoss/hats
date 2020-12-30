import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CatsController } from "./cats.controller";
import { catsProviders } from "./cats.providers";
import { CatsResolvers } from "./cats.resolvers";
import { CatsService } from "./cats.service";

@Module({
    imports: [DatabaseModule],
    controllers: [CatsController],
    providers: [CatsService, CatsResolvers, ...catsProviders],
})
export class CatsModule { }
