import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ChatPage from '../../src/pages/ChatPage';
import * as chatService from '../../src/services/chatService';

vi.mock('../../src/services/chatService');

describe('Página de Chat - ChatPage', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    const mockConversations = [{ id: 1, status: 'done', updatedAt: '2025-07-07T12:00:00Z', originalText: 'texto' }];
    const mockHistory = [{ role: 'user', content: 'Pergunta carregada' }];
    chatService.getChats.mockResolvedValue({ data: mockConversations });
    chatService.getChathistory.mockResolvedValue({ data: mockHistory });
    chatService.sendMessage.mockResolvedValue({ data: { reply: 'Resposta simulada' } });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o layout inicial e carregar os dados', async () => {
    render(<MemoryRouter><ChatPage /></MemoryRouter>);
    expect(await screen.findByText('Conversa 1')).toBeInTheDocument();
    expect(await screen.findByText('Pergunta carregada')).toBeInTheDocument();
    expect(chatService.getChathistory).toHaveBeenCalledWith(1);
  });
  
  // ✨ TESTE CORRIGIDO ✨
  it('deve permitir ao usuário enviar uma nova mensagem', async () => {
    render(<MemoryRouter><ChatPage /></MemoryRouter>);
    await screen.findByText('Conversa 1');

    const input = screen.getByPlaceholderText(/pergunte algo/i);
    await user.type(input, 'Uma pergunta nova');
    await user.click(input.nextElementSibling);

    // Verificação 1: O input foi limpo? (Isso mostra que a primeira parte da função rodou)
    expect(input).toHaveValue('');

    // Verificação 2: As chamadas corretas à API foram feitas em sequência?
    // Usamos 'waitFor' para dar tempo para todas as promessas se resolverem.
    await waitFor(() => {
      // Garante que a mensagem foi enviada para o backend
      expect(chatService.sendMessage).toHaveBeenCalledWith(1, 'Uma pergunta nova');
      
      // Garante que o app tentou se atualizar depois
      expect(chatService.getChathistory).toHaveBeenCalledTimes(2); // 1 na carga inicial, 1 no refresh
    });
  });
});