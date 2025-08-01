import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import defineUser from "./User.js";
import defineDocument from "./Document.js";
import defineChat from "./Chat.js";

dotenv.config();

// Verifica se uma DATABASE_URL existe (ambiente de produção da Render)
// Se não, usa as configurações locais.
export const sequelize = process.env.DATABASE_URL ?
  // Configuração para Produção (Render com PlanetScale/Aiven)
  new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    protocol: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true, // Garante que a conexão seja segura
      }
    }
  }) :
  // Configuração para Desenvolvimento Local
  new Sequelize(
    "juridiaTest",
    process.env.DB_USERNAME || "root",
    process.env.DB_PASSWORD || "",
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
User.hasMany(Document, { foreignKey: "user_id" });
Document.belongsTo(User, { foreignKey: "user_id" });

Document.hasMany(Chat, { foreignKey: "document_id" });
Chat.belongsTo(Document, { foreignKey: "document_id" });