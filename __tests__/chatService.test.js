import { buildChatMessages } from "../services/chatService.js";

test("constrói array de mensagens para IA", () => {
  const doc = { originalText: "Texto base" };
  const history = [
    { role: "user", content: "Oi" },
    { role: "ai", content: "Olá" },
  ];
  const question = "Explique o início.";

  const messages = buildChatMessages(doc, history, question);

  expect(messages[0].role).toBe("system");
  expect(messages.at(-1)).toEqual({ role: "user", text: question });
  expect(messages.length).toBe(4);
});