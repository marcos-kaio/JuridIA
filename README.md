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
```
    JuridIA/
├── React/                    #Frontend em React com Vite
│   ├── node_modules/         #Dependências do frontend
│   ├── src/                  #Código-fonte do React
│   ├── .gitignore            #Arquivos ignorados no Git (frontend)
│   ├── eslint.config.js      #Configuração do ESLint
│   ├── index.html            #Página HTML principal
│   ├── package-lock.json     #Controle de versões das dependências
│   ├── package.json          #Dependências e scripts do frontend
│   └── vite.config.js        #Configuração do Vite
│
├── Server/                   #Backend em Node.js com Express
│   ├── controllers/          #Lógica dos controladores da API
│   │   └── AIController.js   #Controlador da IA
│   ├── services/             #Serviços externos ou internos
│   │   └── geminiService.js  #Serviço que consome a Gemini API
│   ├── utils/                #Funções utilitárias
│   │   └── generatePdf.js    #Geração de PDF
│   ├── node_modules/         #Dependências do backend
│   ├── index.js              #Ponto de entrada da API
│   ├── package-lock.json     #Controle de versões das dependências
│   └── package.json          #Dependências e scripts do backend
│
├── .gitignore                #Arquivos ignorados no Git (raiz)
├── CONTRIBUTING.md           #Guia para contribuições no projeto
├── package-lock.json         #Controle de versões das dependências da raiz
├── package.json              #Dependências e scripts gerais
└── README.md                 #Documentação principal do projeto
```