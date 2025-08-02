import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import pg from 'pg'; // Importe o pg

import defineUser from "./User.js";
import defineDocument from "./Document.js";
import defineChat from "./Chat.js";

dotenv.config();

export const sequelize = process.env.DATABASE_URL ?
  // Configuração para Produção (Render com PostgreSQL)
  new Sequelize(process.env.DATABASE_URL, {
    dialectModule: pg, // Usa o driver pg
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Necessário para a conexão na Render
      }
    }
  }) :
  // Configuração para Desenvolvimento Local (MySQL)
  new Sequelize(
    "juridiaTest",
    process.env.DB_USERNAME || "root",
    process.env.DB_PASSWORD || "",
    {
      host: "localhost",
      dialect: "mysql",
    }
  );

// O restante do arquivo permanece igual...
sequelize
  .authenticate()
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");
  })
  .catch((error) => {
    console.log("Erro ao se conectar com o banco de dados: ", error);
  });

export const User = defineUser(sequelize);
export const Document = defineDocument(sequelize);
export const Chat = defineChat(sequelize);

User.hasMany(Document, { foreignKey: "user_id" });
Document.belongsTo(User, { foreignKey: "user_id" });

Document.hasMany(Chat, { foreignKey: "document_id" });
Chat.belongsTo(Document, { foreignKey: "document_id" });