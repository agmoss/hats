import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Cat } from "../graphql.schema";
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
        const allCats = await this.catsRepository.findAll();
        const gqlCats: Cat[] = allCats.map((c) => {
            return {
                name: c.name,
                id: c.id,
                age: c.age,
            };
        });
        return gqlCats;
    }

    findOneById(id: number): Cat {
        const found = this.cats.find((cat) => cat.id === id);

        if (!found) {
            throw new NotFoundException("Cat not found");
        }

        return found;
    }
}
