# Arquitectura

## Visión general

El sistema es una API REST construida con **NestJS 10** (TypeScript) sobre **TypeORM** y
**PostgreSQL**. Sigue el patrón modular de NestJS: cada dominio del negocio es un
*módulo* compuesto por `controller`, `service`, `module`, `dto/` y `entities/`.

```
Cliente HTTP
   │
   ▼
[NestFactory → bootstrap (src/main.ts)]
   ├─ GlobalPrefix: /api/v1
   ├─ Global Exception Filter  (AllExceptionsFilter)
   ├─ Global Guard            (JwtAuthGuard, vía APP_GUARD)
   ├─ Global ValidationPipe   (whitelist + forbidNonWhitelisted + transform)
   ├─ Static assets           (/files, /uploads, /public)
   └─ Swagger                 (/api)
   │
   ▼
Controllers (@Controller('ruta'))  ← validación de entrada con DTOs
   │  llaman a
   ▼
Services (@Injectable)             ← lógica de negocio + acceso a datos
   │  usan
   ▼
Repositories / EntityManager (TypeORM)  ← PostgreSQL (DB `gestionador`)
```

## Capas y responsabilidades

- **Controllers** (`*.controller.ts`): reciben la petición HTTP, aplican los DTOs de
  entrada mediante `@Body()`/`@Param()` y delegan al servicio. No contienen lógica de
  negocio. Se marcan con `@ApiTags` y `@ApiBearerAuth()` para Swagger.
- **Services** (`*.service.ts`): contienen la lógica. Acceden a la base de datos a través
  de `Repository<T>` o `EntityManager` (dentro de transacciones). Lanzan excepciones HTTP
  de NestJS (`NotFoundException`, `BadRequestException`) cuando corresponde.
- **Entities** (`entities/*.entity.ts`): clases decoradas con `@Entity()` que mapean las
  tablas de PostgreSQL y sus relaciones.
- **DTOs** (`dto/*.dto.ts`): objetos de transferencia. Los `*create-*` / `*update-*` definen
  la **entrada** (validada por `class-validator`); los `response-*` definen la **salida**
  (mapeo explícito en el constructor para no filtrar datos sensibles).

## Decisiones técnicas clave

### Tipo de datos y validación
- `ValidationPipe` global con `whitelist: true` y `forbidNonWhitelisted: true`. Cualquier
  propiedad no declarada en el DTO de entrada es **rechazada** (400). Esto obliga a que los
  DTOs listan explícitamente cada campo aceptado.
- `transform: true` + `enableImplicitConversion` para convertir tipos (p. ej. `:id` de ruta
  a número) automáticamente.

### Manejo de errores (Error Handling)
- Filtro global `AllExceptionsFilter` (`src/common/filters/all-exceptions.filter.ts`):
  - Captura **toda** excepción (HTTP y no HTTP).
  - Respuesta uniforme: `{ statusCode, message, timestamp, path }`.
  - Errores 5xx → `logger.error` con stack; el resto → `logger.warn`.
- Los servicios **no** capturan en bloque con `try/catch` para re-lanzar como
  `BadRequestException`; dejan que las excepciones se propaguen al filtro. Las excepciones
  específicas (`NotFoundException` → 404, `BadRequestException` → 400) se lanzan
  directamente donde aplica.

### Autenticación y autorización (Security)
- Estrategia **JWT** real mediante `@nestjs/passport` + `passport-jwt`
  (`src/auth/jwt.strategy.ts`). El secreto se lee de `JWT_SECRET` (env) con fallback.
- Guard global `JwtAuthGuard` (`APP_GUARD`) que protege **todas** las rutas. Las rutas
  `auth/login` y `auth/register` se marcan con `@Public()` para quedar abiertas.
- Roles definidos en `src/users/enums/roles.enum.ts`
  (`rolTrabajador`, `rolLiderProyecto`, `rolGerente`, `rolAdministrador`). *Nota:* el JWT
  incluye el rol en el payload, pero aún no existe un `RolesGuard` que lo enforce; ver
  [authentication.md](./authentication.md#pendientes).

### Acceso a datos (Database & ORM)
- `synchronize: true` en TypeORM: el esquema se genera automáticamente desde las entidades
  al arrancar. **No hay migraciones**; no agregar flujo de migraciones.
- Las escrituras compuestas (crear/actualizar/eliminar) se ejecutan dentro de
  **transacciones** (`DataSource.transaction` + `EntityManager`) para garantizar atomicidad.
- Las lecturas con relaciones usan `QueryBuilder.leftJoinAndSelect` en lugar del objeto
  `relations`, reduciendo los viajes a la base de datos (evita la carga N+1 de relaciones).

### Configuración (DevOps)
- `ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })` carga las variables de
  entorno. El secreto JWT y la config de DB provienen de env.
- `enableShutdownHooks()` para apagado graceful.
- CORS habilitado (`enableCors()`).

### Reportes (Reports)
- El módulo `reports` usa **Puppeteer** para generar PDF (A3) de un proyecto o varios.
  Requiere un **Chromium** disponible en el entorno (o `PUPPETEER_EXECUTABLE_PATH`).

## Módulos del dominio

`auth`, `users`, `projects`, `projects-phase`, `tasks`, `workers`, `teams`, `managements`,
`costs`, `trackings`, `technical-areas`, `type-projects`, `additional-data`,
`phase-inputs`, `input-status`, `user-histories`, `status-task`, `reports`, `forums`,
`messages`, `database`.

Cada uno sigue el mismo patrón CRUD salvo excepciones documentadas en
[api.md](./api.md).
