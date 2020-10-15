'use strict';
const { Model } = require('sequelize');
const crypto = require('crypto');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.store) //1:N
    }
  };
  user.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: DataTypes.STRING,
      nickname: DataTypes.STRING,
      userImg: DataTypes.STRING,
      token: DataTypes.STRING,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
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
        beforeFind: (data) => {
          if (data.where !== undefined && data.where.password) {
            let secret = process.env.USER_HOOK_SECRET;
            let hash = crypto
              .createHmac('sha256', secret)
              .update(String(data.where.password))
              .digest('hex');
            data.where.password = hash;
          }
        }
      },
    sequelize,
    timestamps: true,
    modelName: 'user',
  });
  return user;
};