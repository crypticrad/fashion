# Fashion

A fashion storefront monorepo: a NestJS API, a React web app, and a shared package of Zod schemas used by both.

```
apps/
  api/        NestJS API (Prisma 8 + PostgreSQL)      → http://localhost:3000/api
  web/        React + Vite storefront                 → http://localhost:5173
packages/
  shared/     Zod schemas + types for request/response bodies (@fashion/shared)
seed/         CSV data loaded by the API's seed script
```

## How the project is put together

### Monorepo tooling

**pnpm** is the package manager. It replaces npm or yarn: you run `pnpm install` and `pnpm add <pkg>`. Instead of copying every dependency into each `node_modules`, pnpm keeps one copy of each package version in a global store and links to it, which makes installs fast and disk-efficient. It's also strict: a package can only import dependencies listed in its own `package.json`.

**pnpm workspaces** let one repository hold several packages that depend on each other. [`pnpm-workspace.yaml`](pnpm-workspace.yaml) declares `apps/*` and `packages/*` as workspace packages. When the API declares `"@fashion/shared": "workspace:*"`, pnpm links the local `packages/shared` folder into it rather than downloading anything from npm. Use `--filter` to run a command in a single package:

```bash
pnpm --filter @fashion/api add some-package    # add a dependency to the API only
pnpm --filter @fashion/web dev                 # run the web app's dev script
```

**Turborepo** (`turbo`) runs tasks such as `build`, `dev` and `lint` across all the packages in the right order. [`turbo.json`](turbo.json) says, for example, that `build` depends on `^build`, so a package's dependencies are built first: `packages/shared` is compiled before the API that imports it. Turborepo also caches task results, so running `pnpm build` again with no changes finishes almost instantly. The root `pnpm dev` and `pnpm build` scripts are thin wrappers around `turbo run ...`.

### The packages

| Package | Stack |
|---|---|
| `apps/api` (`@fashion/api`) | **NestJS** (Node.js framework with modules, dependency injection and guards), **Prisma 8** (database layer for PostgreSQL), **nestjs-zod** (validates requests and responses with Zod schemas), **@nestjs/swagger** (generates the OpenAPI docs), **@nestjs/jwt** + **argon2** (authentication) |
| `apps/web` (`@fashion/web`) | **React 19**, **Vite** (dev server and bundler), **React Router**, **Ant Design** + **Tailwind CSS** + **Sass** (UI and styling), **Motion** (animation) |
| `packages/shared` (`@fashion/shared`) | **Zod** schemas describing every request and response body |

### How the pieces connect

- **`packages/shared` is the API contract.** Each endpoint's request and response shapes are written once there as Zod schemas.
  - The API wraps them in DTO classes (`createZodDto`), which validate incoming requests, check outgoing responses and generate the Swagger docs.
  - The web app imports the exported TypeScript types, so frontend code is type-checked against the same shapes the API sends.
- **Prisma 8 is contract-first.** You describe the database in [`contract.prisma`](apps/api/src/prisma/contract.prisma). `contract:emit` generates the typed query client's types (`contract.json`, `contract.d.ts`), and `db:update` or reviewed migrations change the database to match.
- **Every API route lives under `/api`**, for example `GET /api/brands`, so a single path prefix can be proxied or routed in production.

### Other tools

| Tool | Used for |
|---|---|
| **TypeScript** | All code, compiled with `tsc` (shared), `nest build` (API) and Vite (web) |
| **oxlint** | Linting. It's a fast, Rust-based ESLint alternative. Config: `apps/*/oxlint.json` / `.oxlintrc.json` |
| **Prettier** | Code formatting |
| **Vitest** | Unit and end-to-end tests for the API |

## Prerequisites

- **Node.js 22+**
- **pnpm 12.18**: the version is pinned in `package.json` (`packageManager`). Install it globally:

  ```bash
  npm install -g pnpm@12.18.0
  # or, on macOS:
  brew install pnpm
  ```

  Check it with `pnpm --version`.
- **PostgreSQL 15+**

## 1. Install dependencies

```bash
pnpm install
```

## 2. Set up PostgreSQL

