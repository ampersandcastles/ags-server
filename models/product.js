const {DataTypes} = require('sequelize');
const db = require('../db');


const Product = db.define("product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availability: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  price: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  adminDisplay: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false
  }, 
  photoURL: {
        type: DataTypes.STRING,
        allowNull: false
  },
});
 

module.exports = Product;
  