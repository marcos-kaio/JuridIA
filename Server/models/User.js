import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "username",
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        field: "user_email",
        validate: {
          isEmail: true,
        },
      },
      birthday: {
        type: DataTypes.DATEONLY,
        field: "birthday",
      },
      escolaridade: {
        type: DataTypes.STRING(255),
        field: "escolaridade",
      },
      password: {
        type: DataTypes.STRING(255),
        field: "password",
      },

    },
    {
      tableName: "users",
      timestamps: true,  
      underscored: true,
    }
  );