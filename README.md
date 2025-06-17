## Projeto de Desenvolvimento de Software - CIn UFPE
# JuridIA

Sistema que tem como objetivo simplificar documentos jurídicos combinando **frontend em React + Vite** com **backend em Node.js/Express** e **Gemini API**.

---

## Tecnologias usadas

- **Frontend:** React + Vite
- **Backend:** Node.js, Express, nodemon
- **Controle de versão:** Git

---

#### Acesse nosso guia de contribuição da equipe clicando [aqui](https://github.com/marcos-kaio/JuridIA/blob/main/CONTRIBUTING.md)!

## Como configurar o projeto localmente

1. Instalar o node:
    
    - Baixar o [node aqui](https://nodejs.org/en) ou instalar com o `sudo`.

    ```bash
    sudo apt install nodejs
    ```

2. Clonar o repositório e entrar no mesmo:
   ```bash
   git clone https://github.com/marcos-kaio/JuridIA.git
   cd JuridIA
   ```
  
3. Instalar as dependências do sistema:
    ```bash
    npm install
    ``` 
    ```bash
    npm run install:all
    ```

## Como rodar

- Na raiz do projeto:
    ```bash
    npm run start
    ```
- Abra no `localhost:3000`.

## Estrutura de pastas
```
JuridIA/
├── React/                    # Frontend em React com Vite
│   ├── node_modules/         # Dependências do frontend
│   ├── src/                  # Código-fonte do React
│   │   ├── assets/           # Ativos estáticos como imagens, fontes, etc.
│   │   ├── components/       # Componentes React reutilizáveis
│   │   ├── pages/            # Páginas principais da aplicação
│   │   ├── app.jsx           # Componente principal da aplicação
│   │   ├── main.jsx          # Ponto de entrada da aplicação React
│   │   └── index.css         # Estilos globais da aplicação
│   ├── .gitignore            # Arquivos ignorados no Git (frontend)
│   ├── eslint.config.js      # Configuração do ESLint
│   ├── index.html            # Página HTML principal
│   ├── package-lock.json     # Controle de versões das dependências
│   ├── package.json          # Dependências e scripts do frontend
│   └── vite.config.js        # Configuração do Vite
│
├── Server/                   # Backend em Node.js com Express
│   ├── controllers/          # Lógica dos controladores da API
│   │   └── AIController.js   # Controlador da IA
│   ├── services/             # Serviços externos ou internos
│   │   └── geminiService.js  # Serviço que consome a Gemini API
│   ├── utils/                # Funções utilitárias
│   │   └── generatePdf.js    # Geração de PDF
│   ├── node_modules/         # Dependências do backend
│   ├── index.js              # Ponto de entrada da API
│   ├── package-lock.json     # Controle de versões das dependências
│   └── package.json          # Dependências e scripts do backend
│
├── .gitignore                # Arquivos ignorados no Git (raiz)
├── CONTRIBUTING.md           # Guia para contribuições no projeto
├── package-lock.json         # Controle de versões das dependências da raiz
├── package.json              # Dependências e scripts gerais
└── README.md                 # Documentação principal do projeto
```
