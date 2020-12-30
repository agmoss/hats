import {  Controller, Get } from '@nestjs/common';
import { CatConnection } from '../graphql.schema';
import { CatsService } from './cats.service';



@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) { }

    @Get('page')
    async findAll(): Promise<CatConnection> {
        const toReturn = await this.catsService.pages({ limit: 20, offset: 0 });
        return toReturn;
    }

}
