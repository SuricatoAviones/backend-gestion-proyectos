# Getting Started

## Requisitos

- **Node.js** 18+ y **pnpm** 8+ (el proyecto usa `pnpm`, no `npm`).
- **PostgreSQL** accesible (base de datos `gestionador`, puerto `5432`).
- **Chromium** disponible para los endpoints de PDF del módulo `reports` (Puppeteer).

## Variables de entorno

Crear un archivo `.env` en la raíz (no versionado). Ejemplo:

```dotenv
# Base de datos PostgreSQL
DATABASE_HOST=localhost
DATABASE_USER=tu_usuario
DATABASE_PASSWORD=tu_contraseña

# Servidor
PORT=3000

# JWT (opcional: si no se define se usa un secreto de fallback en jwt.constants.ts)
JWT_SECRET=un_secreto_largo_y_aleatorio
```

> La base de datos se llama `gestionador` y el puerto es `5432` (fijos en
> `src/app.module.ts`). El esquema se crea solo (`synchronize: true`).

## Instalación

```bash
pnpm install
```

Si la descarga de Chromium de Puppeteer se bloquea en tu red, instala con:

```bash
PUPPETEER_SKIP_DOWNLOAD=true pnpm install
```

y provee un Chromium vía caché o `PUPPETEER_EXECUTABLE_PATH`.

## Ejecución

```bash
# desarrollo (watch)
pnpm start:dev

# producción (compila y corre dist/main.js)
pnpm build
pnpm start:prod
```

El servidor queda en `http://localhost:3000` y la documentación Swagger en
`http://localhost:3000/api`. Todas las rutas de API quedan bajo `/api/v1`.

## Pruebas

```bash
pnpm test          # unitarias (jest, specs en src/)
pnpm test:e2e      # extremo a extremo (jest con test/jest-e2e.json)
pnpm test:cov      # cobertura
```

> `pnpm test:e2e` levanta la aplicación completa, por lo que requiere PostgreSQL activo.

## Calidad de código

```bash
pnpm lint          # eslint + Prettier (falla si el formato no cumple)
pnpm format        # Prettier directo
```
