<h1 align="center">newsis</h1>

Este projeto foi desenvolvido seguindo os conceitos de arquitetura limpa (clean architecture)

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
5. Inicie o projeto
  ```sh
  npm run dev
  ```

### 🧪 Executando os testes

- é possivel rodar os testes através dos seguintes comandos

  ```sh
  # testes unitários
  npm run test

  # testes end to end
  npm run test:e2e
  ```