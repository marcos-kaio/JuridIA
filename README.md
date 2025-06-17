# Projeto de Desenvolvimento de Software - UFPE
# JuridIA

Automatiza processos jurídicos combinando **frontend em React + Vite** com **backend em Node.js/Express**.

---

## Tecnologias usadas

- **Frontend:** React, Vite, CSS (MainPopUp.jsx, LandingPage.jsx)
- **Backend:** Node.js, Express, nodemon
- **Scripts de automação:** concurrently
- **Controle de versão:** Git

---

## Como instalar

1. Clone o repositório:
   ```bash
   git clone https://github.com/marcos-kaio/JuridIA.git
   cd JuridIA
   ```
2. Instale as dependências do frontend:
    ```bash
    cd React
    npm install

3. Instale as dependências do backend:
    ```bash
    cd ../Server
    npm install

4. Instale as ferramentas auxiliares na raiz do projeto:
    ```bash
    cd ..
    npm install
    npm install --save-dev concurrently+
    ```

## Como rodar

- Na raiz do projeto:
    ```bash
    npm start
    ```

## Estrutura de pastas
    ```bash
    JuridIA/
    ├── React/           # Código do frontend (React + Vite)
    │   ├── src/
    │   │   ├── components/
    │   │   └── pages/
    ├── Server/          # API em Node.js/Express
    │   └── server.js
    ├── package.json     # Scripts principais e dependências
    └── README.md        # Este arquivo
    ```