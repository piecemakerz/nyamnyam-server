'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ingredient extends Model {
    static associate(models) {
      this.belongsToMany(models.production, {
        through: 'production_ingredient',
        foreignKey: 'ingredientId',
      }); //N:M 한 상품에 여러 재료, 한 재료가 여러 상품에
    }
  }
  ingredient.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      createdAt: false,
      updatedAt: false,
      modelName: 'ingredient',
    }
  );
  return ingredient;
};
