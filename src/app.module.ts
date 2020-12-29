import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { CatsModule } from "./cats/cats.module";
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            path: "/api",
            useGlobalPrefix: true,
            installSubscriptionHandlers: false,
            context: ({ req }) => ({ req }),
            debug: false,
            playground: false,
            typePaths: ["./**/*.graphql"],
        }),
        DatabaseModule,
        CatsModule,
    ],
})
export class AppModule {}
