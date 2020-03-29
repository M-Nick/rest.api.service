'use strict';
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define(
    'File',
    {
      name: DataTypes.STRING,
      extension: DataTypes.STRING,
      size: DataTypes.INTEGER,
      MIMEtype: DataTypes.STRING,
      path: DataTypes.STRING,
    },
    {},
  );
  File.associate = function(models) {
    // associations can be defined here
  };
  return File;
};
