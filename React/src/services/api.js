import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081',
  withCredentials: false,
});

// garante que o token estará sendo passado para autenticação
api.interceptors.request.use(config => {
  const token = localStorage.getItem('user_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;