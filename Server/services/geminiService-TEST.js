// callGemini.test.js
import { callGemini } from './callGemini.js';
import { GoogleGenAI } from '@google/genai';

// Mock da biblioteca @google/genai
jest.mock('@google/genai', () => {
  return {
    GoogleGenAI: jest.fn().mockImplementation(() => ({
      models: {
        generateContent: jest.fn().mockResolvedValue({ text: 'Texto simplificado gerado pela IA' }),
      },
    })),
  };
});

describe('callGemini', () => {
  it('deve retornar o texto simplificado da IA', async () => {
    const fakePdfBuffer = Buffer.from('PDF de teste');

    const result = await callGemini(fakePdfBuffer);

    expect(result).toBe('Texto simplificado gerado pela IA');
    expect(GoogleGenAI).toHaveBeenCalledWith({ apiKey: process.env.GEMINI_TOKEN });
  });
});