import { Outlet } from "react-router-dom";

import "./styles.css";

export default function ChatPage() {
  return (
    <div className="chat-container">
      <aside className="chat-sidebar">
        <header className="chat-logo">
          <h1>JuridIA</h1>
        </header>
        <ul className="chat-items">
          <button className="chat-btn">Contrato A</button>
          <button className="chat-btn">Contrato A</button>
          <button className="chat-btn">Contrato A</button>
        </ul>
      </aside>
      <main className="chat-area">
        <Outlet />
      </main>
    </div>
  );
}
