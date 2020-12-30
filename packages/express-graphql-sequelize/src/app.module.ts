import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { CatsModule } from "./cats/cats.module";
import { DatabaseModule } from './database/database.module';
import { MemcachedCache } from 'apollo-server-cache-memcached'


const { ApolloLogExtension } = require('apollo-log');

const extensions = [() => new ApolloLogExtension()];

@Module({
    imports: [
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            context: ({ req, res }) => ({ req, res }),
            debug: true,
            playground: false,
            typePaths: ["./**/*.graphql"],
            resolverValidationOptions: {
                requireResolversForResolveType: false,
            },
            cors: true,
            introspection: false,
            bodyParserConfig: { limit: '50mb' },
            subscriptions: {
                keepAlive: 0
            },
            cacheControl: {
            	defaultMaxAge: 0,
            	stripFormattedExtensions: true,
            	calculateHttpHeaders: true
            },
            persistedQueries: {
            	cache: new MemcachedCache(
            		['memcached-server-1', 'memcached-server-2', 'memcached-server-3'],
            		{ retries: 10, retry: 10000 }
            	)
            },
        }),
        DatabaseModule,
        CatsModule,
    ],
})
export class AppModule { }
