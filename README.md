# employee-dashboard

<h1 align="center" style="font-family: 'Montserrat', sans-serif; font-size: 72px; color: #3498DB;">
  Employee Dashboard
</h1>

<p align="center">
  <a href="#ℹ-descrição">Descrição</a> •
  <a href="#-como-usar">Como Usar</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-testes">Testes</a>
</p>

## ℹ Descrição

> Esta aplicação full-stack consiste em um dashboard administrativo para gerenciar uma lista de funcionários. A aplicação foi construída usando **React**, **Next.js**, **Chakra UI**, **Node.js**, **Express.js** e **MongoDB**.

A aplicação permite:
- Criar, ler, atualizar e excluir registros de funcionários.
- Ordenar e buscar funcionários na lista.

## 🖥 Como Usar

### Pré-requisitos

- Node.js v20 ou superior
- Yarn ou npm
- MongoDB Atlas URI ou Docker Compose para MongoDB (recomenda-se deixar o docker aberto antes de rodar o script)

### Clonagem do projeto

1. Clone o repositório e acesse a pasta raiz:
    ```bash
     git clone https://github.com/andrevks/employee-dashboard.git
     # ou git clone git@github.com:andrevks/employee-dashboard.git
     cd employee-dashboard
    ```

### Configuração Automática

1. Dê permissão para executar o script:
    ```bash
     chmod +x setup.sh
    ```

2. Execute o script de configuração:
    ```bash
     ./setup.sh
    ```

3. Aguarde rodar os commandos e se não tiver nenhum erro, acesse a aplicação:
    ```bash
      http://localhost:3000
    ```

### Configuração Manual

Caso o script de configuração automática falhe, siga os passos abaixo:

### Backend

1. Instale as dependências:

    ```bash
     # caso ainda não tenha instalado faça um git clone antes: git clone https://github.com/andrevks/employee-dashboard.git 
     cd employee-dashboard/api
     yarn install
     # ou npm install
    ```

2. Configure o arquivo `.env`:
    ```bash
     cp .env.example .env
    # Edite o arquivo .env e adicione a URI para o banco caso tenha problemas
    ```

3. Para rodar os testes end-to-end:
    ```bash
     yarn test
    # ou npm run test
    ```

4. Execute a aplicação:
    ```bash
     yarn dev
    # ou npm run dev
    ```

### Frontend

1. Em outro terminal, acesse a pasta `frontend`:
    ```bash
     cd ../frontend
    ```

2. Instale as dependências:
    ```bash
     yarn install
    # ou npm install
    ```

3. Configure o arquivo `.env`:
    ```bash
     cp .env.example .env
    # Certifique-se de que o URL do backend está correto 
    ```

4. Execute a aplicação:
    ```bash
     yarn dev
    # ou npm run dev
    ```

5. Aguarde rodar os commandos e se não tiver nenhum erro, acesse a aplicação:
    ```bash
      http://localhost:3000
    ```

### Executando com Docker Compose

Caso encontre problemas para configurar o MongoDB, você pode usar Docker Compose:

1. Instale o Docker e o Docker Compose.
2. Atualize o arquivo `.env` do backend com a URI do MongoDB:
    ```env
    MONGO_URI=mongodb://root:example@localhost:27017
    ```
3. Execute o Docker Compose:
    ```bash
     docker-compose up -d
    ```

    
## 🛠 Tecnologias

### Backend:
- [**Node.js**](https://nodejs.org/)
- [**Express.js**](https://expressjs.com/)
- [**Mongoose**](https://mongoosejs.com/)
- [**Zod**](https://zod.dev/)

### Frontend:
- [**React**](https://reactjs.org/)
- [**Next.js**](https://nextjs.org/)
- [**Chakra UI**](https://chakra-ui.com/)

### Testes:
- [**Vitest**](https://vitest.dev/)
- [**Supertest**](https://github.com/visionmedia/supertest)

## 🧪 Testes

Para rodar os testes end-to-end no backend:
```bash
 cd api
 yarn test
# ou
 npm run test
```

<p align="center">Feito com 💜 por <a href="https://github.com/andrevks">André Geraldo</a></p>