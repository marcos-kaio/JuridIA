import { Document, Chat } from "../models/db.js";
import { chatWithGemini } from "../services/geminiService.js";

export async function ChatController(req, res) {
  const docId = Number(req.params.id);
  const userMessage = req.body.question;

  const doc = await Document.findByPk(docId);
  if (!doc) return res.status(404).json({ error: "Documento não encontrado!" });

  // coletando histórico de mensagens do chat
  const history = await Chat.findAll({
    where: { documentId: docId },
    order: [["dateTime", "ASC"]],
  });

  // definindo as mensagens para envio ao chat
  const messages = [
    {
      role: "system",
      text: `Este chat é sobre este documento. Seu texto original é:\n ${doc.originalText}`,
    },
    ...history.map((m) => ({
      role: m.role === "ai" ? "assistant" : "user",
      text: m.content,
    })),
    { role: "user", text: userMessage },
  ];

  // resposta da IA às mensagens
  const aiReply = await chatWithGemini(messages);

  // aloca no histórico do chat no banco de dados
  await Chat.create({ documentId: docId, role: "user", content: userMessage });
  await Chat.create({ documentId: docId, role: "ai", content: aiReply });

  res.json({reply: aiReply});
}
