## 🔐 Guías de Seguridad

### Descripcion reglas globales
- Reglas de CORS
- Hash de contraseñas con bcrypt
- Tokens con expiración
- Validaciones en Joi

### **Validación de Entrada**
```javascript
import Joi from 'joi'

// Schema de validación
const userCreateSchema = Joi.object({
  first_name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])')).required()
})

// Middleware de validación
export const validateUserCreate = (req, res, next) => {
  const { error } = userCreateSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    })
  }
  next()
}
```

### **Autenticación JWT**
```javascript
import jwt from 'jsonwebtoken'

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  })
}

export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid token.'
    })
  }
}
```