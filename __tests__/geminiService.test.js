// __tests__/geminiService.test.js
jest.mock('@google/genai', () => {
  const generateContent = jest.fn();
  return {
    __esModule: true,
    GoogleGenAI: jest.fn(() => ({ models: { generateContent } })),
    __generateContentMock: generateContent,
  };
});


import { callGemini, chatWithGemini } from '../services/geminiService.js';
import { GoogleGenAI, __generateContentMock as generateContentMock } from '@google/genai';



describe('geminiService', () => {
  beforeEach(() => {
    // limpa chamadas e instâncias
    generateContentMock.mockReset();
    GoogleGenAI.mockClear();
  });

  describe('callGemini', () => {
    it('envia o PDF em base64 e retorna o texto simplificado', async () => {
      const fakePdf = Buffer.from('fake-pdf');
      generateContentMock.mockResolvedValue({ text: 'Simplificado' });

      const result = await callGemini(fakePdf);

      expect(generateContentMock).toHaveBeenCalledWith({
        model: 'gemini-2.0-flash',
        contents: [
          { text: 'Simplifique este documento para leigos:' },
          {
            inlineData: {
              mimeType: 'application/pdf',
              data: fakePdf.toString('base64'),
            },
          },
        ],
      });
      expect(result).toBe('Simplificado');
    });

    it('propaga erro da API', async () => {
      const fakePdf = Buffer.from('fake-pdf');
      generateContentMock.mockRejectedValue(new Error('IA error'));

      await expect(callGemini(fakePdf)).rejects.toThrow('IA error');
    });

    it('suporta buffers grandes sem alterar o comportamento', async () => {
      const largePdf = Buffer.alloc(6 * 1024 * 1024, 'A');
      generateContentMock.mockResolvedValue({ text: 'Grande' });

      const result = await callGemini(largePdf);

      expect(generateContentMock).toHaveBeenCalled();
      expect(result).toBe('Grande');
    });
  });

  describe('chatWithGemini', () => {
    it('envia array de mensagens e retorna resposta da IA', async () => {
      const messages = [
        { role: 'user', text: 'Pergunta?' },
        { role: 'assistant', text: 'Resposta anterior' },
      ];
      generateContentMock.mockResolvedValue({ text: 'Nova resposta' });

      const result = await chatWithGemini(messages);

      expect(generateContentMock).toHaveBeenCalledWith({
        model: 'gemini-2.0-flash',
        contents: messages,
      });
      expect(result).toBe('Nova resposta');
    });

    it('lança erro se o chat falhar', async () => {
      const msgs = [{ role: 'user', text: 'Teste' }];
      generateContentMock.mockRejectedValue(new Error('Chat error'));

      await expect(chatWithGemini(msgs)).rejects.toThrow('Chat error');
    });

    it('aceita mensagens muito longas', async () => {
      const longText = 'A'.repeat(20000);
      const msgs = [{ role: 'user', text: longText }];
      generateContentMock.mockResolvedValue({ text: 'Ok' });

      const result = await chatWithGemini(msgs);

      expect(generateContentMock).toHaveBeenCalledWith({
        model: 'gemini-2.0-flash',
        contents: msgs,
      });
      expect(result).toBe('Ok');
    });
  });
});
