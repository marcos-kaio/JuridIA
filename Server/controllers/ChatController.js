import { Document, Chat, User } from '../models/db.js'; // Adicionado "User"
import { chatWithGemini } from '../services/geminiService.js';
import {
  buildSystemInstruction,
  formatChatHistory,
} from '../services/chatService.js';

export async function ChatController(req, res) {
  const docId = Number(req.params.id);
  const userMessage = req.body.question;

  try {
    const doc = await Document.findByPk(docId);
    if (!doc)
      return res.status(404).json({ error: 'Documento não encontrado!' });

    // 1. Busca o usuário e sua escolaridade a partir do documento
    const user = await User.findByPk(doc.userId);
    const educationLevel = user ? user.escolaridade : 'superior'; // Usa 'superior' como padrão

    // 2. Pega o histórico do banco de dados
    const historyFromDb = await Chat.findAll({
      where: { documentId: docId },
      order: [['dateTime', 'ASC']],
    });

    let historyForApi = [...historyFromDb];
    if (historyForApi.length > 0 && historyForApi[0].role === 'ai') {
      historyForApi.shift();
    }

    // 3. Cria a instrução do sistema passando a escolaridade
    const systemInstruction = buildSystemInstruction(doc, educationLevel);
    const formattedHistory = formatChatHistory(historyForApi);

    // 4. Chama a IA com a instrução de sistema personalizada
    const aiReply = await chatWithGemini(
      formattedHistory,
      systemInstruction,
      userMessage
    );

    // Salva a nova pergunta e a resposta no banco
    await Chat.bulkCreate([
      { documentId: docId, role: 'user', content: userMessage },
      { documentId: docId, role: 'ai', content: aiReply },
    ]);

    await doc.update({ updatedAt: new Date() });

    res.json({ reply: aiReply });
  } catch (error) {
    console.error('Erro no ChatController:', error);
    res.status(500).json({ error: 'Erro ao processar o chat.' });
  }
}
