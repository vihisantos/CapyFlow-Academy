
# CapyFlow Academy

<p align="center">
  <strong>Domine o Codigo. Acelere sua evolucao.</strong>
  <br>
  Plataforma gamificada de ensino em desenvolvimento de software
  <br>
  com pratica deliberada, desafios interativos e progressao em niveis.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16">
  <img src="https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/NestJS%2011-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS 11">
  <img src="https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
</p>

---

## Sobre

**CapyFlow Academy** e uma plataforma de ensino gamificada focada em desenvolvimento de software. Atraves de desafios de codigo, sistema de XP e niveis, e uma arena interativa com editor Monaco, voce pratica codigo real enquanto avanca em sua jornada de aprendizado.

Diferente de cursos tradicionais, aqui voce **digita codigo de verdade** desde o primeiro desafio.

---

## Tech Stack

### Frontend

| Tecnologia | Proposito |
|---|---|
| **Next.js 16** (App Router) | Framework React com renderizacao estatica e roteamento |
| **React 19** | Biblioteca de interface |
| **TypeScript** | Tipagem estatica |
| **Tailwind CSS v4** | Estilizacao utilitaria |
| **Framer Motion** | Animacoes e transicoes |
| **@monaco-editor/react** | Editor de codigo (VS Code no browser) |
| **Lucide React** | Iconografia |
| **React Hook Form** | Gerenciamento de formularios |
| **Firebase Client SDK** | Autenticacao no frontend |
| **Geist Font** | Tipografia personalizada |

### Backend

| Tecnologia | Proposito |
|---|---|
| **NestJS 11** | Framework Node.js modular |
| **TypeScript** | Tipagem estatica |
| **TypeORM** | ORM para PostgreSQL |
| **PostgreSQL** (Neon.tech) | Banco de dados relacional |
| **Passport JWT** | Autenticacao via tokens |
| **Firebase Admin** | Verificacao de identidade |
| **bcrypt** | Hashing de senhas |
| **Jest** | Testes unitarios e e2e |

### Infraestrutura & Servicos

| Tecnologia | Proposito |
|---|---|
| **GitHub Pages** | Deploy estatico |
| **Firebase** | Autenticacao de usuarios |
| **Neon.tech** | Hospedagem PostgreSQL |
| **Mercado Pago** | Processamento de pagamentos |

---

## Funcionalidades Principais

- **Arena de Treino** — Editor Monaco ao vivo com snippets reais de JavaScript, TypeScript, Python e mais
- **Sistema de Gamificacao** — XP por precisao e velocidade, curva de niveis quadratica
- **Dashboard Interativo** — Estatisticas de progresso, historico de sessoes, graficos de desempenho
- **Loja de Temas** — Personalizacao visual com temas exclusivos
- **Multi-dificuldade** — Do basico ao avancado, com multiplicadores de XP
- **Leaderboard** — Competicao entre alunos (em breve)

---

## Estrutura do Projeto

```
CapyFlow Academy/
  src/
    app/               Rotas e paginas (App Router)
      arena/           Arena de desafios
      dashboard/       Painel do aluno
      login/           Autenticacao
      cadastro/        Registro
      resources/       Documentacao e blog
    components/        Componentes reutilizaveis
    contexts/          Contextos React (ThemeContext)
    hooks/             Custom hooks (useAuth)
    lib/               Servicos e utilitarios
      api.ts           Cliente HTTP
      firebase.ts      Configuracao Firebase
      gamification.ts  Motor de XP e niveis
      mercadopago.ts   Gateway de pagamento
      storage.ts       Persistencia local
  backend/
    src/
      auth/            Modulo de autenticacao
      sessions/        Gerenciamento de sessoes
      app.module.ts    Modulo raiz
      main.ts          Entry point
  public/              Assets estaticos
  package.json
```

---

## Arquitetura

```
[Cliente Next.js] ---- Firebase Auth ---- [Firebase]
       |
       | JWT Token
       v
[API NestJS] ---- TypeORM ---- [PostgreSQL (Neon.tech)]
       |
       | Firebase Admin
       v
   [Verificacao de Identidade]
```

A autenticacao e hibrida: o frontend utiliza o Firebase Client SDK para login, enquanto o backend valida os tokens via `passport-jwt` e `firebase-admin`.

---

<p align="center">
  <br>
  <sub>Desenvolvido por <a href="https://capybaraholding.com.br" target="_blank"><strong>Capybara Holding</strong></a></sub>
  <br>
  <sub>&copy; 2026 CapyFlow Academy. Todos os direitos reservados.</sub>
</p>
