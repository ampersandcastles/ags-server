<<<<<<< HEAD
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("product", {
      name: {
        type: DataTypes.STRING
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
=======
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
>>>>>>> e973021718b30d31cfb7dfcbda5f08458f529804
        allowNull: false
  },
});
 

module.exports = Product;
  