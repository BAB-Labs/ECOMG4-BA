## 🧪 Guías de Testing

### **Estructura de Tests**
```javascript
// tests/units/models/users.test.js
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { Users } from '../../../src/models/users/users.model.js'

describe('Users Model', () => {
  beforeEach(async () => {
    // Setup para cada test
    await setupTestDatabase()
  })

  afterEach(async () => {
    // Cleanup después de cada test
    await cleanupTestDatabase()
  })

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      // Arrange
      const userData = {
        first_name: 'John',
        email: 'john@example.com'
      }

      // Act
      const result = await Users.createUser(userData)

      // Assert
      expect(result).toBeDefined()
      expect(result.email).toBe(userData.email)
      expect(result.user_id).toBeDefined()
    })

    it('should throw error when email already exists', async () => {
      // Arrange
      const userData = {
        first_name: 'John',
        email: 'existing@example.com'
      }
      await Users.createUser(userData) // Crear usuario existente

      // Act & Assert
      await expect(Users.createUser(userData)).rejects.toThrow('User with this email already exists')
    })
  })
})
```

### **Tests de Integración**
```javascript
// tests/integration/auth.test.js
import request from 'supertest'
import { app } from '../../src/server.js'

describe('Authentication Endpoints', () => {
  describe('POST /auth/login', () => {
    it('should login user successfully', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        })

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.token).toBeDefined()
    })
  })
})
```