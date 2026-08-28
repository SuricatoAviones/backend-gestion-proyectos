# API Reference

Todas las rutas cuelgan de `/api/v1`. La documentación interactiva (Swagger) está en
`/api`. Toda ruta requiere `Authorization: Bearer <token>` excepto las marcadas como
públicas.

## Leyenda

- 🔓 = ruta pública (`@Public()`)
- CRUD estándar = `POST /` (crear), `GET /` (listar), `GET /:id` (uno),
  `PATCH /:id` (actualizar), `DELETE /:id` (eliminar).

---

## Auth — `/api/v1/auth`

| Método | Ruta | Auth | Cuerpo | Respuesta |
|--------|------|------|--------|-----------|
| POST | `/api/v1/auth/login` 🔓 | — | `{ in_usuario: string, password: string }` | `{ token: string, payload: {...} }` |
| POST | `/api/v1/auth/register` 🔓 | — | `multipart/form-data`: `in_usuario`, `in_nombre`, `in_apellido`, `in_correo`, `in_role`, `password`, `foto` (archivo) | `ResponseUserDto` |

## Users — `/api/v1/users`

| Método | Ruta | Desc. |
|--------|------|-------|
| GET | `/api/v1/users` | Lista usuarios (`ResponseUserDto[]`) |
| GET | `/api/v1/users/:id` | Un usuario o `404` |
| PATCH | `/api/v1/users/:id` | Actualiza usuario (hashea `password` si viene) |

> La creación de usuarios se hace vía `auth/register`. La eliminación existe en el servicio
> pero no está expuesta en el controlador.

## Projects — `/api/v1/projects`

| Método | Ruta | Desc. |
|--------|------|-------|
| POST | `/api/v1/projects` | Crea proyecto |
| GET | `/api/v1/projects` | Lista proyectos con todas sus relaciones (área técnica, tipo→fase, estado, equipo→trabajador/gerencias/líderes, fase, datos adicionales, tareas→seguimiento, historia de usuario, costo) |
| GET | `/api/v1/projects/:id` | Un proyecto (incluye `tareas→seguimiento→estado_tarea`) |
| GET | `/api/v1/projects/reports/:id` | **PDF** del proyecto (`Content-Type: application/pdf`) |
| GET | `/api/v1/projects/reports/many/:id` | **PDF** de los proyectos del equipo del usuario `:id` |
| PATCH | `/api/v1/projects/:id` | Actualiza proyecto |
| DELETE | `/api/v1/projects/:id` | Elimina proyecto |

## Reports — `/api/v1/reports`

Controlador presente pero **sin rutas activas** (los handlers están comentados). La generación
de PDF se expone a través de `projects/reports/:id` y `projects/reports/many/:id`.

## Database — `/api/v1/database`

| Método | Ruta | Desc. |
|--------|------|-------|
| GET | `/api/v1/database/csv` | Exporta la base a CSV y dispara la descarga (`db_export.csv`) |

## Módulos CRUD estándar

Cada uno expone el CRUD estándar bajo su base path. El cuerpo de entrada es el DTO
`create-*` / `update-*` y la salida el `response-*` correspondiente.

| Base path | Módulo |
|-----------|--------|
| `/api/v1/managements` | Managements |
| `/api/v1/tasks` | Tasks |
| `/api/v1/workers` | Workers |
| `/api/v1/teams` | Teams |
| `/api/v1/additional-data` | Additional Data |
| `/api/v1/phase-inputs` | Phase Inputs |
| `/api/v1/input-status` | Input Status |
| `/api/v1/user-histories` | User Histories |
| `/api/v1/costs` | Costs |
| `/api/v1/status-task` | Status Task |
| `/api/v1/technical-areas` | Technical Areas |
| `/api/v1/type-projects` | Type Projects |
| `/api/v1/projects-phase` | Projects Phase |
| `/api/v1/trackings` | Trackings |
| `/api/v1/forums` | Forums |
| `/api/v1/messages` | Messages |

Para cualquiera de estos, las operaciones son:

```
POST   /api/v1/<modulo>      → crea
GET    /api/v1/<modulo>      → lista (con relaciones necesarias)
GET    /api/v1/<modulo>/:id  → uno (404 si no existe)
PATCH  /api/v1/<modulo>/:id  → actualiza
DELETE /api/v1/<modulo>/:id  → elimina
```

## Formato de error

El filtro global devuelve:

```json
{
  "statusCode": 404,
  "message": "Not Found",
  "timestamp": "2024-...T...Z",
  "path": "/api/v1/projects/999"
}
```

## Contratos de datos

- La entrada se valida con `class-validator` + `ValidationPipe` (`forbidNonWhitelisted`):
  cualquier campo no declarado en el DTO devuelve `400`.
- La salida usa DTOs `response-*` que mapean explícitamente las columnas/relaciones a
  devolver (no se serializa la entidad cruda).
