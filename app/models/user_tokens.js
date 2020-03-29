'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserToken = sequelize.define(
    'UserToken',
    {
      refreshToken: DataTypes.STRING,
    },
    {},
  );
  UserToken.associate = function(models) {
    UserToken.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };
  return UserToken;
};
