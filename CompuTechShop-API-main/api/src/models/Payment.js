const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "payment",
    {
      idTogether:{
        type: DataTypes.FLOAT,
      },
      idMatch: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      picture: {
        type: DataTypes.TEXT,
      },
      date: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      quantity: {
        type: DataTypes.FLOAT,
      },
      total_paid_amount: {
        type: DataTypes.FLOAT,
      },
      status: {
        type: DataTypes.STRING,
      },
      status_detail: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      userEmail: {
        type: DataTypes.STRING,
      },
      extraEmail:{
        type: DataTypes.STRING,
      },
      extraAddress:{
        type: DataTypes.STRING,
      }
    },
    

    {
      timestamps: false /* le saca el createAt y Updateat*/,
      freezeTableName: true,
    }
  );
};
