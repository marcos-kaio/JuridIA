import api from "./api.js";

export async function register({username, email, birthday, escolaridade, password}) {
  try {
    const resp = await api.post("/user/register", {
      username, email, birthday, escolaridade, password
    });

    return resp.data;
  } catch (err) {
    const message = err.response?.data?.error || "Ocorreu um erro ao tentar registrar.";
    throw new Error(message);
  }
}


export async function login({ email, password }) {
  try {
    const resp = await api.post("http://localhost:8081/user/login", {
      email,
      password,
    });
    const { token, user } = resp.data;
    // armazena token de usuário
    localStorage.setItem("user_token", token);
    localStorage.setItem("user_name", user.username);

    // configuração de envio de token
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return user;
  } catch (err) {
    const message = err.response?.data?.error || "Erro de autenticação";
    throw new Error(message);
  }
}

// verifica se token é válido
export async function checkAuth() {
  try {
    const resp = await api.get("http://localhost:8081/user/me");
    return { valid: true, user: resp.data };
  } catch(err) {
    return { valid: false };
  }
}