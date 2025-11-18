## 🛒 ECOMG4-BA — Backend E-Commerce API

Un sistema REST API para la gestión de un E-Commerce (supermercado) desarrollado por BAB-Labs como proyecto colaborativo para programadores trainee y junior developers.

## 📋 Descripción

ECOMG4-BA es un backend modular, escalable y mantenible construido con Node.js + Express y MySQL.
Proporciona una base sólida para implementar las funcionalidades esenciales de un comercio electrónico moderno: autenticación, gestión de usuarios, productos, pedidos y direcciones de envío.

El proyecto sigue principios Clean Architecture y MVC modular, con énfasis en la calidad del código y las buenas prácticas de desarrollo.

## 🦮 Guias
### 🗺️ Guias para desarrollo
- [Plantilla de historias de usuario](src/docs/development/01_user_story_template.md)
- [Plantilla solicutudes de extraccion](src/docs/development/02_pull_request_template.md)
- [Convenciones de codigo](src/docs/development/03_code_conventions.md)
- [Guia de test, unitarios y de integracion](src/docs/development/04_testing_guide.md)
- [Guia de seguridad](src/docs/development/05_security_guide.md)
- [Guia de documentacion](src/docs/development/06_documentation_guide.md)
- [Flujos de trabajo de github](src/docs/development/07_git_workflow.md)
- [Guias de metricas](src/docs/development/08_metrics_templates.md)

### 🪶 Guia de instalaciones basica
- [Instalaciones basicas](src/docs/setup/01_installation_guide.md)

### 📅 Guia de seguimiento de la base de datos
- [Configuracion base de datos](src/docs/setup/02_database_setup.md)
- [Query de la Base de Datos](ECOMG4-TB1.sql)
- [PDF Diagrama Entidad Relacion](Ecommerce-ECOMG4.pdf)

## 🚀 Características

- ✅ API REST con Express.js
- ✅ Base de datos MySQL
- ✅ Autenticación con JWT + bcrypt
- ✅ Estructura modular y escalable (config, controllers, models, services)
- ✅ Variables de entorno (.env) configurables
- ✅ Middleware de CORS y manejo centralizado de errores
- ✅ Logging con Winston y Morgan
- ✅ Documentación interactiva con Swagger UI
- ✅ Linter y formateador con Biome
- ✅ Testing con Jest + Supertest
- 🔒 Protección de rutas con middlewares personalizados
- ⚙️ Configuración de entorno adaptable (development / production)

## 🛠️ Tecnologías Utilizadas

| Categoría              | Tecnología                  |
| ---------------------- | --------------------------- |
| **Runtime**            | Node.js v22.11.0            |
| **Framework**          | Express 5.1.0               |
| **Base de Datos**      | MySQL                       |
| **ORM / Query Layer**  | mysql2                      |
| **Autenticación**      | JWT + bcrypt                |
| **Validación**         | Joi                         |
| **Logger**             | Winston + Morgan            |
| **Documentación**      | Swagger UI + swagger-themes |
| **Testing**            | Jest + Supertest            |
| **Code Style**         | Biome                       |
| **Gestor de Paquetes** | pnpm 10.19.0                |


## 📁 Estructura del Proyecto

```
ECOMG4-BA/
├── src/
│   ├── config/         # Configuración global (DB, entorno, app)
│   ├── controllers/    # Controladores: manejan las peticiones (req, res)
│   ├── database/       # Base de datos: Archivos sobre creacion base de datos y registros
│   └── docs/           # Documentación del proyecto (Swagger, guías, etc.)
│   ├── helpers/        # Funciones auxiliares específicas de módulos
│   ├── lib/            # Librerías internas o integraciones externas
│   ├── middlewares/    # Middlewares de autenticación, validación, errores, etc.
│   ├── models/         # Modelos y consultas SQL
│   ├── routes/         # Definición de rutas de la API
│   ├── services/       # Lógica de negocio (intermediario entre controladores y modelos)
│   ├── utils/          # Funciones reutilizables (hashing, tokens, formateo, etc.)
│   ├── tests/          # Pruebas unitarias e integrales
├── .env                # Variables de entorno (no subir al repositorio)
├── .env.example        # Ejemplo de configuración del entorno
├── .gitignore          # Configuracion de modulos ignorados
├── .nvmrc              # Archivo runtime de node que se ocupara
├── app.js              # Archivo raiz
├── biome.json          # Configuracion de biome
├── LICENSE             # Licencia del proyecto
├── package.json        # Dependencias y tecnologias a ocupar
├── pnpm-lock.yaml      # Administrador de las dependencias y configuraciones
└── README.md           # Guia inicial y de apoyo para el proyecto
```

## ⚡ Instalación y Configuración

### Prerrequisitos

- Node.js ≥ 22.11.0
- MySQL ≥ 8.0
- pnpm ≥ 10.19.0

### Pasos de Instalación

1. **Clonar el repositorio**
```shell
  git clone <url-del-repositorio>
  cd ECOMG4-BA
```

2. **Instalar dependencias**

```shell
  pnpm install
```

3. **Configurar variables de entorno**

   Crear un archivo `.env` en la raíz del proyecto:

```shell
PORT=3000
NODE_ENV=development

# Base de datos
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=ecommerce_mvp
DB_PORT=3306

# Ambiente de trabajo
RUNTIME=local

# Autenticacion
JWT_SECRET=clave_super_segura
JWT_EXPIRES_IN=24h
JWT_EXPIRES_COOKIE=24h

# Otros
LOG_LEVEL=debug
API_VERSION=v1
BASE_URL_SWAGGER=http://localhost:3000/api/docs
```
## 4. Configurar la base de datos

A continuación se muestran los comandos necesarios para realizar la configuración inicial de la base de datos del proyecto.

