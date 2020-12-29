
import { Sequelize } from 'sequelize-typescript';
import { CatEntity } from '../cats/cat.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: "postgres",
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000,
                },
                host: process.env.HOST,
                port: (process.env.PORT as unknown) as number,
                username: process.env.USERNAME,
                password: process.env.PASSWORD,
                database: process.env.DATABASE,
                native: false,
                logging: false,
            });
            sequelize.addModels([CatEntity]);
            await sequelize.sync();
            return sequelize;
        },
    },
];