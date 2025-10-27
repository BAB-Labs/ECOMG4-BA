## 🏗️ Convenciones de Código

### Tabla resumen
| Tipo       | Convención       | Ejemplo       |
| ---------- | ---------------- | ------------- |
| Variables  | camelCase        | `userName`    |
| Clases     | PascalCase       | `UserService` |
| Constantes | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| Tablas     | snake_case       | `user_orders` |


#### Archivos y Directorios
```
controllers/
  users/
    users.controllers.js
  auth/
    auth.controllers.js
models/
  users/
    users.models.js
routes/
  users/
    users.routes.js
```

#### Variables y Funciones
```javascript
// camelCase para variables y funciones
const userName = 'john_doe'
const getUserById = async (userId) => { }

// PascalCase para clases y constructores
class UserService { }

// UPPER_SNAKE_CASE para constantes
const DEFAULT_PORT = 4000
const MAX_LOGIN_ATTEMPTS = 5
```

#### Base de Datos
```javascript
// snake_case para tablas y columnas
CREATE TABLE user_profiles (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(100),
  created_at TIMESTAMP
)
```

### **Estructura de Funciones**
```javascript
async function updateUserById(userId, userData) {
  try {
    // Validación de entrada
    if (!userId) {
      throw new Error('User ID is required')
    }

    // Lógica principal
    const existingUser = await getUserById(userId)
    if (!existingUser) {
      throw new Error('User not found')
    }

    // Operación de actualización
    const updatedUser = await Users.updateUserById(userId, userData)
    
    return updatedUser
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}
```

### **Manejo de Errores**
```javascript
// En controladores
try {
  const result = await someOperation()
  response.status(200).json({
    success: true,
    data: result
  })
} catch (error) {
  next(error) // Pasar al middleware de error
}

// En modelos
throw new Error('Descriptive error message')

// En middleware de error
export const errorHandler = (error, req, res, next) => {
  console.error(error.stack)
  
  const statusCode = error.statusCode || 500
  const message = error.message || 'Internal Server Error'
  
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  })
}
```