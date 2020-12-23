import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CatsModule } from './cats/cats.module';


@Module({
  imports: [
    CatsModule,
    GraphQLModule.forRoot({
      path: "/api",
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
      debug: true,
      playground: true,
      typePaths: ['./**/*.graphql'],
      useGlobalPrefix: true,
    }),
  ],
})
export class AppModule {}
