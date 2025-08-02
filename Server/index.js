import express from "express";
import cors from "cors";
import documentRoutes from './routes/documentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import { requireAuth } from "./middlewares/auth.js";

const app = express();
app.use(express.json());

// Permite que a origem das requisições seja definida por uma variável de ambiente.
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  exposedHeaders: ['X-Document-Id'],
};
app.use(cors(corsOptions));


// Usa a porta fornecida pelo ambiente de produção (Render) ou a 8081 para desenvolvimento.
const port = process.env.PORT || 8081;

app.use('/document', requireAuth, documentRoutes);
app.use('/user', userRoutes);
app.use('/chat', requireAuth, chatRoutes);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});