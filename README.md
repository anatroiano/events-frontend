# 📅 Event Platform — Frontend

Interface web da Event Platform, desenvolvida em React e integrada às APIs REST da aplicação.

Permite descobrir eventos, realizar inscrições, confirmar presença e acessar certificados.

---

## ✨ Funcionalidades

- Listagem paginada de eventos
- Filtro de próximos eventos
- Criação e visualização de eventos
- Inscrição de participantes
- Confirmação de presença por link de check-in
- Consulta e download de certificados em PDF

---

## 🛠️ Tecnologias utilizadas

- **Interface:** React 19, TypeScript 6 e Tailwind CSS 4
- **Navegação e dados:** React Router e TanStack Query
- **Formulários e validação:** React Hook Form e Zod
- **Build:** Vite 8
- **Infraestrutura:** Docker, Docker Compose e Nginx

---

## 🐳 Como executar

### Pré-requisitos

- Docker
- Docker Compose
- Backend em execução com a rede `event-network` disponível

### Configuração

Copie o arquivo de exemplo para `.env` na raiz do projeto e ajuste os valores, se necessário:

```bash
cp .env.example .env
``` 

### Execução

Para executar a aplicação:

```bash
docker compose up --build
```

> Use `--build` na primeira execução e sempre que alterar o código-fonte, o `Dockerfile` ou o `nginx.conf`. Nas demais,
> utilize:

```bash
docker compose up
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

### Ambiente de desenvolvimento

Para executar o ambiente de desenvolvimento:

```bash
docker compose -f docker-compose.dev.yml up
```

> Esse modo usa uma imagem Node, instala as dependências com `npm ci` e executa o Vite sem gerar o build. O código local
> fica montado no container para atualização automática, com `node_modules` em um volume separado. Após alterar as
> dependências, reinicie o serviço para reinstalá-las.

A aplicação estará disponível em:

```text
http://localhost:5173
```

---

## 🔗 Backend

O frontend consome as APIs REST do backend, desenvolvido em Java com Spring Boot e organizado em uma arquitetura de
microsserviços para gerenciar eventos, inscrições, check-in e certificados.

Repositório: [Event Platform — Backend](https://github.com/anatroiano/event-platform)

---

## 👩‍💻 Autora

Ana Carolina Troiano
