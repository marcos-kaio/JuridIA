import express from 'express';
import multer from "multer";
import AIControler from "../controllers/AIController.js";
import { Document } from "../models/db.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/simplify", upload.single("file"), AIControler);

// Rota atualizada para retornar os dados de comparação em JSON
router.get("/text/:id", async (req, res) => {
    try {
        const docId = Number(req.params.id);
        const doc = await Document.findByPk(docId);

        if (!doc || !doc.comparisonData) {
            return res.status(404).json({ error: "Dados de comparação não encontrados." });
        }

        res.json(doc.comparisonData);
    } catch (error) {
        console.error("Erro ao buscar dados de comparação:", error);
        res.status(500).json({ error: "Erro interno ao processar a solicitação." });
    }
});


// Rota para baixar o PDF simplificado (pode ser mantida ou removida)
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