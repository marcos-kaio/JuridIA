import express from "express";
import cors from "cors";
import documentRoutes from './routes/documentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import { requireAuth } from "./middlewares/auth.js";

const app = express();
app.use(express.json());

// Configura o CORS para expor o cabeçalho personalizado
app.use(cors({
  exposedHeaders: ['X-Document-Id'],
}));

const port = 8081;

app.use('/document', requireAuth, documentRoutes);
app.use('/user', userRoutes);
app.use('/chat', requireAuth, chatRoutes);

// ordem da estrutura de envio de requisição para cadastro de usuário:
// { username, email, birthday, escolaridade, password }

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});