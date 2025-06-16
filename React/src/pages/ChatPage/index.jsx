import Logo from "../../components/Logo";
import DoorClosedIcon from "../../assets/DoorClosedFill.png";
import FileAddIcon from "../../assets/file-plus.png";
import PersonCircleIcon from "../../assets/PersonCircle.png";
import { Outlet } from "react-router-dom";

import "./styles.css";

export default function ChatPage() {
  const onNewConversation = () => {
    window.alert("ok");
  };

  return (
    <div className="chat-container">
      <aside className="chat-sidebar">
        <header className="chat-logo">
          <img src={DoorClosedIcon} alt="Door Closed Icon" />
          <img src={PersonCircleIcon} alt="Usuário" />
          <Logo className="logo" size={120} />
        </header>
        <ul className="chat-items">
          <button className="btn btn-secondary" onClick={onNewConversation}>
            <img src={FileAddIcon} />
            Nova Conversa
          </button>
          <button className="btn btn-tertiary">Contrato B</button>
          <button className="btn btn-tertiary">Contrato B</button>
          <button className="btn btn-tertiary">Contrato B</button>
          <button className="btn btn-tertiary">Contrato B</button>
          <button className="btn btn-tertiary">Contrato B</button>
          <button className="btn btn-tertiary">Contrato B</button>
          <button className="btn btn-tertiary">Contrato B</button>
          <button className="btn btn-tertiary">Contrato B</button>
          <button className="btn btn-tertiary">Contrato B</button>
          <button className="btn btn-tertiary">Contrato B</button>
          <button className="btn btn-tertiary">Contrato B</button>
          <button className="btn btn-tertiary">Contrato B</button>
          <button className="btn btn-tertiary">Contrato C</button>
        </ul>
      </aside>
      <main className="chat-area">
        <Outlet />
      </main>
    </div>
  );
}
