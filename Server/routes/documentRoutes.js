import express from 'express';
import multer from "multer";
import AIControler from "../controllers/AIController.js";

const router = express.Router();

// armazena upload temporariamente num espaço da memória
const upload = multer({ storage: multer.memoryStorage() });

// Envio de documento para simplificação - /document/simplify
router.post("/simplify", upload.single("file"), AIControler);

export default router;