import { ChatController } from "../controllers/ChatController.js";
import { Chat, Document } from "../models/db.js";
import express from "express";

const router = express.Router();

// envio de pergunta como requisição para a IA
router.post("/ask/:id", ChatController);

// coleta de histórico de chat
router.get("/:id", async (req, res) => {
  try {
    const docId = Number(req.params.id);

    const chatHistory = await Chat.findAll({
      where: { document_id: docId },
      order: [["dateTime", "ASC"]],
      attributes: ["role", "content", "dateTime"],
    });

    res.json(chatHistory);
  } catch (err) {
    console.error("Erro ao buscar histórico de chat:", err);
    return res.status(500).json({ "Erro ao buscar histórico": err });
  }
});

// deletar chat e documento atrelado a ele
router.delete("/drop/:id", async (req, res) => {
  try {
    const docId = Number(req.params.id);
    // deleta histórico do chat
    await Chat.destroy({
      where: { documentId: docId },
    });
    // deleta documento
    await Document.destroy({
      where: { id: docId },
    });

    res.json({ Status: "Chat e documento deletados com sucesso!" });
  } catch (err) {
    console.error("Erro ao deletar chat: ", err);
    res.status(500).json({ "Erro ao deletar chat": err });
  }
});

export default router;
