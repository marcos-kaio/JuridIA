import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import AIControler from './controllers/AIController.js';

dotenv.config();

const app = express();
app.use(cors());

const port = 8081;

// armazena upload temporariamente num espaço da memória
const upload = multer({ storage: multer.memoryStorage() });

app.post('/simplify', upload.single('file'), AIControler);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
