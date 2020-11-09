'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class weather extends Model {
    static associate(models) {
      this.hasOne(models.production_quantity, {
        foreignKey: 'weatherId',
      }); //1:1
    }
  }
  weather.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      createdAt: false,
      updatedAt: false,
      modelName: 'weather',
    }
  );
  return weather;
};
