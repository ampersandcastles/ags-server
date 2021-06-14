<<<<<<< HEAD
const sequelize =new Sequelize(process.env.DATABASE_URL, {
    dialect:'postgres',
})
new Sequelize(
    process.env.DATABASE_URL||
    `postgresql:postgres:${encodeURIComponent(process.env.PASS)}@localhost/houseofpain`,
    {
        dialect: 'postgres',
    })
=======
require ('dotenv').config();

const {Sequelize} = require('sequelize');
const db = new Sequelize(process.env.DB_CONNECTION_STRING);

module.exports = db;
>>>>>>> e973021718b30d31cfb7dfcbda5f08458f529804
