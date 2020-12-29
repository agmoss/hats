import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { CatsModule } from "./cats/cats.module";
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            path: "/api",
            useGlobalPrefix: true,
            installSubscriptionHandlers: true,
            context: ({ req }) => ({ req }),
            debug: false,
            playground: false,
            typePaths: ["./**/*.graphql"],
            resolverValidationOptions: {
				requireResolversForResolveType: false
            },
            introspection: false,
            bodyParserConfig: { limit: '50mb' },
        }),
        DatabaseModule,
        CatsModule,
    ],
})
export class AppModule {}
