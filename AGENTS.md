# AGENTS.md

NestJS 10 (TypeScript) backend for the PDVSA project-portfolio management system.

## Commands

This repo uses **pnpm** (not npm). There is no `package-lock.json`; the lockfile is `pnpm-lock.yaml`.

- `pnpm install` — install dependencies.
- `pnpm start:dev` — watch mode dev server (entrypoint: `src/main.ts`).
- `pnpm build` — `nest build`; also the typecheck step (no separate `tsc`).
- `pnpm start:prod` — runs the compiled output at `node dist/main` (note: `dist/main.js`, not `dist/main.js` plus a subpath).
- `pnpm lint` — `eslint "{src,apps,libs,test}/**/*.ts" --fix`. Lint also **enforces Prettier formatting** (`prettier/prettier` is an error), so it fails on formatting issues that `--fix` cannot auto-correct. Run this before `build`.
- `pnpm test` — Jest unit tests. `rootDir` is `src`, so specs are `*.spec.ts` colocated with code.
- `pnpm test:e2e` — Jest e2e using `test/jest-e2e.json` (`*.e2e-spec.ts` in `test/`).

### pnpm build-script approval

pnpm blocks postinstall scripts by default. `pnpm-workspace.yaml` sets `allowBuilds` for `@nestjs/core` and `puppeteer` so `pnpm install` can run them. Puppeteer's script downloads Chromium; if your network blocks it, set `PUPPETEER_SKIP_DOWNLOAD=true` before installing (the `reports` PDF endpoints then need a Chromium provided via cache or `PUPPETEER_EXECUTABLE_PATH`).

## Architecture / conventions

- Global route prefix is `/api/v1` (`main.ts:13`). All controllers live under it. Swagger UI is mounted at a **different** path: `/api` (`main.ts:41`).
- A global `ValidationPipe` uses `whitelist` + `forbidNonWhitelisted` + `transform` (`main.ts:23`). Extra/undeclared properties in request bodies are **rejected**, so DTOs must whitelist every accepted field.
- Module layout is highly consistent: each feature folder has `*.controller.ts`, `*.service.ts`, `*.module.ts`, `dto/`, and `entities/`. Follow this pattern for new features.
- Database is **PostgreSQL via TypeORM** (`app.module.ts:32`). Connection params come from `process.env` (loaded by `ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })`).
  - Required env vars: `DATABASE_HOST`, `DATABASE_USER`, `DATABASE_PASSWORD`, `PORT` (optional, defaults to 3000). DB name is hardcoded to `gestionador` on port 5432.
  - **No migrations**: `synchronize: true` auto-generates the schema from entities on boot. Do not add a migration workflow.
  - `.env` is gitignored and there is no `.env.example`; these values must be supplied out-of-band.
- Static files are served from `files/`, `uploads/`, `public/` at `/files/`, `/uploads/`, `/public/` (`main.ts:14`). These directories are gitignored. The `reports` module uses **Puppeteer** to generate PDF exports, so those endpoints need a working Chromium.
- `tsconfig.json` intentionally disables `strictNullChecks` and `noImplicitAny`. Do not "fix" this by enabling strict mode; the codebase relies on lax typing.
- The root `dev` file is a stray captured dev-server log, not a runnable script. Ignore it.
