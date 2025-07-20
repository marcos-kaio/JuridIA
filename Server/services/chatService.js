export function buildChatMessages(doc, history, userMessage) {
  return [
    {
      role: "system",
      text: `Este chat é sobre este documento. Seu texto original é:\n ${doc.originalText}`,
    },
    ...history.map((m) => ({
      role: m.role === "ai" ? "assistant" : "user",
      text: m.content,
    })),
    { role: "user", text: userMessage },
  ];
}