import { useCallback, useEffect, useRef, useState } from "react";
import ArrowRightIcon from "../../assets/Arrow right-circle.png";
import PlusIcon from "../../assets/plus.png";
import "./styles.css";
import Typewriter from "../Typewriter";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const containerRef = useRef(null);
  const speed = 5;

  function onMessageSend(e) {
    e.preventDefault();

    if (message.length == 0 || typing) {
      return;
    }

    setChat((prevChat) => [...prevChat, message]);
    setMessage("");
  }

  // rola pra baixo qnd uma msg nova entra, n ta perfeito precisa ajustar na hora do bot responder
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chat]);

  function onMessageType(e) {
    const text = e.target.value;
    setMessage(text);
  }

  const handleOnType = useCallback((isTyping) => {
    setTyping(isTyping);
  }, []);

  return (
    <div className="message-container">
      <div className="message-area" ref={containerRef}>
        <ul className="messages">
          {chat.map((item, i) => {
            if (i & 1) {
              return (
                <li key={i} className={"user"}>
                  {item}
                </li>
              );
            } else {
              return (
                <Typewriter
                  key={i}
                  text={item}
                  onWriting={handleOnType}
                  speed={speed}
                  className="bot"
                />
              );
            }
          })}
        </ul>
      </div>

      <footer className="input-area">
        <form className="message-form" onSubmit={onMessageSend}>
          <div className="wrapper">
            <input
              type="text"
              name="message"
              placeholder="Pergunte algo para o juridibot"
              id="message"
              className="message-input"
              onChange={onMessageType}
              value={message}
            />
            <div className="message-upload-area">
              <input
                type="file"
                name="documento"
                id="documento"
                accept="application/pdf"
              />
            </div>
          </div>
          <button type="submit" value="" className="send" disabled={typing}>
            <img src={ArrowRightIcon} alt="" />
          </button>
        </form>
      </footer>
    </div>
  );
}
