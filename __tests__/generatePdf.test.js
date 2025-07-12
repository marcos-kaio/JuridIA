import { generatePdfFromMarkdown } from "../utils/generatePdf.js";

test("gera PDF a partir de markdown válido", async () => {
  const markdown = "# Título\n\nTexto com **destaque** e `código`.";
  const buffer = await generatePdfFromMarkdown(markdown);

  expect(Buffer.isBuffer(buffer)).toBe(true);
  expect(buffer.length).toBeGreaterThan(100); // o PDF não está vazio
});