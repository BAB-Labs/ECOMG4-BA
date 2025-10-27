# 🗄️ Guía de Base de Datos — E-Commerce MVP

> **Base de Datos:** `ecommerce_mvp`  
> **Gestor:** MySQL 8.x  
> **Motor de almacenamiento:** InnoDB  
> **Collation:** `utf8mb4_unicode_ci`

---

## 🎯 Propósito general

Esta base de datos soporta el backend del **E-Commerce MVP**, administrando usuarios, productos, categorías, carritos, órdenes y sus relaciones.  
Está optimizada para integrarse con Node.js mediante **pool de conexiones** y consultas seguras (prepared statements).

---

## 🧩 Estructura General

| Tabla | Descripción |
|--------|--------------|
| `users` | Almacena la información de los usuarios registrados. |
| `categories` | Define las categorías de productos disponibles. |
| `products` | Contiene los productos listados en la tienda. |
| `carts` | Representa el carrito activo de cada usuario. |
| `cart_items` | Almacena los productos agregados al carrito. |
| `orders` | Registra las órdenes de compra realizadas. |
| `order_items` | Detalla los productos incluidos en cada orden. |

---

## 👥 Tabla `users`

Almacena los datos de los usuarios finales del sistema.

| Campo | Tipo | Descripción |
|--------|------|--------------|
| `id` | INT UNSIGNED PK | Identificador único autoincremental. |
| `first_name` | VARCHAR(100) | Nombre del usuario. |
| `last_name` | VARCHAR(100) | Apellido del usuario. |
| `email` | VARCHAR(255) | Correo electrónico único. |
| `password_hash` | VARCHAR(255) | Hash seguro de la contraseña. |
| `shipping_address` | TEXT | Dirección de envío. |
| `city` | VARCHAR(100) | Ciudad del usuario. |
| `postal_code` | VARCHAR(20) | Código postal. |
| `phone_number` | VARCHAR(50) | Teléfono de contacto. |
| `created_at` | TIMESTAMP | Fecha de registro. |
| `updated_at` | TIMESTAMP | Fecha de última actualización. |

🔒 **Restricciones**
- `email` es **único**.
- Índices en `email` para acelerar consultas de login.

---

## 🗂️ Tabla `categories`

Define las categorías principales del catálogo.

| Campo | Tipo | Descripción |
|--------|------|--------------|
| `id` | INT UNSIGNED PK | Identificador único. |
| `name` | VARCHAR(100) | Nombre de la categoría (único). |
| `description` | TEXT | Descripción breve. |
| `image_url` | VARCHAR(255) | Imagen ilustrativa. |
| `created_at` | TIMESTAMP | Fecha de creación. |
| `updated_at` | TIMESTAMP | Fecha de modificación. |

📦 Ejemplos:
- Frutas y Verduras  
- Lácteos  
- Panadería  

---

## 🛒 Tabla `products`

Contiene la información detallada de los productos.

| Campo | Tipo | Descripción |
|--------|------|--------------|
| `id` | INT UNSIGNED PK | Identificador único. |
| `name` | VARCHAR(255) | Nombre del producto. |
| `description` | TEXT | Descripción detallada. |
| `price` | DECIMAL(10,2) | Precio unitario. |
| `sku` | VARCHAR(100) | Código de inventario único. |
| `stock_quantity` | INT UNSIGNED | Cantidad disponible. |
| `image_url` | VARCHAR(255) | Imagen del producto. |
| `category_id` | INT UNSIGNED FK | Relación con `categories`. |
| `is_active` | BOOLEAN | Estado del producto (activo/inactivo). |
| `created_at` | TIMESTAMP | Fecha de registro. |
| `updated_at` | TIMESTAMP | Última modificación. |

🔗 **Relaciones**
- `category_id` → `categories.id`  
  (ON DELETE RESTRICT, ON UPDATE CASCADE)

🔍 **Índices**
- `sku`, `name`, `price`, `is_active`
- `FULLTEXT(name, description)` para búsquedas.

---

## 🧺 Tabla `carts`

