# Documentación del Proyecto — Sistema de Gestión de Portafolio de Proyectos PDVSA ESEM

Esta carpeta contiene la documentación técnica completa del backend. Índice:

| Documento | Contenido |
|-----------|-----------|
| [architecture.md](./architecture.md) | Arquitectura, capas, flujo de una petición y decisiones técnicas |
| [getting-started.md](./getting-started.md) | Requisitos, variables de entorno, instalación y ejecución |
| [authentication.md](./authentication.md) | JWT, roles, guard y rutas públicas |
| [api.md](./api.md) | Mapa de endpoints (controladores, verbos, cuerpos) |
| [data-model.md](./data-model.md) | Entidades y relaciones del dominio |
| [project-structure.md](./project-structure.md) | Estructura de carpetas y convenciones |

> Resumen rápido: API REST en **NestJS 10** + **TypeORM** sobre **PostgreSQL**, empaquetada con **pnpm**. Prefijo global `/api/v1`, documentación Swagger en `/api`, autenticación **JWT** con guard global, y un filtro global de excepciones.
