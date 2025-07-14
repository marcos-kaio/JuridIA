import { Document, Chat } from "../models/db.js";
import { chatWithGemini } from "../services/geminiService.js";
import { buildChatMessages } from "../services/chatService.js";

export async function ChatController(req, res) {
  const docId = Number(req.params.id);
  const userMessage = req.body.question;

  try {
    const doc = await Document.findByPk(docId);
    if (!doc) return res.status(404).json({ error: "Documento não encontrado!" });

    const history = await Chat.findAll({
      where: { documentId: docId },
      order: [["dateTime", "ASC"]],
    });

    const messages = buildChatMessages(doc, history, userMessage);
    const aiReply = await chatWithGemini(messages);

    await Chat.bulkCreate([
      { documentId: docId, role: "user", content: userMessage },
      { documentId: docId, role: "ai", content: aiReply },
    ]);

    await doc.update({ updatedAt: new Date() });

    res.json({ reply: aiReply });
  } catch (error) {
    console.error("Erro no ChatController:", error);
    res.status(500).json({ error: "Erro ao processar o chat." });
  }
}