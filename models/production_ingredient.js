'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class production_ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.production); //1:N 여기서 fk
      this.belongsTo(models.ingredient); //1:N 여기서 fk
    }
  };
  production_ingredient.init({
    productionId: DataTypes.INTEGER,
    ingredientId: DataTypes.INTEGER
  }, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'production_ingredient',
  });
  return production_ingredient;
};