// __tests__/AIController.test.js

jest.mock('../services/geminiService.js');
jest.mock('../utils/generatePdf.js');
jest.mock('../models/db.js');
jest.mock('pdf-parse/lib/pdf-parse.js')


import AIControler from '../controllers/AIController.js';
import { callGemini } from '../services/geminiService.js';
import { generatePdf } from '../utils/generatePdf.js';
import { Document } from '../models/db.js';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

;

describe('AIControler', () => {
  let req, res, docMock;

  beforeEach(() => {
    // Mock da requisição
    req = {
      file: { buffer: Buffer.from('fake-pdf') },
      body: { userId: '42' },
    };

    // Mock da resposta
    res = {
      header: jest.fn().mockReturnThis(),
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock do retorno de pdfParse
    pdfParse.mockResolvedValue({ text: 'texto original extraído' });

    // Mock do documento salvo
    docMock = { update: jest.fn() };
    Document.create.mockResolvedValue(docMock);

    // Mocks de serviços externos
    callGemini.mockResolvedValue('texto simplificado');
    generatePdf.mockResolvedValue(Buffer.from('pdf-simplificado'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve processar o PDF, salvar no banco e retornar o PDF simplificado', async () => {
    await AIControler(req, res);

    // pdfParse chamado corretamente
    expect(pdfParse).toHaveBeenCalledWith(req.file.buffer);

    // Document.create com dados iniciais
    expect(Document.create).toHaveBeenCalledWith({
      userId: 42,
      originalUrl: req.file.buffer,
      simplifiedUrl: null,
      originalText: 'texto original extraído',
      status: 'processing',
    });

    // callGemini e generatePdf
    expect(callGemini).toHaveBeenCalledWith(req.file.buffer);
    expect(generatePdf).toHaveBeenCalledWith('texto simplificado');

    // atualização final do documento
    expect(docMock.update).toHaveBeenCalledWith({
      simplifiedUrl: Buffer.from('pdf-simplificado'),
      status: 'done',
    });

    // headers e envio de buffer
    expect(res.header).toHaveBeenCalledWith('Content-Type', 'application/pdf');
    expect(res.header).toHaveBeenCalledWith(
      'Content-Disposition',
      'attachment; filename="simplificado.pdf"'
    );
    expect(res.send).toHaveBeenCalledWith(Buffer.from('pdf-simplificado'));
  });

  it('deve retornar 500 e marcar status error em caso de falha após criar o doc', async () => {
    // Simula erro após criar o doc (callGemini falha)
    callGemini.mockRejectedValue(new Error('IA indisponível'));

    await AIControler(req, res);

    // status 500 e mensagem de erro
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Erro ao simplificar o documento.',
    });

    // doc.update chamado para definir status error
    expect(docMock.update).toHaveBeenCalledWith({ status: 'error' });
  });

  it('deve retornar 500 sem crashar se falhar antes de criar o doc', async () => {
    // Simula falha em pdfParse (antes de Document.create)
    pdfParse.mockRejectedValue(new Error('PDF corrompido'));

    await AIControler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Erro ao simplificar o documento.',
    });

    // Como doc não foi definido, não deve chamar update
    expect(Document.create).not.toHaveBeenCalled();
  });
});
