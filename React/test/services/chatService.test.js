import { describe, it, expect, afterEach, vi } from 'vitest';
import { getChats, getChathistory, sendMessage, uploadAndSimplifyPdf } from '../../src/services/chatService';
import api from '../../src/services/api';

vi.mock('../../src/services/api');

describe('chatService', () => {
  afterEach(() => { vi.clearAllMocks(); });

  it('getChats deve chamar a API com a URL completa', async () => {
    api.get.mockResolvedValue({ data: [] });
    await getChats();
    expect(api.get).toHaveBeenCalledWith('http://localhost:8081/chat/find');
  });

  it('getChathistory deve chamar a API com a URL completa e o ID', async () => {
    api.get.mockResolvedValue({ data: [] });
    await getChathistory(1);
    expect(api.get).toHaveBeenCalledWith('http://localhost:8081/chat/1');
  });

  it('sendMessage deve fazer um POST para a URL correta', async () => {
    api.post.mockResolvedValue({ data: { reply: 'OK' } });
    await sendMessage(1, 'Teste');
    expect(api.post).toHaveBeenCalledWith('http://localhost:8081/chat/ask/1', { question: 'Teste' });
  });

  it('uploadAndSimplifyPdf deve fazer um POST com FormData para a URL de simplify', async () => {
    const formData = new FormData();
    formData.append('file', 'any-file');
    api.post.mockResolvedValue({ data: 'pdf-blob' });
    await uploadAndSimplifyPdf(formData);
    expect(api.post).toHaveBeenCalledWith(
      'http://localhost:8081/document/simplify', 
      formData, 
      expect.any(Object)
    );
  });
});