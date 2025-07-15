# 🐮 IATFProtocolManager - API 

Este projeto é a API para o sistema IATFProtocolManager, desenvolvido como parte da disciplina de Programação para a Web do curso de Ciência da Computação do [IFSul Campus Passo Fundo](https://inf.passofundo.ifsul.edu.br/cursos/ciencia-da-computacao-matriz-2023/sobre-o-curso).

## ✨ Sobre a API

A **IATFProtocolManager API** é o coração do sistema de gerenciamento de protocolos de Inseminação Artificial em Tempo Fixo (IATF). Ela é responsável por:

* Gerenciar dados de animais.
* Controlar os protocolos de inseminação.
* Autenticar e autorizar usuários para acesso seguro aos recursos.
* Garantir a integridade e persistência dos dados.

## 🛠️ Tecnologias Utilizadas

A API foi construída com foco em performance e organização, utilizando tecnologias robustas e amplamente reconhecidas no ecossistema Node.js:

* **Node.js**: Ambiente de execução JavaScript assíncrono e orientado a eventos.
* **Express**: Framework web minimalista e flexível para APIs.
* **PostgreSQL**: Banco de dados relacional robusto e de código aberto para armazenamento de dados.
* **JWT (JSON Web Tokens)**: Para autenticação e autorização seguras de usuários.
* **Bcryptjs**: Para hash seguro de senhas.
* **CORS**: Gerenciamento de Cross-Origin Resource Sharing.
* **Dotenv**: Para gerenciar variáveis de ambiente de forma segura.

## 📁 Estrutura de Pastas

A arquitetura da API é modular e organizada, facilitando a manutenção e escalabilidade. A estrutura principal é a seguinte:

    src/
    ├── controllers/
    │   ├── animalController.js
    │   ├── authController.js
    │   ├── protocolController.js
    │   └── userController.js
    ├── entities/
    │   ├── Animal.js
    │   └── Protocol.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── routes/
    │   └── index.js
    ├── usecases/
    │   ├── animalUseCases.js
    │   ├── protocolUseCases.js
    │   └── userUseCases.js
    ├── db.js
    └── server.js
    .env
    .gitignore

## 🚀 Como Executar Localmente

Para rodar a API em seu ambiente local, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/IgorVinoski/IATFProtocolManager-api](https://github.com/IgorVinoski/IATFProtocolManager-api) # Substitua pelo link correto do seu repositório backend
    cd IATFProtocolManager-api
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias (ex: `DATABASE_URL`, `JWT_SECRET`, etc.). Exemplo:
    ```
    PORT=3000
    DATABASE_URL=postgres://user:password@host:port/database
    JWT_SECRET=sua_chave_secreta_jwt
    ```
4.  **Inicie a API:**
    * **Modo de Desenvolvimento (com `nodemon` para auto-reload):**
        ```bash
        npm run dev
        ```

    A API estará rodando na porta especificada no seu arquivo `.env` (padrão: 3000).

## 🔷 Rotas da API

As rotas da API são projetadas para fornecer acesso seguro e funcional às operações de gerenciamento.
A maioria das rotas requer **autenticação** (`protect`) e algumas exigem **autorização de papel** (`authorizeRoles`) para `Veterinário` ou `Técnico`.

### Rotas de Autenticação e Usuário:

* **`POST /api/auth/register`**
    * **Descrição:** Registra um novo usuário no sistema.
    * **Acesso:** Pública.
* **`POST /api/auth/login`**
    * **Descrição:** Autentica um usuário e retorna um token JWT para acesso futuro.
    * **Acesso:** Pública.
* **`GET /api/users/profile`**
    * **Descrição:** Obtém o perfil do usuário autenticado.
    * **Acesso:** Autenticado (`protect`).
* **`PUT /api/users/profile`**
    * **Descrição:** Atualiza as informações do perfil do usuário autenticado.
    * **Acesso:** Autenticado (`protect`).

### Rotas de Animais:

* **`GET /api/animals`**
    * **Descrição:** Lista todos os animais registrados.
    * **Acesso:** Autenticado (`protect`).
* **`POST /api/animals`**
    * **Descrição:** Adiciona um novo animal.
    * **Acesso:** Autenticado (`protect`), Papel: `Veterinário` ou `Técnico`.
* **`PUT /api/animals/:id`**
    * **Descrição:** Atualiza as informações de um animal específico pelo ID.
    * **Acesso:** Autenticado (`protect`), Papel: `Veterinário` ou `Técnico`.
* **`DELETE /api/animals/:id`**
    * **Descrição:** Remove um animal específico pelo ID.
    * **Acesso:** Autenticado (`protect`), Papel: `Veterinário`.
* **`GET /api/animals/stats`**
    * **Descrição:** Retorna estatísticas relacionadas aos animais.
    * **Acesso:** Autenticado (`protect`).

### Rotas de Protocolos:

* **`GET /api/protocols`**
    * **Descrição:** Lista todos os protocolos de IATF.
    * **Acesso:** Autenticado (`protect`).
* **`POST /api/protocols`**
    * **Descrição:** Cria um novo protocolo de IATF.
    * **Acesso:** Autenticado (`protect`), Papel: `Veterinário` ou `Técnico`.
* **`PUT /api/protocols/:id`**
    * **Descrição:** Atualiza as informações de um protocolo específico pelo ID.
    * **Acesso:** Autenticado (`protect`), Papel: `Veterinário` ou `Técnico`.
* **`DELETE /api/protocols/:id`**
    * **Descrição:** Remove um protocolo específico pelo ID.
    * **Acesso:** Autenticado (`protect`), Papel: `Veterinário`.
* **`GET /api/protocols/stats`**
    * **Descrição:** Retorna estatísticas relacionadas aos protocolos.
    * **Acesso:** Autenticado (`protect`).

## ☁️ Deploy

A IATFProtocolManager API foi hospedada na Render.

