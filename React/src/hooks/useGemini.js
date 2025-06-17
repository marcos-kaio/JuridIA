import { useState } from "react";
import axios from "axios";

function useGemini() {
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const realSend = async (file) => {
    setLoading(true);
    const form = new FormData();
    form.append("file", file);
    try {
      const resp = await axios.post("http://localhost:8081/simplify", form, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(resp.data);
      setLink(url);
    } catch (_) {
      setError("Erro ao enviar o arquivo.");
    }
    setLoading(false);
  };

  // retorna qualquer coisa pra não moer a api
  const mockSend = async (_) => {
    setLoading(true);
    setError("");
    let response = "";
    try {
      await delay(1500);
      const fakeURL = "https://example.com/fake-response.pdf";
      setLink(fakeURL);
      response = fakeURL;
    } catch (_) {
      setError("Erro simulado ao enviar o arquivo.");
    } finally {
      setLoading(false);
    }

    return response;
  };

  return {
    loading,
    link,
    error,
    send: realSend,
  };
}

export default useGemini;
