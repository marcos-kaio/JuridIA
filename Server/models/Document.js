import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "Document",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      originalUrl: {
        type: DataTypes.BLOB("long"),
        field: "original_url",
      },
      simplifiedUrl: {
        type: DataTypes.BLOB("long"),
        field: "simplified_url",
      },
      originalText: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
        field: "original_text",
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "title",
      },
      comparisonData: {
        type: DataTypes.JSON,
        allowNull: true,
        field: "comparison_data"
      },
      status: {
        type: DataTypes.STRING(10),
        field: "status",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {
      tableName: "document",
      timestamps: true,
      underscored: true,
    }
  );