const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "wishlist",
    {
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