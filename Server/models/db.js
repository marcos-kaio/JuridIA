import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import defineUser from "./User.js";
import defineDocument from "./Document.js";
import defineChat from "./Chat.js";

dotenv.config();

// Usa as variáveis de ambiente separadas, que serão configuradas na Render.
// O 'dialectOptions' é crucial para a conexão segura com a PlanetScale.
export const sequelize = new Sequelize(
  process.env.DB_DATABASE || "juridiaTest",       // Nome do banco de dados
  process.env.DB_USERNAME || "root",              // Usuário
  process.env.DB_PASSWORD || "",                  // Senha
  {
    host: process.env.DB_HOST || "localhost",     // Host do banco de dados
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        // PlanetScale não requer a rejeição de certificados não autorizados
        rejectUnauthorized: false
      }
    }
  }
);


// O restante do arquivo permanece igual
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