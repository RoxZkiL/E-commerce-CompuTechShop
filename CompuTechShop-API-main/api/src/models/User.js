const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      given_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      family_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      picture: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
      },
      is_admin_pro: {
        type: DataTypes.BOOLEAN,
      },
      password: {
        type: DataTypes.STRING,
      },
      is_banned: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false /* le saca el createAt y Updateat*/,
      freezeTableName: true,
    }
  );
};
