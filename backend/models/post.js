'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'ownerId', as:'user'})
    }

    toJSON( ) {
      return  { ...this.get(), id: undefined, ownerId: undefined}
    }
  }

  Post.init({
    
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },

    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

  },

  {
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
  });
  return Post;
};