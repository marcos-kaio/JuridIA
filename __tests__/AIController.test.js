jest.mock("../models/db.js", () => ({
  Document: { create: jest.fn() },
}));
jest.mock("../controllers/AIController.js", () => ({
  simplifyPdfBuffer: jest.fn(),
}));

import { AIController, simplifyPdfBuffer } from "../controllers/AIController.js";
import { Document } from "../models/db.js";

test("marca o documento como 'error' se ocorrer falha", async () => {
  const req = { file: { buffer: Buffer.from("pdf") }, user: { id: 1 } };
  const res = { status: jest.fn(() => res), json: jest.fn() };
  const mockDoc = { update: jest.fn() };

  Document.create.mockResolvedValue(mockDoc);
  simplifyPdfBuffer.mockImplementation(() => { throw new Error("Falha") });

  await AIController(req, res);

  expect(mockDoc.update).toHaveBeenCalledWith({ status: "error" });
  expect(res.status).toHaveBeenCalledWith(500);
});