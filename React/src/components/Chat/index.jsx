import "./styles.css";

export default function Chat() {
  return (
    <div className="message-container">
      <div className="message-area"></div>

      <footer className="input-area">
        <form className="message-form">
          <div className="wrapper">
            <input
              type="text"
              name="message"
              id="message"
              className="message-input"
            />
            <div className="message-upload-area">
              <button className="upload">Adicione um Documento</button>
            </div>
          </div>
          <input type="button" value="" className="send" />
        </form>
      </footer>
    </div>
  );
}
