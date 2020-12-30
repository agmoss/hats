import { ParseIntPipe, UseGuards, UseInterceptors } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { TransformHeadersInterceptor } from "src/common/interceptors/headers.interceptor";
import { Cat, CatConnection, PageParams } from "../graphql.schema";
import { CatsGuard } from "./cats.guard";
import { CatsService } from "./cats.service";


const pubSub = new PubSub();

@Resolver("Cat")
export class CatsResolvers {
    constructor(private readonly catsService: CatsService) { }

    @Query()
    @UseGuards(CatsGuard)
    async getCats(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @UseInterceptors(TransformHeadersInterceptor)
    @Query()
    @UseGuards(CatsGuard)
    async pages(@Args("params") params: PageParams): Promise<CatConnection> {
        console.time('page');
        const toReturn = await this.catsService.pages(params);
        console.timeEnd('page');

        return toReturn
    }


    @Query("cat")
    async findOneById(
        @Args("id", ParseIntPipe)
        id: number
    ): Promise<Cat> {
        return this.catsService.findOneById(id);
    }

    @Mutation("createCat")
    async create(@Args("createCatInput") args: Cat): Promise<Cat> {
        const createdCat = await this.catsService.create(args);
        pubSub.publish("catCreated", { catCreated: createdCat });
        return createdCat;
    }

    @Subscription("catCreated")
    catCreated() {
        return pubSub.asyncIterator("catCreated");
    }
}
