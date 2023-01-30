const { Sequelize } = require("sequelize");

const db = new Sequelize({
    // dialect: 'postgres',
    // host: 'localhost',
    // username: 'postgres',
    // password: 'juan',
    // database: 'tarea01',
    // logging: false,

    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: false,
})

module.exports = { db } 