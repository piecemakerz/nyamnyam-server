'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class production extends Model {
    static associate(models) {
      this.belongsToMany(models.store, {
        through: 'store_production',
        foreignKey: 'productionId',
      }); //N:M 한 스토어에 여러 상품, 한 상품이 여러 가게에
      this.belongsToMany(models.ingredient, {
        through: 'production_ingredient',
        foreignKey: 'productionId',
      }); //N:M 한 상품에 여러 재료, 한 재료가 여러 상품에
      this.hasMany(models.production_quantity, { foreignKey: 'productionId' });
    }
  }
  production.init(
    {
      productionName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productionImg: DataTypes.STRING,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      info: DataTypes.STRING,
      dessertType: DataTypes.INTEGER,
      type: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
    },
    {
      sequelize,
      createdAt: false,
      updatedAt: false,
      modelName: 'production',
    }
  );
  return production;
};