---

### 🔧 Crear la estructura completa de la base de datos

Ejecuta el siguiente comando para crear toda la estructura de la base de datos, incluyendo:

- Tablas
- Vistas
- Triggers
- Stored Procedures

```shell
pnpm db:create
```

### 🌱 Cargar datos de ejemplo (Seeder)

Este comando inserta 4 registros temporales en la tabla products con fines de prueba.

Una vez insertados:

- El proceso espera 15 segundos
- Posteriormente elimina automáticamente dichos registros
- Finaliza el proceso para mantener la base de datos limpia

```shell
pnpm seed
```


## 🚀 Uso

### Iniciar el servidor

**Modo desarrollo:**

```shell
  pnpm dev
```

El servidor se ejecutará en `http://localhost:3000` (o el puerto configurado en las variables de entorno).

### Endpoints Disponibles

#### Información General

- **GET** `/` - Información básica de la API

#### Usuarios

- **POST** `/users` - Crear un nuevo usuario

#### Ejemplo de uso - Crear Usuario

```shell
  curl -X POST http://localhost:3000/users \
    -H "Content-Type: application/json" \
    -d '{
      "first_name": "Juan",
      "last_name": "Pérez García",
      "email": "juan.perez@email.com",
      "password_hash": "hash_de_contraseña",
      "shipping_address": "Av. Limones"
    }'
```

**Respuesta exitosa:**

```json
  {
    "success": true,
    "message": "Usuario creado exitosamente",
    "data": {
      "id": 1,
      "first_name": "Juan",
      "last_name": "Pérez García",
      "email": "juan.perez@email.com",
      "shipping_address": "Av. Limones"
      "created_at": "2025-06-27T10:00:00.000Z"
    }
  }
```

## 📊 Base de Datos

### Esquema de Usuarios

| Campo            | Tipo         | Restricciones             | Descripción           |
| ---------------- | ------------ | ------------------------- | --------------------- |
| id               | INT          | PK, AI, NOT NULL          | Identificador único   |
| first_name       | VARCHAR(100) | NOT NULL                  | Nombre del usuario    |
| last_name        | VARCHAR(100) | NOT NULL                  | Apellido del usuario  |
| email            | VARCHAR(255) | NOT NULL, UNIQUE          | Correo electrónico    |
| password_hash    | VARCHAR(255) | NOT NULL                  | Contraseña encriptada |
| shipping_address | TEXT         | Opcional                  | Dirección de envío    |
| city             | VARCHAR(100) | Opcional                  | Ciudad                |
| postal_code      | VARCHAR(20)  | Opcional                  | Código postal         |
| phone_number     | VARCHAR(50)  | Opcional                  | Teléfono              |
| theme            | VARCHAR(10)  | NOT NULL                  | Tema D/L en ECOMG4-FE |
| created_at       | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP | Fecha de creación     |
| updated_at       | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP | Última actualización  |

## 🧪 Testing

```shell
  # Ejecutar pruebas
  pnpm test

  # Ejecutar pruebas con cobertura
  pnpm test -- --coverage
```

## 🧭 Flujo de Desarrollo Recomendado

1. **Configuración inicial**

- Crear rama desde develop (git checkout -b feature/nombre-rama)
- Configurar .env
- Asegurarse de tener MySQL corriendo

2. **Desarrollo del módulo**

- Crear archivos en /controllers, /services, /models, /routes
- Agregar documentación Swagger en /docs

3. **Lint & Test**

```shell
  pnpm biome check
  pnpm test
```

4. **Pull Request y revisión**

- Subir cambios (git push origin feature/nombre-rama)
- Crear PR hacia develop
- Revisiones obligatorias antes del merge (rama main bloqueada)

### 📋 Estándares de Código
- Linter y formateador: Biome
- Modularización bajo principios MVC + Services
- Nombres de archivos y funciones en inglés
- Comentarios claros y consistentes
- Pruebas para controladores y servicios
- Commits descriptivos con convención feat|fix|docs|test|chore|refactor

## 🗺️ Roadmap Inicial
- [x] Configuración base del proyecto
- [ ] Integración con MySQL
- [x] Configuración de Biome
- [ ] CRUD de usuarios
- [ ] Autenticación con JWT
- [ ] Gestión de productos
- [ ] Gestión de pedidos y carritos
- [ ] Sistema de roles (admin / user)
- [ ] Validación de datos con Joi
- [ ] Middleware de logging avanzado
- [ ] Documentación completa con Swagger
- [ ] Dockerización del backend
- [ ] Pruebas de integración (Jest + Supertest)

## 👥 Autores
BAB-Labs Team — Equipo de desarrollo colaborativo

- **Erick Gonzalez** - [@muke78](https://github.com/muke78)
- **Alexander-Salvador** - [@Alexander-Salvador](https://github.com/Alexander-Salvador)
- **Gabriel Yturrino** - [@G4B-0S0](https://github.com/G4B-0S0)
- **Gonzalo Dávila** - [@gpdr96](https://github.com/gpdr96)
- **Javier Alberto Marcapeña Navarro** - [@JavierDeveloper17](https://github.com/JavierDeveloper17)
- **Lizy Palacios** - [@lizypc24-crypto](https://github.com/lizypc24-crypto)
- **Juan Chura** - [@LunneCod](https://github.com/LunneCod)
- **Alfredo Mancilla** - [@mcportal0](https://github.com/mcportal0)
- **Alex Rosas** - [@rosasrias](https://github.com/rosasrias)

## 📄 Licencia

Apache License 2.0

## 📞 Soporte

📧 team.bablabs@gmail.com
👨‍💻 Proyecto mantenido por BAB-Labs

---
*BAB-Labs Team — Equipo de desarrollo colaborativo*
