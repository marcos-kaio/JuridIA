import { Document, Chat } from "../models/db.js";
import { chatWithGemini } from "../services/geminiService.js";
import { buildChatMessages } from "../services/chatService.js";


export async function ChatController(req, res) {
  const docId = Number(req.params.id);
  const userMessage = req.body.question;

  try {
    // Verifica se o ID do documento é válido
    const doc = await Document.findByPk(docId);

    // Impede que o usuário envie uma mensagem sem um documento
    if (!doc) return res.status(404).json({ error: "Documento não encontrado!" });
    
     // coletando histórico de mensagens do chat
    const history = await Chat.findAll({
      where: { documentId: docId },
      order: [["dateTime", "ASC"]],
    });
    
    // Verifica se o usuário enviou uma mensagem
    const messages = buildChatMessages(doc, history, userMessage);
    const aiReply = await chatWithGemini(messages);

    // aloca no histórico do chat no banco de dados
    await Chat.bulkCreate([
      { documentId: docId, role: "user", content: userMessage },
      { documentId: docId, role: "ai", content: aiReply },
    ]);
    
    // Atualiza o documento com a data de atualização
    await doc.update({ updatedAt: new Date() });
    await doc.save();
    
    // Retorna a resposta da IA
    res.json({ reply: aiReply });
  } catch (error) {
    console.error("Erro no ChatController:", error);
    res.status(500).json({ error: "Erro ao processar o chat." });
  }
}