import JuridiaLogo from "../../assets/juridia_logo.png";
import "./styles.css";

function Logo({ className = "", size = 240 }) {
  return (
    <img
      className={className}
      src={JuridiaLogo}
      alt="Logo da JuridIA"
      style={{ width: size + "px" }}
    />
  );
}

export default Logo;
