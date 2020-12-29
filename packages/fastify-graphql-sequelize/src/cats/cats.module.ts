import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { catsProviders } from "./cats.providers";
import { CatsResolvers } from "./cats.resolvers";
import { CatsService } from "./cats.service";

@Module({
    imports: [DatabaseModule],
    providers: [CatsService, CatsResolvers, ...catsProviders],
})
export class CatsModule { }
