// generatePdf.test.js
import { generatePdf } from './generatePdf.js';
import pdf from 'html-pdf';
import { marked } from 'marked';

jest.mock('html-pdf');
jest.mock('marked', () => ({
  parse: jest.fn(),
}));

describe('generatePdf', () => {
  const fakeBuffer = Buffer.from('PDF_BINARY');
  const fakeHtmlBody = '<p>Converted HTML</p>';

  beforeEach(() => {
    jest.clearAllMocks();
    // marked.parse returns our fake HTML body
    marked.parse.mockReturnValue(fakeHtmlBody);
    // pdf.create(...).toBuffer invokes callback with (null, fakeBuffer)
    pdf.create.mockReturnValue({
      toBuffer: (cb) => cb(null, fakeBuffer),
    });
  });

  it('converte markdown em HTML e gera um Buffer de PDF', async () => {
    const markdown = '# Title\n\nSome **bold** text.';
    const result = await generatePdf(markdown);

    // Verifica a conversão Markdown → HTML
    expect(marked.parse).toHaveBeenCalledWith(markdown);

    // Verifica que pdf.create recebeu o HTML completo
    const expectedHtmlStart = '<html>';
    const expectedHtmlEnd = '</html>';
    const htmlArg = pdf.create.mock.calls[0][0];
    expect(htmlArg).toContain(expectedHtmlStart);
    expect(htmlArg).toContain(fakeHtmlBody);
    expect(htmlArg).toContain(expectedHtmlEnd);

    // Verifica o formato passado nas opções
    expect(pdf.create).toHaveBeenCalledWith(expect.any(String), { format: 'A4' });

    // Verifica retorno do Buffer
    expect(result).toBe(fakeBuffer);
  });

  it('rejeita a Promise quando html-pdf retorna erro', async () => {
    // simula erro no toBuffer
    pdf.create.mockReturnValueOnce({
      toBuffer: (cb) => cb(new Error('PDF failure'), null),
    });

    await expect(generatePdf('anything')).rejects.toThrow('PDF failure');
  });
});
