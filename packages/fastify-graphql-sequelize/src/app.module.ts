import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { CatsModule } from "./cats/cats.module";
import { DatabaseModule } from './database/database.module';
import { join } from 'path';

@Module({
    imports: [
        GraphQLModule.forRoot({
            debug: false,
            playground: false,
            typePaths: ["./**/*.graphql"],
        }),
        DatabaseModule,
        CatsModule,
    ],
})
export class AppModule {}
