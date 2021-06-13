require ('dotenv').config();

const {Sequelize} = require('sequelize');
const db = new Sequelize(process.env.DB_CONNECTION_STRING);

<<<<<<< HEAD
module.exports = db;
=======
module.exports = db;
>>>>>>> cd305f7 (testing edits)
