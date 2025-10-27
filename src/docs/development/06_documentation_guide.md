## 📚 Guías de Documentación

### **README para cada Módulo**
```markdown
# Módulo de Usuarios

## Descripción
Este módulo maneja toda la lógica relacionada con usuarios del sistema.

## Archivos
- `users.model.js` - Modelo de datos y operaciones de BD
- `users.controllers.js` - Lógica de negocio
- `users.routes.js` - Definición de endpoints

## Endpoints Disponibles
| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/users` | Crear usuario | No |
| GET | `/users` | Listar usuarios | Sí |
| GET | `/users/:id` | Obtener usuario | Sí |
| PATCH | `/users/:id` | Actualizar usuario | Sí |
| DELETE | `/users/:id` | Eliminar usuario | Sí (Admin) |

## Ejemplos de Uso
```shell
  # Crear usuario
  curl -X POST http://localhost:4000/users \
    -H "Content-Type: application/json" \
    -d '{"first_name":"Juan","email":"juan@email.com"}'
```
```