const {DataTypes} = require('sequelize');
const db = require('../db');


const Product = db.define("product", {
  nameOfProduct: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availability: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull:false
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoURL: {
        type: DataTypes.STRING,
        allowNull: false
  },
});
 

module.exports = Product;
  