Representa el carrito activo de un usuario.

| Campo | Tipo | Descripción |
|--------|------|--------------|
| `id` | INT UNSIGNED PK | Identificador del carrito. |
| `user_id` | INT UNSIGNED FK | Usuario propietario del carrito. |
| `created_at` | TIMESTAMP | Fecha de creación. |
| `updated_at` | TIMESTAMP | Fecha de actualización. |

🔗 **Relaciones**
- `user_id` → `users.id`  
  (ON DELETE CASCADE, ON UPDATE CASCADE)

🧠 **Notas**
- Cada usuario tiene **un solo carrito activo** (`UNIQUE KEY user_id`).

---

## 🧾 Tabla `cart_items`

Guarda los productos añadidos al carrito.

| Campo | Tipo | Descripción |
|--------|------|--------------|
| `id` | INT UNSIGNED PK | Identificador único. |
| `cart_id` | INT UNSIGNED FK | Relación con `carts`. |
| `product_id` | INT UNSIGNED FK | Producto agregado. |
| `quantity` | INT UNSIGNED | Cantidad seleccionada. |
| `added_at` | TIMESTAMP | Fecha en que se añadió. |

🔗 **Relaciones**
- `cart_id` → `carts.id` (ON DELETE CASCADE)  
- `product_id` → `products.id` (ON DELETE CASCADE)

✅ **Validaciones**
- `quantity > 0`
- No puede haber productos duplicados en un mismo carrito (`UNIQUE KEY cart_id, product_id`)

---

## 📦 Tabla `orders`

Registra los pedidos realizados por los usuarios.

| Campo | Tipo | Descripción |
|--------|------|--------------|
| `id` | INT UNSIGNED PK | Identificador de la orden. |
| `user_id` | INT UNSIGNED FK | Usuario que realizó la compra. |
| `total_amount` | DECIMAL(10,2) | Monto total del pedido. |
| `shipping_address` | TEXT | Dirección de envío. |
| `status` | ENUM | Estado del pedido. |
| `created_at` | TIMESTAMP | Fecha de creación. |
| `updated_at` | TIMESTAMP | Última actualización. |

📦 **Estados posibles**
- `pending` — Pedido creado, pendiente de pago.  
- `paid` — Pago recibido.  
- `shipped` — Enviado al cliente.  
- `delivered` — Entregado.  
- `cancelled` — Cancelado.

🔗 **Relaciones**
- `user_id` → `users.id` (ON DELETE RESTRICT)

✅ **Validación**
- `total_amount >= 0`

---

## 🧾 Tabla `order_items`

Guarda los productos que forman parte de cada orden.

| Campo | Tipo | Descripción |
|--------|------|--------------|
| `id` | INT UNSIGNED PK | Identificador único. |
| `order_id` | INT UNSIGNED FK | Relación con `orders`. |
| `product_id` | INT UNSIGNED FK | Producto vendido. |
| `quantity` | INT UNSIGNED | Cantidad comprada. |
| `price_per_unit` | DECIMAL(10,2) | Precio unitario al momento de la compra. |
| `created_at` | TIMESTAMP | Fecha de registro. |

🔗 **Relaciones**
- `order_id` → `orders.id` (ON DELETE CASCADE)
- `product_id` → `products.id` (ON DELETE RESTRICT)

✅ **Validaciones**
- `quantity > 0`
- `price_per_unit >= 0`

---

## 🌱 Datos iniciales

Se insertan **categorías base**, **productos de ejemplo** y **un usuario de prueba**:

```sql
INSERT INTO categories (...)
INSERT INTO products (...)
INSERT INTO users (...)
```

## 📘 Propósito

- Permitir pruebas iniciales del backend.
- Facilitar la visualización del modelo relacional.

## 🧭 Recomendaciones
- No modificar ni eliminar los constraints o índices principales.
- Evitar usar DELETE masivos, preferir UPDATE is_active = false.
- Realizar backups regulares con:

```shell
    mysqldump -u root -p ecommerce_mvp > backup_ecommerce.sql
```
