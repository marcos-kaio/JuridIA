import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import defineUser from "./User.js";
import defineDocument from "./Document.js";
import defineChat from "./Chat.js";

dotenv.config();

export const sequelize = new Sequelize(
  "juridiaTest", // nome do banco de dados
  process.env.DB_USERNAME || "root", // nome do usuário do mysql
  process.env.DB_PASSWORD || "", // senha do banco de dados mysql
  {
    host: "localhost",
    dialect: "mysql",
  }
);

// teste de autenticação
sequelize
  .authenticate()
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");
  })
  .catch((error) => {
    console.log("Erro ao se conectar com o banco de dados: ", error);
  });

// exportando tabelas definidas no sequelize
export const User = defineUser(sequelize);
export const Document = defineDocument(sequelize);
export const Chat = defineChat(sequelize);

// definindo associações
User.hasMany(Document, { foreingKey: "user_id" });
Document.belongsTo(User, { foreingKey: "user_id" });

Document.hasMany(Chat, { foreingKey: "document_id" });
Chat.belongsTo(Document, { foreingKey: "document_id" });
