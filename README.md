# Projeto de Desenvolvimento de Software - CIn UFPE

# JuridIA

O JuridIA é um sistema inovador que utiliza inteligência artificial para simplificar documentos jurídicos complexos em resumos claros e diretos. Ele combina uma interface de usuário moderna e responsiva com um robusto backend para interagir com a API. A aplicação foi desenvolvida com uma arquitetura modular, separando as responsabilidades do frontend e do backend, o que garante maior escalabilidade e manutenibilidade.
##
**Link para o site:** [https://juridia-9218.vercel.app/](https://juridia-9218.vercel.app/)
##
**Link para o tutorial:** [Video](https://drive.google.com/file/d/1LLB1Xsmc4t3X6PP-qYriKtd4oMGJd9AV/view?usp=drivesdk)
##

## Tecnologias Utilizadas
O projeto foi construído utilizando as seguintes tecnologias e ferramentas:

**Frontend:** 
- **React + Vite:** Para uma interface de usuário rápida e eficiente.
- **Tailwind CSS:** Para estilização e design responsivo.

**Backend:** 
- **Node.js + Express.js:** Para a criação da API RESTful.
- **PostgreSQL:** Para gerenciamento do banco de dados relacional.
- **Gemini API:** Para o processamento de documentos e geração de resumos.

**Ferramentas:** 
- **Git:** Controle de versão do projeto.
- **Render:** Plataforma de hospedagem do banco de dados e do backend.
- **Vercel:** Plataforma de hospedagem do frontend.

## Funcionalidades
Abaixo estão as principais funcionalidades implementadas no projeto:
- **Autenticação de Usuário:** O sistema inclui um sistema de autenticação que permite aos usuários criar uma conta e fazer login para acessar seus documentos e histórico.
-  **Simplificação de Documentos:** A funcionalidade central do sistema é a simplificação de documentos jurídicos complexos, traduzindo-os para uma linguagem mais acessível.
-  **Entrada de Documentos:** A plataforma oferece a capacidade de enviar documentos diretamente.
-  **Exportação em PDF:** O usuário pode receber o documento simplificado em formato PDF para fácil salvamento, compartilhamento ou impressão.
-  **Comparação de Trechos:** O sistema permite comparar o texto simplificado com o documento original para verificar a origem das informações, garantindo a precisão e maior entendimento.
- **Assistente de Dúvidas:** Uma interface de diálogo com IA está disponível para que o usuário possa fazer perguntas e esclarecer pontos do documento após a simplificação.
- **Histórico de Conversa:** O histórico de interações com a IA, incluindo documentos enviados e dúvidas esclarecidas, é armazenado e pode ser acessado futuramente.
- **Arquitetura Modular:** O projeto foi desenvolvido com uma arquitetura bem definida, separando a interface (frontend), a lógica de negócio (backend) e o banco de dados.

## Colaborando

Por favor, leia o [CONTRIBUTING.md](https://github.com/marcos-kaio/JuridIA/blob/main/CONTRIBUTING.md) para obter detalhes sobre o nossas regras de contribuição.

## Começando

Instruções para configurar e rodar o projeto em sua máquina local para fins de desenvolvimento e teste.

### Pré-Requisitos
1. Instale o Node.js:
- Clique no link [Node.js](https://nodejs.org/en/download/) (versão 14.x ou superior) ou utilize o `sudo`:
```bash
   sudo apt install nodejs
```
 2. Baixe o Git no link abaixo:
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Instalação
Passo a passo de como obter o programa em execução
1. Clonar o repositório e entrar no mesmo: 
```bash
   git clone https://github.com/marcos-kaio/JuridIA.git
   cd JuridIA
```
2. Instalar dependências:
```bash
   npm install
```
```bash
   npm run install:all
```
### Rodando
- Na raiz do projeto:
```bash
   npm run start
```
- O servidor estará rodando em `http://localhost:3000`.
- O acesso ao banco de dados remoto ocorre automaticamente.

## Executando os Testes

- Para rodar os testes siga as instruções abaixo:
```bash
   npm test
```
- Para rodar os testes com relatório de cobertura de código:
```bash
   npm run test:coverage
```


## Autores
Para suporte ou dúvidas, entre em contato com os membros da equipe:
- **Esdras Vinícius**: [link do github](https://github.com/esdrasvinicius3)
- **Janderson Freitas**: [link do github](https://github.com/JinzoFreitas)
- **Jean Lucas**: [link do github](https://github.com/JBDhh)
- **Marcos Kaiô**: [link do github](https://github.com/marcos-kaio)
- **Maria Eduarda Veloso**: [link do github](https://github.com/Duda-Veloso)
- **Maria Fernanda Amorim**: [link do github](https://github.com/MariaFFA)
- **Miguel Santos**: [link do github](https://github.com/miguelsndc)

Você também pode ver a lista de todos os [colaboradores](https://github.com/marcos-kaio/JuridIA/graphs/contributors) que participaram deste projeto.
