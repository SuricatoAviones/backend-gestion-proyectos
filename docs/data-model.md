# Modelo de Datos

El esquema se genera automáticamente desde las entidades TypeORM (`synchronize: true`);
**no hay migraciones**. Todas las tablas viven en la base `gestionador` (PostgreSQL, puerto
5432). A continuación se describen las entidades y sus relaciones más relevantes.

## Entidades

| Entidad | Módulo | Propósito |
|---------|--------|-----------|
| `User` | users | Usuarios del sistema, credenciales (`password` hasheado con bcryptjs) y `in_role` |
| `Project` | projects | Portafolio de proyectos PDVSA (entidad central del dominio) |
| `ProjectsPhase` | projects-phase | Fases de un proyecto |
| `Task` | tasks | Tareas de un proyecto |
| `Worker` | workers | Trabajadores |
| `Team` | teams | Equipos de trabajo |
| `Management` | managements | Gestiones |
| `Cost` | costs | Costos asociados a proyectos |
| `Tracking` | trackings | Seguimiento |
| `TechnicalArea` | technical-areas | Áreas técnicas |
| `TypeProject` | type-projects | Tipos de proyecto (→ fase de proyecto) |
| `AdditionalData` | additional-data | Datos adicionales |
| `PhaseInput` | phase-inputs | Insumos de fase |
| `InputStatus` | input-status | Estado de insumo |
| `UserHistory` | user-histories | Historias de usuario |
| `StatusTask` | status-task | Estado de tarea |
| `Report` | reports | Metadatos de reportes |
| `Forum` | forums | Foros |
| `Message` | messages | Mensajes de foro |

## Entidad central: `Project`

La entidad `Project` concentra la mayor parte de las relaciones del sistema. Sus relaciones
(principales propiedades de navegación) son:

- `i003f_i010t_area_tecnica` → **TechnicalArea**
- `i003f_i011_tipo_proyecto` → **TypeProject** → `i011f_i012t_fase_proyecto` → fase
- `i003f_i006t_estado_entrada` → estado de entrada
- `i0003f_i008t_equipo_trabajo` → **Team**, que a su vez enlaza:
  - `c008f_i001t_trabajador` → **Worker**
  - `c008f_i009t_gerencia_funcional` / `_galba` / `_tecnica` → gerencias
  - `c008f_i001t_lider_funcional` / `_lider_negocio` / `_lider_tecnico` → líderes (Users)
- `i003f_i005t_fase_entrada` → fase de entrada
- `i003f_i004t_datos_adi` → **AdditionalData**
- `i003f_i013t_tareas` → **Task** → `i013f_i014t_seguimiento` → **Tracking** →
  `i014f_i015t_estado_tarea` → **StatusTask**
- `i003f_i007i_historia_usuario` → **UserHistory**
- `i003f_i016i_costo` → **Cost**

> Por eso `GET /api/v1/projects` y `GET /api/v1/projects/:id` cargan un árbol profundo de
> relaciones mediante `leftJoinAndSelect` (ver [architecture.md](./architecture.md)).

## Relaciones típicas entre módulos

- **Project ↔ Team ↔ Worker / User**: un proyecto se apoya en un equipo cuyos líderes son
  usuarios del sistema.
- **Project ↔ TypeProject → fase**: clasificación del proyecto.
- **Project ↔ Task → Tracking → StatusTask**: seguimiento del avance de tareas.
- **Project ↔ Cost / AdditionalData / UserHistory**: información complementaria.

## Notas de integridad

- Las escrituras compuestas se ejecutan dentro de transacciones para mantener la consistencia.
- No se usan migraciones; si se cambia una entidad, el esquema se sincroniza al reiniciar
  (solo en entornos donde `synchronize: true` esté activo).
