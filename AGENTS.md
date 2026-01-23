# CapyFlow Academy - AGENTS.md

## 🧠 Contexto do Projeto
**CapyFlow Academy** é uma plataforma de ensino gamificada focada em desenvolvimento de software. O projeto é dividido em um monorepo contendo `frontend` e `backend`.

## 🛠 Tech Stack

### Frontend (`/frontend`)
- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4, Framer Motion
- **Editor de Código:** @monaco-editor/react
- **Iconografia:** Lucide React
- **Autenticação:** Firebase Client SDK (integração com backend via tokens)
- **Gerenciamento de Estado:** React Hooks / Context API

### Backend (`/backend`)
- **Framework:** NestJS 11
- **Linguagem:** TypeScript
- **Banco de Dados:** PostgreSQL (Hospedado na Neon.tech)
- **ORM:** TypeORM
- **Autenticação:** 
  - `passport-jwt` para validação de tokens
  - `firebase-admin` para verificação de identidade
- **Testes:** Jest

## 📁 Estrutura de Diretórios Importantes

### Frontend
- `src/app`: Páginas e rotas (App Router).
  - `/arena`: Área de desafios de código.
  - `/login`, `/cadastro`: Fluxos de autenticação.
- `src/components`: Componentes reutilizáveis de UI.
- `src/hooks`: Custom hooks (ex: `useAuth`).
- `src/lib`: Configurações de serviços externos (Firebase, API clients).

### Backend
- `src/app.module.ts`: Módulo raiz.
- `src/auth`: Módulo de autenticação (Guards, Strategies, Controllers).
- `src/sessions`: Gerenciamento de sessões de treino/arena.
- `src/users`: (Se existir) Gerenciamento de dados de usuário.

## 📝 Padrões de Código
- **Commits:** Mensagens claras e objetivas.
- **Estilo:** Prettier e ESLint configurados.
- **Frontend:** 
  - Preferência por Server Components onde possível.
  - Client Components apenas quando interatividade é necessária (`'use client'`).
- **Backend:** 
  - Arquitetura em camadas: Controller -> Service -> Repository.
  - DTOs para validação de entrada.

## 🚀 Comandos Úteis

### Frontend
```bash
cd frontend
npm run dev    # Inicia servidor de desenvolvimento
npm run build  # Build de produção
```

### Backend
```bash
cd backend
npm run start:dev  # Inicia servidor com watch mode
npm run typeorm    # Comandos do TypeORM (se necessário via script)
```

## ⚠️ Notas Importantes
- O banco de dados usa SSL (`rejectUnauthorized: false`) para conexão com Neon.tech.
- A autenticação é híbrida (Firebase no front, validação JWT/Firebase no back).
