import { useEffect, useState } from "react";

function Typewriter({ className, text, onWriting, speed = 100 }) {
  const [currentText, setCurrentText] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setCurrentText("");
    setIdx(0);
  }, [text]);

  useEffect(() => {
    if (idx > text.length || !text) return;

    if (idx === 0) {
      onWriting(true);
    }

    if (idx < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((pText) => pText + text[idx]);
        setIdx((pIdx) => pIdx + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      onWriting(false);
    }
  }, [text, onWriting, idx, speed]);

  return <span className={className}>{currentText}</span>;
}

export default Typewriter;