Use any PostgreSQL 15+ server. Two common options:

**Docker**

```bash
docker run -d --name fashion-db \
  -e POSTGRES_USER=fashion \
  -e POSTGRES_PASSWORD=fashion \
  -e POSTGRES_DB=fashion \
  -p 5432:5432 \
  postgres:17
```

Connection string: `postgresql://fashion:fashion@localhost:5432/fashion`

**Homebrew (macOS)**

```bash
brew install postgresql@17
brew services start postgresql@17
createdb fashion
```

Connection string: `postgresql://<your-mac-username>@localhost:5432/fashion`

## 3. Configure environment variables

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

Then edit `apps/api/.env`:

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | yes | PostgreSQL connection string from step 2 |
| `JWT_SECRET` | yes | Secret used to sign access tokens. Generate one with `openssl rand -base64 32` |
| `PORT` | no | API port, default `3000` |
| `CORS_ORIGIN` | no | Comma-separated allowed origins, default `http://localhost:5173` |

`apps/web/.env` only needs `VITE_BRAND`, the brand name shown in the UI.

Never commit `.env` files; they are gitignored.

## 4. Create the database schema

The database schema is defined in [`apps/api/src/prisma/contract.prisma`](apps/api/src/prisma/contract.prisma) (Prisma 8). From the repo root:

```bash
pnpm --filter @fashion/api contract:emit   # generate contract.json / contract.d.ts from contract.prisma
pnpm --filter @fashion/api db:update       # create or update the tables to match the contract
pnpm --filter @fashion/api db:seed         # load brands and products from seed/*.csv (safe to re-run)
```

## 5. Run the app

```bash
pnpm dev          # API + web + shared package, all in watch mode
pnpm dev:api      # API only
pnpm dev:web      # web only
```

Turborepo builds `packages/shared` before starting the apps.

| What | URL |
|---|---|
| API | http://localhost:3000/api |
| Swagger UI | http://localhost:3000/api/docs |
| OpenAPI JSON | http://localhost:3000/api/docs-json |
| Web app | http://localhost:5173 |

> **Editing `packages/shared`?** `pnpm dev:api` builds the shared package only once, at startup. To rebuild it on every change, use `pnpm dev`, which also runs the shared package's watcher, or run `pnpm turbo run dev --filter=@fashion/api...` to include the API's dependencies.

## Database workflow

When you change `contract.prisma`:

```bash
pnpm --filter @fashion/api contract:emit   # regenerate the contract types
pnpm --filter @fashion/api db:update       # apply the change to your local database
```

Other useful commands:

| Command | What it does |
|---|---|
| `pnpm --filter @fashion/api db:schema` | Show the live database schema |
| `pnpm --filter @fashion/api db:verify` | Check that the database matches the contract |

`db:update` changes your local database directly. Production databases should change only through reviewed migrations, which live in `apps/api/migrations/`.

## Other scripts

Run these from the repo root:

| Command | What it does |
|---|---|
| `pnpm build` | Build every package (Turborepo, cached) |
| `pnpm start:api` | Run the built API (`apps/api/dist`) |
| `pnpm lint` | Lint all packages (oxlint) |
| `pnpm test` | Unit tests (Vitest) |
| `pnpm test:e2e` | API end-to-end tests |
| `pnpm format` | Format all packages (Prettier) |

## Troubleshooting

- **The editor shows outdated types from `@fashion/shared`.** The apps read the shared package's built `dist/`. Rebuild it with `pnpm --filter @fashion/shared build`, or keep `pnpm dev` running. If the editor still shows old types, run **TypeScript: Restart TS Server**.
- **The API exits on startup with a Zod error from `packages/shared/dist`.** A schema in `packages/shared/src` is invalid at runtime. TypeScript still emits `dist/` when it finds type errors, so run `pnpm --filter @fashion/shared build` and fix any errors it reports.
- **`db:update` fails with `MIGRATION.SCHEMA_VERIFY_FAILED`.** The contract asks for something PostgreSQL won't store as written, for example `@default(null)` on a nullable field. Adjust `contract.prisma`, then run `contract:emit` and `db:update` again. Don't reset or drop the database to get past it.
