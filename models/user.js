'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
       }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: true
       }
    },
  }, {});
  user.associate = function(models) {
    models.user.hasMany(models.todo)
  };
  return user;
};