const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "reviews",
    {
      comment: {
        type: DataTypes.TEXT,
      },
      calification: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false /* le saca el createAt y Updateat*/,
      freezeTableName: true,
    }
  );
};