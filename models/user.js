'use strict';
const { Model } = require('sequelize');
const crypto = require('crypto');
const dotenv = require('dotenv');
require('dotenv').config();
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      this.hasMany(models.store, { foreignKey: 'userId' }); //1:N 한 유저에 여러가게
    }
  }
  user.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: DataTypes.STRING,
      userImg: DataTypes.STRING,
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
      access_token: DataTypes.STRING,
      refresh_token: DataTypes.STRING,
      social: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (data, options) => {
          let secret = process.env.USER_HOOK_SECRET;
          let hash = crypto
            .createHmac('sha256', secret)
            .update(String(data.password))
            .digest('hex');
          data.password = hash;
        },
        beforeBulkUpdate: (data, options) => {
          let secret = process.env.USER_HOOK_SECRET;
          let hash = crypto
            .createHmac('sha256', secret)
            .update(String(data.attributes.password))
            .digest('hex');
          console.log(hash);
          data.attributes.password = hash;
        },
        beforeFind: (data) => {
          if (data.where !== undefined && data.where.password) {
            let secret = process.env.USER_HOOK_SECRET;
            let hash = crypto
              .createHmac('sha256', secret)
              .update(String(data.where.password))
              .digest('hex');
            data.where.password = hash;
          }
        },
      },
      sequelize,
      timestamps: true,
      modelName: 'user',
    }
  );
  return user;
};
