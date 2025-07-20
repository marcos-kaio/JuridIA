import express from 'express';
import multer from "multer";
import AIControler from "../controllers/AIController.js";
import { Document } from "../models/db.js";

const router = express.Router();

// armazena upload temporariamente num espaço da memória
const upload = multer({ storage: multer.memoryStorage() });

// Envio de documento para simplificação - /document/simplify
router.post("/simplify", upload.single("file"), AIControler);

// Rota para baixar o PDF simplificado
router.get("/download/:id", async (req, res) => {
    try {
        const docId = Number(req.params.id);
        const doc = await Document.findByPk(docId);

        if (!doc || !doc.simplifiedUrl) {
            return res.status(404).json({ error: "Documento não encontrado ou ainda não processado." });
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="simplificado_${docId}.pdf"`);
        res.send(doc.simplifiedUrl);
    } catch (error) {
        console.error("Erro ao fazer o download do documento:", error);
        res.status(500).json({ error: "Erro interno ao processar o download." });
    }
});

export default router;