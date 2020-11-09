'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class production_ingredient extends Model {
    static associate(models) {
      this.belongsTo(models.production, {
        foreignKey: 'productionId',
      }); //production과 ingredient의 공통테이블
      this.belongsTo(models.ingredient, {
        foreignKey: 'ingredientId',
      }); //production과 ingredient의 공통테이블
    }
  }
  production_ingredient.init(
    {
      productionId: DataTypes.INTEGER,
      ingredientId: DataTypes.INTEGER,
    },
    {
      sequelize,
      createdAt: false,
      updatedAt: false,
      modelName: 'production_ingredient',
    }
  );
  return production_ingredient;
};
