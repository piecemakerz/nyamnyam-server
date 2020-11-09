'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class production_quantity extends Model {
    static associate(models) {
      this.belongsTo(models.weather, {
        foreignKey: 'weatherId',
      }); //1:1
      // this.belongsTo(models.store_production, {
      //   foreignKey: 'store_productionId', //1:N 한 스토어에 여러 production_quantity
      // });
      this.belongsTo(models.store, {
        foreignKey: 'storeId', //1:N 한 스토어에 여러 production_quantity
      });
      this.belongsTo(models.production, {
        foreignKey: 'productionId', //1:N 한 제품에 여러 production_quantity
      });
    }
  }
  production_quantity.init(
    {
      //store_productionId: DataTypes.INTEGER,
      storeId: DataTypes.INTEGER,
      productionId: DataTypes.INTEGER,
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weatherId: DataTypes.INTEGER,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'production_quantity',
    }
  );
  return production_quantity;
};

