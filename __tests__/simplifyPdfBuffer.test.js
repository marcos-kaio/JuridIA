jest.mock("pdf-parse/lib/pdf-parse.js", () => jest.fn());
jest.mock("../services/geminiService.js", () => ({ callGeminiPdf: jest.fn() }));
jest.mock("../utils/generatePdf.js", () => ({ generatePdfFromMarkdown: jest.fn() }));

import { simplifyPdfBuffer } from "../controllers/AIController.js";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { callGeminiPdf } from "../services/geminiService.js";
import { generatePdfFromMarkdown } from "../utils/generatePdf.js";

test("executa cadeia de extração, IA e geração de PDF", async () => {
  const buf = Buffer.from("fake-pdf");
  pdfParse.mockResolvedValue({ text: "Texto extraído" });
  callGeminiPdf.mockResolvedValue("Texto simplificado");
  generatePdfFromMarkdown.mockResolvedValue(Buffer.from("pdf final"));

  const result = await simplifyPdfBuffer(buf);

  expect(pdfParse).toHaveBeenCalledWith(buf);
  expect(callGeminiPdf).toHaveBeenCalledWith(buf);
  expect(generatePdfFromMarkdown).toHaveBeenCalledWith("Texto simplificado");
  expect(Buffer.isBuffer(result.pdf)).toBe(true);
});