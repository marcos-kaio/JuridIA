# Equipe 10 - JuridIA
<br>

## Regras de Contribuição

### Fluxo de Colaboração

Serão criadas branches das funcionalidades, em que será necessário fazer o pull-request para integrar na main. Para review dos pull-requests, membros externos à tarefa serão convidados para revisar o código.

### Convenções de nomes para Branches

Serão utilizados os seguintes nomes para as branches do projeto:

- feature: \<nome da feature\>
- bugfix: correção do \<nome do bug\>
- docs: \<nome do documento\> adicionado/alterado 

### Regras para revisar código

#### Correção
- O código faz o que se propõe a fazer?
- Casos extremos estão sendo tratados?
- Existem bugs ou comportamento indefinido?

#### Simplicidade
- O código é fácil de ler e entender?
- Os nomes de variáveis/funções são significativos?
- Comentários são usados onde necessário (sem excesso)?
- Existe algum código desnecessário ou engenharia excessiva?

#### Estilo
- Segue as convenções de codificação do projeto (indentação, espaçamento, nomenclatura)?
- A formatação e o uso de maiúsculas/minúsculas são consistentes?

#### Testabilidade
- Existem testes?
- Eles cobrem casos importantes?
- São legíveis e fáceis de manter?

#### Manutenibilidade
- O código é modular e reutilizável?
- Futuros desenvolvedores podem estendê-lo ou modificá-lo com facilidade?

#### Documentação
- APIs públicas, lógicas complexas e módulos estão documentados?
- O README/config foi atualizado, se necessário?


### Como configurar o projeto localmente

<!-- talvez tire esse v -->
- Ter o [git](http://git-scm.com/downloads) instalado.

- Baixar o [node aqui](https://nodejs.org/en) ou instalar com o `sudo`.

```bash
$ sudo apt install nodejs
``` 
- Clone o repositório.
- Entre no diretório do repositório
```bash
$ git clone https://github.com/marcos-kaio/JuridIA.git
$ cd JuridIA
``` 
- Instale as dependências do sistema com
```bash
$ npm install
``` 
```bash
$ npm run install:all
``` 
- Rode o projeto com

```bash
$ npm run start
```
- Abra no `localhost:3000`.


