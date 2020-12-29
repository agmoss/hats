/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

var faker = require("faker");
var _ = require('lodash');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const count = 1000000;
        const cats = _.times(count, () => {
            const now = new Date();
            return {
                age: _.random(1, 20),
                name: faker.name.findName(),
                updated_at: now,
                created_at: now
            };
        });
        return await queryInterface.bulkInsert("cats", cats, {});
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete("cats", null, {});
    },
};
