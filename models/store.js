'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: 'userId' }); //1:N 한 유저에 여러 가게
      this.belongsToMany(models.production, {
        through: 'store_production',
        foreignKey: 'storeId',
      }); //N:M 한 스토어에 여러 상품, 한 상품이 여러 가게에
      this.hasMany(models.production_quantity, { foreignKey: 'storeId' });
    }
  }
  store.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      storeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      storeAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
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
      modelName: 'store',
    }
  );
  return store;
};
