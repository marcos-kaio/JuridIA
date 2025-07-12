import { buildGeminiPdfPrompt } from "../services/geminiService.js";

test("monta prompt com conteúdo em base64 corretamente", () => {
  const buf = Buffer.from("exemplo-pdf");
  const prompt = buildGeminiPdfPrompt(buf);

  expect(prompt).toHaveLength(2);
  expect(prompt[0].text).toMatch(/Simplifique/);
  expect(prompt[1].inlineData.mimeType).toBe("application/pdf");
  expect(prompt[1].inlineData.data).toBe(buf.toString("base64"));
});