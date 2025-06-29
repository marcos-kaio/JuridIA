import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "Chat",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      documentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "document_id",
      },
      content: {
        type: DataTypes.TEXT("medium"),
        allowNull: false,
        field: "content",
      },
      role: {
        type: DataTypes.ENUM("user", "ai"),
        allowNull: false,
        field: "role",
      },
      dateTime: {
        type: DataTypes.DATE,
        field: "date_time",
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "chat",
      timestamps: false,
    }
  );
