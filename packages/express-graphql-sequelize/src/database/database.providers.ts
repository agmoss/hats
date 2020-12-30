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
                    idle: 30000,
                    evict: 30000,
                },
                host: process.env.DB_HOST,
                port: (process.env.DB_PORT as unknown) as number,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                native: false,
                logging: false,
                ssl: true,
            });
            sequelize.addModels([CatEntity]);
            await sequelize.sync();
            return sequelize;
        },
    },
];