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

## Como configurar o projeto localmente

1. Instalar o node:
    
    - Baixar o [node aqui](https://nodejs.org/en) ou instalar com o `sudo`.

    ```bash
    sudo apt install nodejs
    ```

2. Instalar as dependências do sistema:
    ```bash
    npm install
    ``` 
    ```bash
    npm run install:all
    ```     

3. Clone o repositório e entre no mesmo:
   ```bash
   git clone https://github.com/marcos-kaio/JuridIA.git
   cd JuridIA
   ```

## Como rodar

- Na raiz do projeto:
    ```bash
    npm start
    ```
- Abra no `localhost:3000`.

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