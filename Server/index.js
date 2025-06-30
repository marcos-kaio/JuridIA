import express from "express";
import cors from "cors";
import documentRoutes from './routes/documentRoutes.js';
import userRoutes from './routes/userRoutes.js';
// import chatRoutes from './routes/chatRoutes.js';

const app = express();
app.use(cors());

const port = 8081;

app.use('/document', documentRoutes);
app.use('/user', userRoutes);
// app.use('/chat', chatRoutes);

// ordem da estrutura de envio de requisição para cadastro de usuário:
// { username, email, birthday, escolaridade, password }

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
