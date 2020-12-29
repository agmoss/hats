import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { CatsModule } from "./cats/cats.module";
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            path: "/api",
            installSubscriptionHandlers: true,
            context: ({ req }) => ({ req }),
            debug: true,
            playground: true,
            typePaths: ["./**/*.graphql"],
            useGlobalPrefix: true,
        }),
        DatabaseModule,
        CatsModule,
    ],
})
export class AppModule {}
