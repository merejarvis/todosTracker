'use strict';
module.exports = (sequelize, DataTypes) => {
  var todo = sequelize.define('todo', {
    string: DataTypes.STRING,
    activity: DataTypes.STRING,
    location: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    recurring: DataTypes.BOOLEAN
  }, {});
  todo.associate = function(models) {
    // associations can be defined here
  };
  return todo;
};