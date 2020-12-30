import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Sequelize } from "sequelize";
import { Cat, PageParams, CatConnection } from "../graphql.schema";
import { CatEntity } from "./cat.entity";

@Injectable()
export class CatsService {
    constructor(
        @Inject("CATS_REPOSITORY") private catsRepository: typeof CatEntity
    ) { }

    private readonly cats: Cat[] = [{ id: 1, name: "Cat", age: 5 }];

    create(cat: Cat): Cat {
        cat.id = this.cats.length + 1;
        this.cats.push(cat);
        return cat;
    }

    async findAll(): Promise<Cat[]> {
        const allCats = await this.catsRepository.findAll({
            limit: 20
        });
        const gqlCats: Cat[] = allCats.map((c) => {
            return {
                name: c.name,
                id: c.id,
                age: c.age,
            };
        });
        return gqlCats;
    }


    async pages(params: PageParams): Promise<CatConnection> {

        const page = await this.catsRepository.findAndCountAll({
            order: Sequelize.literal("id DESC"),
            limit: params.limit,
            offset: params.offset,
            logging: false
        })

        const gqlCats: Cat[] = page.rows.map((c) => {
            return {
                name: c.name,
                id: c.id,
                age: c.age,
            };
        });

        return { totalCount: page.count, cats: gqlCats };
    }

    findOneById(id: number): Cat {
        const found = this.cats.find((cat) => cat.id === id);

        if (!found) {
            throw new NotFoundException("Cat not found");
        }

        return found;
    }
}
