// __tests__/geminiService.test.js
import { callGemini, chatWithGemini } from '../services/geminiService.js';
import { GoogleGenAI, __generateContentMock } from '@google/genai';

jest.mock('@google/genai', () => {
  const __generateContentMock = jest.fn();
  return {
    GoogleGenAI: jest.fn().mockImplementation(() => ({
      models: { generateContent: __generateContentMock },
    })),
    __generateContentMock,
  };
});

describe('geminiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Ensure each new instance of GoogleGenAI uses the same mock
    GoogleGenAI.mockImplementation(() => ({
      models: { generateContent: __generateContentMock },
    }));
  });

  describe('callGemini', () => {
    it('envia o PDF para a IA e retorna o texto simplificado', async () => {
      const fakePdf = Buffer.from('fake-pdf');
      __generateContentMock.mockResolvedValue({ text: 'Simplificado' });

      const result = await callGemini(fakePdf);

      expect(__generateContentMock).toHaveBeenCalledWith({
        model: 'gemini-2.0-flash',
        contents: expect.arrayContaining([
          { text: 'Simplifique este documento para leigos:' },
          expect.objectContaining({
            inlineData: {
              mimeType: 'application/pdf',
              data: fakePdf.toString('base64'),
            },
          }),
        ]),
      });
      expect(result).toBe('Simplificado');
    });

    it('lança erro se a IA falhar', async () => {
      const fakePdf = Buffer.from('fake-pdf');
      __generateContentMock.mockRejectedValue(new Error('IA error'));

      await expect(callGemini(fakePdf)).rejects.toThrow('IA error');
    });

    it('processa PDFs grandes sem alterar o comportamento', async () => {
      const largePdf = Buffer.alloc(6 * 1024 * 1024, 'A'); // 6 MB
      __generateContentMock.mockResolvedValue({ text: 'Resultado grande' });

      const result = await callGemini(largePdf);

      expect(result).toBe('Resultado grande');
      expect(__generateContentMock).toHaveBeenCalled();
    });
  });

  describe('chatWithGemini', () => {
    it('envia mensagens para a IA e retorna a resposta', async () => {
      const messages = [
        { role: 'user', text: 'Pergunta?' },
        { role: 'assistant', text: 'Resposta anterior' },
      ];
      __generateContentMock.mockResolvedValue({ text: 'Nova resposta' });

      const result = await chatWithGemini(messages);

      expect(__generateContentMock).toHaveBeenCalledWith({
        model: 'gemini-2.0-flash',
        contents: messages,
      });
      expect(result).toBe('Nova resposta');
    });

    it('lança erro se a IA falhar no chat', async () => {
      const messages = [{ role: 'user', text: 'Test' }];
      __generateContentMock.mockRejectedValue(new Error('Chat error'));

      await expect(chatWithGemini(messages)).rejects.toThrow('Chat error');
    });

    it('lida com mensagens muito longas', async () => {
      const longText = 'A'.repeat(20_000);
      const messages = [{ role: 'user', text: longText }];
      __generateContentMock.mockResolvedValue({ text: 'Ok para longa' });

      const result = await chatWithGemini(messages);

      expect(result).toBe('Ok para longa');
      expect(__generateContentMock).toHaveBeenCalledWith({
        model: 'gemini-2.0-flash',
        contents: messages,
      });
    });
  });
});
