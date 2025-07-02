// AIController.test.js
import AIControler from './AIControler.js';
import { callGemini } from '../services/geminiService.js';
import { generatePdf } from '../utils/generatePdf.js';

jest.mock('../services/geminiService.js');
jest.mock('../utils/generatePdf.js');

describe('AIControler', () => {
  it('deve retornar um PDF simplificado com status 200', async () => {
    const mockReq = {
      file: { buffer: Buffer.from('fake-pdf') },
    };

    const mockSend = jest.fn();
    const mockRes = {
      header: jest.fn().mockReturnThis(),
      send: mockSend,
    };

    callGemini.mockResolvedValue('Texto simplificado');
    generatePdf.mockResolvedValue(Buffer.from('pdf-simplificado'));

    await AIControler(mockReq, mockRes);

    expect(callGemini).toHaveBeenCalledWith(mockReq.file.buffer);
    expect(generatePdf).toHaveBeenCalledWith('Texto simplificado');
    expect(mockRes.header).toHaveBeenCalledWith('Content-Type', 'application/pdf');
    expect(mockSend).toHaveBeenCalledWith(Buffer.from('pdf-simplificado'));
  });

  it('deve retornar erro 500 em caso de falha', async () => {
    const mockReq = {
      file: { buffer: Buffer.from('fake-pdf') },
    };

    const mockStatus = jest.fn().mockReturnThis();
    const mockJson = jest.fn();
    const mockRes = {
      status: mockStatus,
      json: mockJson,
    };

    callGemini.mockRejectedValue(new Error('Erro na IA'));

    await AIControler(mockReq, mockRes);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({ error: 'Erro ao simplificar o documento.' });
  });
});