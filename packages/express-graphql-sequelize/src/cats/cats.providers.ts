
import { CatEntity } from './cat.entity';

export const catsProviders = [
    {
        provide: 'CATS_REPOSITORY',
        useValue: CatEntity,
    },
];