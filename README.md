<p align="center">
  <img src="public/PDVSA-logo.png" width="220" alt="Logo PDVSA" />
</p>

<h1 align="center">Sistema de Gestión de Portafolio de Proyectos</h1>

<p align="center"><strong>Desarrollado para PDVSA ESEM</strong></p>

Backend de gestión de portafolio de proyectos desarrollado con **NestJS 10** (TypeScript) y **PostgreSQL** (TypeORM).


## Características

- API REST con prefijo global `/api/v1`.
- Autenticación JWT (`/api/v1/auth/login`).
- Roles: `rolTrabajador`, `rolLiderProyecto`, `rolGerente`, `rolAdministrador` (`src/users/enums/roles.enum.ts`).
- Gestión de proyectos, fases, tareas, trabajadores, equipos, gestiones, costos, seguimientos, áreas técnicas y datos adicionales.
- Generación de reportes en **PDF** (Puppeteer) para proyectos individuales y múltiples.
- Documentación Swagger en `/api`.

## Requisitos

- Node.js 18+ y npm.
- PostgreSQL accesible (base de datos `gestionador`, puerto `5432`).
- Chromium disponible para la generación de PDF (módulo `reports`).

## Variables de entorno

Crear un archivo `.env` en la raíz (no versionado) con:

```
DATABASE_HOST=localhost
DATABASE_USER=tu_usuario
DATABASE_PASSWORD=tu_contraseña
PORT=3000
```

La base de datos se llama `gestionador` y el esquema se genera automáticamente al iniciar (`synchronize: true` en `src/app.module.ts`), por lo que no hay migraciones.

## Instalación

Este proyecto usa **pnpm** (no npm). El lockfile es `pnpm-lock.yaml`.

```bash
pnpm install
```

> El script de `puppeteer` descarga Chromium. Si tu red lo bloquea, ejecuta
> `pnpm install` con `PUPPETEER_SKIP_DOWNLOAD=true`; los endpoints de PDF del
> módulo `reports` entonces requieren un Chromium disponible vía caché o
> `PUPPETEER_EXECUTABLE_PATH`.

## Ejecución

```bash
# desarrollo (modo watch)
pnpm start:dev

# producción (compila y corre dist/main.js)
pnpm build
pnpm start:prod
```

El servidor queda en `http://localhost:3000` y la documentación en `http://localhost:3000/api`.

## Pruebas

```bash
# unitarias (jest, specs colocados junto al código en src/)
pnpm test

# extremo a extremo (jest con test/jest-e2e.json)
pnpm test:e2e

# cobertura
pnpm test:cov
```

Las pruebas e2e levantan la aplicación completa, por lo que requieren una base de datos PostgreSQL activa.

## Calidad de código

```bash
# lint + formato Prettier (el lint falla si el formato no cumple)
pnpm lint

# formato directo con Prettier
pnpm format
```

## Estructura

Cada funcionalidad vive en su propia carpeta bajo `src/` con el patrón:
`*.controller.ts`, `*.service.ts`, `*.module.ts`, `dto/` y `entities/`.

Módulos principales: `auth`, `users`, `projects`, `projects-phase`, `tasks`, `workers`, `teams`, `managements`, `costs`, `trackings`, `technical-areas`, `type-projects`, `additional-data`, `phase-inputs`, `input-status`, `user-histories`, `status-task`, `reports`, `forums`, `messages`.

## Notas

- El `ValidationPipe` global usa `whitelist` + `forbidNonWhitelisted`: los cuerpos de petición solo aceptan los campos declarados en los DTO.
- `tsconfig.json` mantiene `strictNullChecks` y `noImplicitAny` desactivados a propósito.
