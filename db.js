const sequelize =new Sequelize(process.env.DATABASE_URL, {
    dialect:'postgres',
})
new Sequelize(
    process.env.DATABASE_URL||
    `postgresql:postgres:${encodeURIComponent(process.env.PASS)}@localhost/houseofpain`,
    {
        dialect: 'postgres',
    })