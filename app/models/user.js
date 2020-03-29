'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      identifier: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {},
  );
  User.associate = function(models) {
    User.hasMany(models.UserToken);
  };
  return User;
};
