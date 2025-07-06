// __tests__/ChatController.test.js
import { ChatController } from '../controllers/ChatController.js';
import { Document, Chat } from '../models/db.js';
import { chatWithGemini } from '../services/geminiService.js';

jest.mock('../models/db.js');
jest.mock('../services/geminiService.js');

describe('ChatController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { id: '1' },
      body: { question: 'Qual o resumo do documento?' },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // mocks padrão
    Document.findByPk.mockResolvedValue({
      id: 1,
      originalText: 'Texto original do documento',
    });

    Chat.findAll.mockResolvedValue([
      { role: 'user', content: 'Olá' },
      { role: 'ai', content: 'Oi! Como posso ajudar?' },
    ]);

    chatWithGemini.mockResolvedValue('Este é o resumo do documento.');
    Chat.create.mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve buscar documento, histórico, chamar IA e salvar as mensagens', async () => {
    await ChatController(req, res);

    // Document.findByPk chamado com o ID correto
    expect(Document.findByPk).toHaveBeenCalledWith(1);

    // Histórico de chat carregado em ordem crescente
    expect(Chat.findAll).toHaveBeenCalledWith({
      where: { documentId: 1 },
      order: [['dateTime', 'ASC']],
    });

    // Mensagens formadas corretamente e enviadas para a IA
    expect(chatWithGemini).toHaveBeenCalledWith([
      {
        role: 'system',
        text: expect.stringContaining('Texto original do documento'),
      },
      { role: 'user', text: 'Olá' },
      { role: 'assistant', text: 'Oi! Como posso ajudar?' },
      { role: 'user', text: 'Qual o resumo do documento?' },
    ]);

    // Duas entradas criadas: usuário e IA
    expect(Chat.create).toHaveBeenCalledWith({
      documentId: 1,
      role: 'user',
      content: 'Qual o resumo do documento?',
    });
    expect(Chat.create).toHaveBeenCalledWith({
      documentId: 1,
      role: 'ai',
      content: 'Este é o resumo do documento.',
    });

    // Resposta JSON com o reply da IA
    expect(res.json).toHaveBeenCalledWith({ reply: 'Este é o resumo do documento.' });
  });

  it('deve retornar 404 se o documento não existir', async () => {
    Document.findByPk.mockResolvedValue(null);

    await ChatController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Documento não encontrado!' });
  });

  it('deve propagar erro se chatWithGemini falhar', async () => {
    // faz chatWithGemini rejeitar
    chatWithGemini.mockRejectedValue(new Error('IA indisponível'));

    // como não há try/catch, a função retorna promise rejeitada
    await expect(ChatController(req, res)).rejects.toThrow('IA indisponível');
  });
});
