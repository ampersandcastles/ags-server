const { Sequelize } = require('sequelize/types');

require ('dotenv').config();


const sequelize = new Sequelize(proncess.env.DB_CONNECTION_STRING, {
    dialect: 'postgres'.
})

// const {Sequelize} = require('sequelize');
// const db = new Sequelize(process.env.DB_CONNECTION_STRING);

module.exports = db;