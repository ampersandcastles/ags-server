const { Sequelize } = require("sequelize/types");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    ssl: process.env.ENVRIONMENT === 'production'
})

module.exports = sequelize;