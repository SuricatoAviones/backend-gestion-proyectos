# Autenticación y Autorización

## Flujo

1. El cliente obtiene un token con `POST /api/v1/auth/login` (`in_usuario`, `password`).
2. El `AuthService` valida contra `UsersService`, compara la contraseña con `bcryptjs` y
   firma un JWT (`JwtService.signAsync`) con payload:
   `{ id, email, role, nombre, apellido, foto, usuario }`.
3. El cliente envía el token en el header: `Authorization: Bearer <token>`.
4. `JwtAuthGuard` (guard global) valida la firma y expira; `JwtStrategy.validate` expone el
   payload como `request.user`.

## Guard global

`JwtAuthGuard` (`src/common/guards/jwt-auth.guard.ts`) se registra con `APP_GUARD` en
`AppModule`, por lo que **todas las rutas requieren token válido** salvo las marcadas
`@Public()`.

```ts
@Public()
@Post('login')
login(@Body() loginDto: LoginDto) { ... }

@Public()
@Post('register')
register(...) { ... }
```

## Estrategia JWT

`src/auth/jwt.strategy.ts` usa `passport-jwt`:
- Extrae el token del header `Authorization` (`ExtractJwt.fromAuthHeaderAsBearerToken()`).
- `ignoreExpiration: false` (rechaza tokens expirados; expira en `1d`).
- `secretOrKey` = `JWT_SECRET` (env) o fallback de `jwt.constants.ts`.

El secreto de firma y el de validación se leen de la **misma** fuente
(`ConfigService` → `JWT_SECRET`), por lo que deben coincidir.

## Roles

Definidos en `src/users/enums/roles.enum.ts`:

| Rol | Valor |
|-----|-------|
| Trabajador | `rolTrabajador` |
| Líder de Proyecto | `rolLiderProyecto` |
| Gerente | `rolGerente` |
| Administrador | `rolAdministrador` |

El `UsersService.create` valida que el `in_role` recibido pertenezca a este enum.

## Pendientes

- **`RolesGuard` / `@Roles()`**: el payload ya incluye `role`, pero aún no hay un guard que
  restrinja rutas por rol. Es el siguiente paso recomendado de seguridad.
- El registro (`auth/register`) acepta cualquier rol; considerar limitarlo a
  `rolAdministrador`.
