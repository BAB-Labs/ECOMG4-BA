# 📘 README – Base de Datos ECOMG4-BA

## 🧩 Descripción
Este módulo contiene la configuración y scripts necesarios para crear la base de datos del proyecto **ECOMG4-BA**, incluyendo tablas, vistas, procedimientos almacenados y triggers.  
Permite automatizar la creación del esquema en MySQL mediante un script Node.js.

---

## 📂 Estructura del directorio
```
src/
 └── database/
      ├── schema.sql        # Script SQL con estructura completa de la BD
      ├── dbCreate.js       # Script Node.js que ejecuta automáticamente schema.sql
      └── README.md         # Este archivo
```

---

## ⚙️ Requisitos previos
- Tener instalado **MySQL Server** y un usuario con permisos de creación de base de datos.  
- Tener instalado **Node.js** y **pnpm**.  
- Configurar correctamente el archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_PORT=3307
DB_USER=root
DB_PASS=kevin123*
DB_NAME=ecomg4ba_db
```

---

## 🚀 Ejecución del script

1. Verifica que MySQL esté corriendo.  
2. Ejecuta el siguiente comando desde la raíz del proyecto:

```bash
pnpm run db:create
```

3. Si todo está correcto, deberías ver el mensaje:
```
✅ Conectado a MySQL correctamente.
✅ Base de datos y tablas creadas correctamente.
```

---

## 🧠 Validación
Puedes confirmar que las tablas fueron creadas correctamente ejecutando en MySQL Workbench:

```sql
USE ecomg4ba_db;
SHOW TABLES;
```

---

## 👤 Autor
**Kevin Gianmarco García**  
BAB LABS – Dev Team  
_Noviembre 2025_
