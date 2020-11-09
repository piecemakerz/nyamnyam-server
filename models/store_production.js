'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store_production extends Model {
    static associate(models) {
      // this.hasMany(models.production_quantity, {
      //   foreignKey: 'store_productionId', //1:N 한 스토어에 여러 production_quantity
      // });
      this.belongsTo(models.store, {
        foreignKey: 'storeId',
      }); //store과 production 공통 테이븛
      this.belongsTo(models.production, {
        foreignKey: 'productionId',
      }); //store과 production 공통 테이븛
    }
  }
  store_production.init(
    {
      storeId: DataTypes.INTEGER,
      productionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      createdAt: false,
      updatedAt: false,
      modelName: 'store_production',
    }
  );
  return store_production;
};
