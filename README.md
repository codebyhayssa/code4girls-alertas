# AccessPIM — Sistema de Controle de Acesso por Área

> Sistema web full stack para registro e monitoramento de acesso a áreas restritas do Polo Industrial de Manaus. Substitui controles manuais (papel, planilha) por um fluxo digital rastreável, com dashboard em tempo real e histórico consultável.

**Stack:** Angular 21 · Node.js 24 · Express · PostgreSQL · Tailwind CSS · JWT (HttpOnly Cookie) · SSE (Server-Sent Events)

---

## Sumário

- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Banco de Dados](#banco-de-dados)
- [Rodando o Projeto](#rodando-o-projeto)
- [Usuários de Teste](#usuários-de-teste)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Endpoints da API](#endpoints-da-api)
- [Perfis e Permissões](#perfis-e-permissões)

---

## Funcionalidades

### MVP (Trio)
- ✅ **Autenticação** com JWT armazenado em cookie HttpOnly
- ✅ **Dashboard em tempo real** com 4 indicadores e últimas atividades via SSE
- ✅ **CRUD de Colaboradores** com busca, filtro por setor, foto e importação via CSV
- ✅ **CRUD de Áreas** com níveis de risco (baixo / médio / alto / crítico) e capacidade máxima
- ✅ **Registro de Acesso** com verificação automática de autorização por cargo/colaborador
- ✅ **Histórico de Acessos** com filtros por período, área e colaborador + paginação
- ✅ **Exportação CSV** do histórico filtrado
- ✅ **Autorizações automáticas** por cargo ou por colaborador individual, com suporte a bloqueios explícitos
- ✅ **Gestão de Usuários** do sistema (admin, gestor, operador)
- ✅ **Controle de acesso por perfil** (roleGuard em todas as rotas sensíveis)
- ✅ **Tema claro/escuro** persistente
- ✅ **Eventos em tempo real** (SSE): dashboard e histórico atualizam automaticamente ao registrar um acesso

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) v20 ou superior
- [PostgreSQL](https://www.postgresql.org/) v15 ou superior
- [Angular CLI](https://angular.io/cli) v17 ou superior (`npm install -g @angular/cli`)
- (Opcional) [Docker](https://www.docker.com/) para subir o banco sem instalar PostgreSQL localmente

---

## Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/Controle_de_Acesso.git
cd Controle_de_Acesso
```

### 2. Instalar dependências do backend

```bash
cd backend
npm install
```

### 3. Instalar dependências do frontend

```bash
cd ../frontend
npm install
```

---

## Variáveis de Ambiente

Dentro da pasta `backend/`, crie um arquivo `.env` com base no exemplo abaixo:

```ini
PORT=3000
DATABASE_URL=postgresql://usuario:senha@localhost:5432/accesspim
JWT_SECRET=troque_por_uma_chave_secreta_longa_e_aleatoria
```

> ⚠️ **Nunca faça commit do arquivo `.env`.** Ele já está no `.gitignore`.

---

## Banco de Dados

### Opção A — Docker (recomendado)

```bash
# Na raiz do projeto
docker-compose up -d
```

O banco `accesspim` será criado automaticamente na porta `5432`.  
O pgAdmin estará disponível em `http://localhost:8080` (admin@admin.com / admin).

### Opção B — PostgreSQL local

Crie o banco manualmente e configure o `DATABASE_URL` no `.env`:

```bash
psql -U postgres -c "CREATE DATABASE accesspim;"
```

### Aplicar o schema e seed

```bash
# A partir da raiz do projeto
psql -d accesspim -f db/schema.sql
psql -d accesspim -f db/seed.sql
```

Ou, pelo script do Node:

```bash
cd backend
node reset_db.js
```

---

## Rodando o Projeto

### Backend

```bash
cd backend
npm run dev
# Servidor disponível em http://localhost:3000
```

### Frontend

```bash
cd frontend
ng serve
# Aplicação disponível em http://localhost:4200
```

---

## Usuários de Teste

Após executar o `seed.sql`, os seguintes usuários estarão disponíveis:

| Perfil    | E-mail                        | Senha      |
|-----------|-------------------------------|------------|
| Admin     | admin@accesspim.com.br        | access123  |
| Gestor    | gestor@accesspim.com.br       | access123  |
| Operador  | operador@accesspim.com.br     | access123  |

---

## Estrutura de Pastas

```
Controle_de_Acesso/
├── backend/
│   ├── controllers/        # Lógica de negócio por entidade
│   ├── middleware/         # authMiddleware (JWT) e roleMiddleware (perfil)
│   ├── routes/             # Definição das rotas Express
│   ├── services/           # eventBus (SSE broadcast)
│   ├── db.js               # Pool de conexão com PostgreSQL
│   └── server.js           # Entrada da aplicação
├── frontend/
│   └── src/app/
│       ├── components/     # Componentes Angular por feature
│       ├── guards/         # authGuard e roleGuard
│       ├── interceptors/   # Interceptor HTTP (JWT + tratamento de erros)
│       ├── models/         # Interfaces TypeScript
│       └── services/       # Serviços de comunicação com a API
├── db/
│   ├── schema.sql          # DDL: criação das tabelas e índices
│   └── seed.sql            # DML: dados iniciais para demonstração
└── docker-compose.yml      # PostgreSQL + pgAdmin via Docker
```

---

## Endpoints da API

Todos os endpoints abaixo (exceto `/api/auth/login`) exigem autenticação via cookie JWT.

### Autenticação
| Método | Rota                          | Descrição                         |
|--------|-------------------------------|-----------------------------------|
| POST   | `/api/auth/login`             | Login — retorna cookie JWT        |
| GET    | `/api/auth/me`                | Retorna usuário da sessão ativa   |
| POST   | `/api/auth/logout`            | Invalida a sessão                 |
| PATCH  | `/api/auth/change-password`   | Altera senha do usuário logado    |

### Dashboard
| Método | Rota             | Descrição                                  |
|--------|------------------|--------------------------------------------|
| GET    | `/api/dashboard` | Retorna os 4 KPIs e os últimos 5 registros |

### Colaboradores
| Método | Rota                                  | Perfil    |
|--------|---------------------------------------|-----------|
| GET    | `/api/colaboradores`                  | Todos     |
| GET    | `/api/colaboradores/:id`              | Todos     |
| POST   | `/api/colaboradores`                  | Admin     |
| PUT    | `/api/colaboradores/:id`              | Admin     |
| PATCH  | `/api/colaboradores/:id/status`       | Admin     |
| POST   | `/api/colaboradores/import/analisar`  | Admin     |
| POST   | `/api/colaboradores/import/confirmar` | Admin     |

### Áreas
| Método | Rota                         | Perfil |
|--------|------------------------------|--------|
| GET    | `/api/areas`                 | Todos  |
| GET    | `/api/areas/:id`             | Todos  |
| POST   | `/api/areas`                 | Admin  |
| PUT    | `/api/areas/:id`             | Admin  |
| PATCH  | `/api/areas/:id/status`      | Admin  |

### Registros de Acesso
| Método | Rota                    | Descrição                      |
|--------|-------------------------|--------------------------------|
| GET    | `/api/registros`        | Histórico paginado com filtros |
| POST   | `/api/registros`        | Registrar entrada ou saída     |
| GET    | `/api/registros/export` | Exportar histórico em CSV      |

### Autorizações
| Método | Rota                           | Perfil      |
|--------|--------------------------------|-------------|
| GET    | `/api/autorizacoes`            | Admin       |
| POST   | `/api/autorizacoes`            | Admin       |
| PATCH  | `/api/autorizacoes/:id/status` | Admin       |
| GET    | `/api/autorizacoes/validar`    | Operador/Admin |

### Eventos (SSE)
| Método | Rota          | Descrição                                    |
|--------|---------------|----------------------------------------------|
| GET    | `/api/events` | Stream de eventos em tempo real (SSE)        |

---

## Perfis e Permissões

| Funcionalidade           | Admin | Gestor | Operador |
|--------------------------|:-----:|:------:|:--------:|
| Dashboard                | ✅    | ✅     | ❌       |
| Ver Colaboradores        | ✅    | ✅     | ✅       |
| Criar/Editar Colaborador | ✅    | ❌     | ❌       |
| Ver Áreas                | ✅    | ✅     | ✅       |
| Criar/Editar Área        | ✅    | ❌     | ❌       |
| Registrar Acesso         | ✅    | ❌     | ✅       |
| Ver Histórico            | ✅    | ✅     | ✅*      |
| Exportar CSV             | ✅    | ✅     | ❌       |
| Gerenciar Autorizações   | ✅    | ❌     | ❌       |
| Gerenciar Usuários       | ✅    | ❌     | ❌       |

> \* Operadores visualizam apenas os registros feitos por eles mesmos.

---

## Licença

Projeto desenvolvido para fins acadêmicos no programa de capacitação Full Stack do **INDT** — Instituto Nokia de Tecnologia, Manaus/AM.
