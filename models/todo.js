'use strict';
module.exports = (sequelize, DataTypes) => {
  var todo = sequelize.define('todo', {
    input: {
      type: DataTypes.STRING,
      validate: {
        notNull: true
       }
    },
    activity: {
      type: DataTypes.STRING,
      validate: {
        notNull: true
       }
    },
    location: {
      type: DataTypes.STRING,
      validate: {
        notNull: true
       }
    },
    date: {
      type: DataTypes.DATEONLY,
      validate: {
        notNull: true
       }
    },
    time: {
      type: DataTypes.TIME,
      validate: {
        notNull: true
       }
    },
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: true
       }
    },
  }, {});
  todo.associate = function(models) {
    models.todo.belongsTo(models.user)
  };
  return todo;
};