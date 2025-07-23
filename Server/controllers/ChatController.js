import { Document, Chat } from "../models/db.js";
import { chatWithGemini } from "../services/geminiService.js";
import { buildSystemInstruction, formatChatHistory } from "../services/chatService.js";

export async function ChatController(req, res) {
  const docId = Number(req.params.id);
  const userMessage = req.body.question;

  try {
    const doc = await Document.findByPk(docId);
    if (!doc) return res.status(404).json({ error: "Documento não encontrado!" });
    
    // 1. Pega o histórico do banco de dados
    const historyFromDb = await Chat.findAll({
      where: { documentId: docId },
      order: [["dateTime", "ASC"]],
    });
    
    // 2. Cria a instrução do sistema e formata o histórico separadamente
    const systemInstruction = buildSystemInstruction(doc);
    const formattedHistory = formatChatHistory(historyFromDb);

    // 3. Chama a IA com os parâmetros corretos
    const aiReply = await chatWithGemini(formattedHistory, systemInstruction, userMessage);

    // Salva a nova pergunta e a resposta no banco
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