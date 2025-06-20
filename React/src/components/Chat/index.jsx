import { useCallback, useEffect, useRef, useState } from "react";
import ArrowRightIcon from "../../assets/Arrow right-circle.png";
import "./styles.css";
import Typewriter from "../Typewriter";
import useGemini from "../../hooks/useGemini";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]); // { from: "user" | "bot", text: string }
  const [typing, setTyping] = useState(false);
  const [file, setFile] = useState(null);
  const { error, loading, send } = useGemini();
  const containerRef = useRef(null);

  const speed = 5;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chat]);

  const addMessage = (from, text) => {
    setChat((prev) => [...prev, { from, text }]);
  };

  const replaceLastMessage = (newMessage) => {
    setChat((prev) => [...prev.slice(0, -1), newMessage]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (typing || (!message.trim() && !file)) return;

    if (message.trim()) {
      addMessage("user", message);
      addMessage("bot", "Processando sua pergunta...");

      // simula uma requisicao
      setTimeout(() => {
        replaceLastMessage({
          from: "bot",
          text: `Resposta para: "${message}"`,
        });
      }, 1000);
    }

    if (file) {
      addMessage("bot", "Enviando PDF...");
      try {
        const link = await send(file);
        replaceLastMessage({
          from: "bot",
          text: link
            ? `Arquivo processado: ${link}`
            : "Arquivo processado com sucesso.",
        });
      } catch {
        replaceLastMessage({
          from: "bot",
          text: "Erro ao processar o PDF.",
        });
      }
    }

    setMessage("");
    setFile(null);
  };

  const handleTypingStatus = useCallback((isTyping) => {
    setTyping(isTyping);
  }, []);

  return (
    <div className="message-container">
      <div className="message-area" ref={containerRef}>
        <ul className="messages">
          {chat.map((item, i) =>
            item.from === "bot" ? (
              <Typewriter
                key={i}
                text={item.text}
                onWriting={handleTypingStatus}
                speed={speed}
                className="bot"
              />
            ) : (
              <li key={i} className="user">
                {item.text}
              </li>
            )
          )}
        </ul>
      </div>

      <footer className="input-area">
        <form className="message-form" onSubmit={handleSubmit}>
          <div className="wrapper">
            <input
              type="text"
              name="message"
              id="message"
              placeholder="Pergunte algo para o juridibot"
              className="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={typing || loading}
            />
            <div className="message-upload-area">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>
          <button type="submit" className="send" disabled={typing || loading}>
            <img src={ArrowRightIcon} alt="Send" />
          </button>
        </form>
      </footer>
    </div>
  );
}
