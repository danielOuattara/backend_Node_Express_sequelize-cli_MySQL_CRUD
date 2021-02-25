'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post}) {
      // define association here
      this.hasMany(Post, {foreignKey: 'ownerId', as: 'posts'})
    }

    toJSON( ) {
      return  { ...this.get(), id: undefined}
    }
  }


  User.init({

    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {msg: "Nema cannot be empty"},
        notNull: {msg: "Name cannot be null"},
      }
    },

    email:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {msg: "Nema cannot be empty"},
        notNull: {msg: "Name cannot be null"},
        isEmail: {msg: "Valid Email is required"}
      }
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};