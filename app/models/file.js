'use strict';
module.exports = (sequelize, DataTypes) => {
  const file = sequelize.define('file', {
    filename: DataTypes.STRING,
    path: DataTypes.STRING,
    filesize: DataTypes.INTEGER
  }, {});
  file.associate = function(models) {
    // associations can be defined here
  };
  return file;
};