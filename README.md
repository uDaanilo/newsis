<h1 align="center">newsis</h1>

Este projeto foi desenvolvido seguindo os conceitos de arquitetura limpa (clean architecture)

## ⚠️ O projeto foi públicado em um servidor e pode ser acessado através de [http://168.138.224.105/docs](http://168.138.224.105/docs)

### ⭐ Tecnologias

- Docker
- Typescript
- Express
- Swagger
- MySql
- Jest

### 🧩 Pré-requisitos

- Node v18
- Docker opcional

### 📚 Documentação

- Após iniciar a aplicação é possivel acessar a documentação da aplicação através do link [http://localhost:3000/docs](http://localhost:3000/docs)

### ⚡ Iniciando


1. Clone o repositório
  ```sh
  git clone https://github.com/uDaanilo/newsis.git
  ```
2. <b>OPCIONAL:</b> Iniciando com docker
  ```sh
  # permitindo a execução do entrypoint
  chmod +x ./entrypoint.sh
  docker compose up
  ```
3. Instale os pacotes
  ```sh
  npm install
  ```
4. Renomeie o arquivo <kbd>[.env.example](.env.example)</kbd> para `.env` e preencha com suas informações
  ```sh
  mv .example.env .env
  ```
5. Execute as migrations
  ```sh
  npx prisma migrate dev
  ```
6. Inicie o projeto
  ```sh
  npm run dev
  ```

### 🧪 Executando os testes

- é possivel rodar os testes através dos seguintes comandos
  1. atualize as variáveis em  <kbd>[.env.test](.env.test)</kbd>
  2. Executando os testes
  ```sh
  # testes unitários
  npm run test

  # testes end to end
  npm run test:e2e
  ```