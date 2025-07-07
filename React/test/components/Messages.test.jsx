import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserMessage, BotMessage } from '../../src/pages/ChatPage';

vi.mock("react-markdown", () => ({
  default: ({ children }) => <div data-testid="markdown-mock">{children}</div>,
}));

describe('Componentes de Mensagem', () => {
  it('UserMessage renderiza o conteúdo corretamente', () => {
    render(<UserMessage userContent="Mensagem do usuário" />);
    expect(screen.getByText("Mensagem do usuário")).toBeInTheDocument();
  });

  it('BotMessage renderiza o conteúdo', () => {
    render(<BotMessage botContent="Resposta do Bot" />);
    expect(screen.getByText("Resposta do Bot")).toBeInTheDocument();
  });
});