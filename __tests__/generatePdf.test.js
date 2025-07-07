// __tests__/generatePdf.test.js

// 1) os mocks devem ficar aqui, ANTES dos imports abaixo:
jest.mock('html-pdf', () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
  },
}));
jest.mock('marked', () => ({
  __esModule: true,
  default: {
    parse: jest.fn(),
  },
}));

// 2) agora importamos nosso código e os módulos mockados
import { generatePdf } from '../server/utils/generatePdf.js';
import pdf from 'html-pdf';
import marked from 'marked';

describe('generatePdf', () => {
  const dummyBuffer = Buffer.from('PDF_BINARY');
  const dummyHtml   = '<p>Converted HTML</p>';

  beforeEach(() => {
    jest.clearAllMocks();

    // faz marked.parse(text) sempre retornar o nosso HTML simulado
    marked.parse.mockReturnValue(dummyHtml);

    // faz pdf.create(html, opts).toBuffer(cb) chamar cb(null, dummyBuffer)
    pdf.create.mockReturnValue({ toBuffer: cb => cb(null, dummyBuffer) });
  });

  it('deve converter markdown em HTML e gerar Buffer de PDF', async () => {
    const md     = '# Título\n\nTexto **negrito**';
    const result = await generatePdf(md);

    // --- DEBUG ---
    // Adicione esta linha para ver com o que a função foi chamada:
    console.log('Chamadas de marked.parse:', marked.parse.mock.calls);

    // 1) validamos que o marked.parse foi chamado com o markdown correto
    expect(marked.parse).toHaveBeenCalledWith(md);

    // 2) o HTML passado ao pdf.create contém as tags e o corpo gerado
    const htmlStr = pdf.create.mock.calls[0][0];
    expect(htmlStr).toContain('<html>');
    expect(htmlStr).toContain(dummyHtml);
    expect(htmlStr).toContain('</html>');

    // 3) validamos que o formato A4 foi corretamente repassado
    expect(pdf.create).toHaveBeenCalledWith(expect.any(String), { format: 'A4' });

    // 4) e que o retorno é o nosso dummyBuffer
    expect(result).toBe(dummyBuffer);
  });

  it('deve rejeitar a Promise quando html-pdf falhar', async () => {
    // simula erro no callback de toBuffer
    pdf.create.mockReturnValueOnce({ toBuffer: cb => cb(new Error('falha'), null) });

    await expect(generatePdf('x')).rejects.toThrow('falha');
  });
});
