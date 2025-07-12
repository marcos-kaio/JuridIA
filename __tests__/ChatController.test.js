// Simula dependências
jest.mock("../Server/models/db.js", () => ({
  Document: {
    findByPk: jest.fn(),
  },
  Chat: {
    findAll: jest.fn(),
    create: jest.fn(),
    bulkCreate: jest.fn(),
  },
}));
jest.mock("../Server/services/geminiService.js", () => ({
  chatWithGemini: jest.fn(),
}));



import { ChatController } from "../Server/controllers/ChatController.js";
import { Document, Chat } from "../Server/models/db.js";
import { chatWithGemini } from "../Server/services/geminiService.js";



describe("ChatController", () => {
  const mockRes = () => {
    const res = {};
    res.status = jest.fn(() => res);
    res.json = jest.fn(() => res);
    return res;
  };

  it("responde com erro 404 se documento não existir", async () => {
    Document.findByPk.mockResolvedValue(null);
    const req = { params: { id: "123" }, body: { question: "Oi?" } };
    const res = mockRes();

    await ChatController(req, res);

    expect(Document.findByPk).toHaveBeenCalledWith(123);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Documento não encontrado!" });
  });

  it("responde com mensagem da IA e grava histórico no banco", async () => {
    const req = {
      params: { id: "1" },
      body: { question: "Explique o começo." },
    };
    const res = mockRes();

    const mockDoc = {
      originalText: "Texto completo do documento.",
      update: jest.fn(),
    };

    const mockHistory = [
      { role: "user", content: "Oi!" },
      { role: "ai", content: "Olá!" },
    ];

    Document.findByPk.mockResolvedValue(mockDoc);
    Chat.findAll.mockResolvedValue(mockHistory);
    chatWithGemini.mockResolvedValue("Claro! O documento começa com...");

    await ChatController(req, res);

    expect(chatWithGemini).toHaveBeenCalledWith([
      {
        role: "system",
        text: expect.stringContaining("Texto completo do documento."),
      },
      { role: "user", text: "Oi!" },
      { role: "assistant", text: "Olá!" },
      { role: "user", text: "Explique o começo." },
    ]);

    expect(Chat.bulkCreate).toHaveBeenCalledWith([
      { documentId: 1, role: "user", content: "Explique o começo." },
      { documentId: 1, role: "ai", content: "Claro! O documento começa com..." },
    ]);

    expect(mockDoc.update).toHaveBeenCalledWith({ updatedAt: expect.any(Date) });
    expect(res.json).toHaveBeenCalledWith({ reply: "Claro! O documento começa com..." });
  });

  it("trata erros internos e retorna 500", async () => {
    const req = {
      params: { id: "x" },
      body: { question: "Qual o tema?" },
    };
    const res = mockRes();

    Document.findByPk.mockRejectedValue(new Error("DB fail"));

    await ChatController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro ao processar o chat." });
  });
});