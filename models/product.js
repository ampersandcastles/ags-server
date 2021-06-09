module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("product", {
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
  
      photURL: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
    return Product;
  };