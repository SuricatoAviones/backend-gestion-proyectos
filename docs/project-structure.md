# Estructura del Proyecto

## Árbol de carpetas (raíz)

```
backend-gestion-proyectos/
├── docs/                     # Documentación (esta carpeta)
├── public/                   # Logo PDVSA y estáticos servidos en /public
├── src/                      # Código fuente de la aplicación
├── test/                     # Pruebas e2e (jest-e2e.json, *.e2e-spec.ts)
├── .agents/                  # Skills/herramientas de agente (no es código de app)
├── AGENTS.md                 # Guía para agentes de código
├── README.md                 # README principal del proyecto
├── package.json              # Scripts y dependencias (pnpm)
├── pnpm-lock.yaml            # Lockfile de pnpm
├── pnpm-workspace.yaml       # Config de pnpm (allowBuilds para @nestjs/core, puppeteer)
├── tsconfig.json             # TypeScript (strict desactivado a propósito)
├── .eslintrc.js              # ESLint + Prettier
├── .prettierrc               # singleQuote, trailingComma
└── nest-cli.json             # Config de Nest CLI (plugin swagger)
```

## Dentro de `src/`

```
src/
├── main.ts                   # Bootstrap: prefijo, filtros, guards, pipes, Swagger, CORS
├── app.module.ts             # Módulo raíz: importa todos los módulos + APP_GUARD
├── common/                   # Infraestructura transversal
│   ├── filters/
│   │   └── all-exceptions.filter.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   └── decorators/
│       └── public.decorator.ts
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   ├── constants/jwt.constants.ts
│   └── dto/ (login.dto, register.dto)
├── users/
│   ├── users.controller.ts / .service.ts / .module.ts
│   ├── dto/ (create/update/response)
│   ├── entities/user.entity.ts
│   └── enums/roles.enum.ts
├── projects/  tasks/  workers/  teams/  managements/  costs/
├── trackings/  technical-areas/  type-projects/  additional-data/
├── phase-inputs/  input-status/  user-histories/  status-task/
├── projects-phase/  reports/  forums/  messages/  database/
│   └── cada uno: *.controller.ts, *.service.ts, *.module.ts,
│       dto/, entities/
```

## Convenciones

- Cada dominio es un **módulo independiente** con su `controller`, `service`, `module`,
  `dto/` y `entities/` (arquitectura por característica, no por capa técnica).
- Los servicios usan `Repository<T>` o `EntityManager` (dentro de transacciones) para el
  acceso a datos; no acceden a la DB desde los controladores.
- DTOs de **entrada** validados con `class-validator`; DTOs de **salida** (`response-*`)
  mapean explícitamente qué se expone.
- `src/common` aloja solo lo transversal: filtros, guards y decoradores.

## Archivos de configuración relevantes

- `tsconfig.json`: `strictNullChecks` y `noImplicitAny` en `false` (tipado laxo intencional).
- `.eslintrc.js`: `prettier/prettier` como error + reglas de `@typescript-eslint/recommended`.
- `nest-cli.json`: plugin `@nestjs/swagger` para generar el documento OpenAPI.
