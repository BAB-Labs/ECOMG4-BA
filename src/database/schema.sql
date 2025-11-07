-- CREATE DATABASE IF NOT EXISTS ecommerce_mvp;
-- USE ecommerce_mvp;

-- SET default_storage_engine = InnoDB;
-- SET NAMES utf8mb4;
-- SET CHARACTER SET utf8mb4;

CREATE TABLE users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    shipping_address TEXT NULL,
    city VARCHAR(100) NULL,
    postal_code VARCHAR(20) NULL,
    phone_number VARCHAR(50) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    UNIQUE KEY uk_users_email (email),
    INDEX idx_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE categories (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT NULL,
    image_url VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    UNIQUE KEY uk_categories_name (name),
    INDEX idx_categories_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE products (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    sku VARCHAR(100) NOT NULL,
    stock_quantity INT UNSIGNED NOT NULL DEFAULT 0,
    image_url VARCHAR(255) NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    UNIQUE KEY uk_products_sku (sku),
    INDEX idx_products_name (name),
    INDEX idx_products_category (category_id),
    INDEX idx_products_price (price),
    INDEX idx_products_active (is_active),
    FULLTEXT KEY ft_products_search (name, description),
    
    CONSTRAINT fk_products_category 
        FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE carts (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    UNIQUE KEY uk_carts_user (user_id),
    
    CONSTRAINT fk_carts_user 
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE cart_items (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    cart_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    UNIQUE KEY uk_cart_items_cart_product (cart_id, product_id),
    INDEX idx_cart_items_cart (cart_id),
    INDEX idx_cart_items_product (product_id),
    
    CONSTRAINT fk_cart_items_cart 
        FOREIGN KEY (cart_id) REFERENCES carts(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_cart_items_product 
        FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT ck_cart_items_quantity 
        CHECK (quantity > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE orders (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_address TEXT NOT NULL,
    status ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    INDEX idx_orders_user (user_id),
    INDEX idx_orders_status (status),
    INDEX idx_orders_created (created_at),
    
    CONSTRAINT fk_orders_user 
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT ck_orders_total 
        CHECK (total_amount >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE order_items (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    order_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    price_per_unit DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    INDEX idx_order_items_order (order_id),
    INDEX idx_order_items_product (product_id),
    
    CONSTRAINT fk_order_items_order 
        FOREIGN KEY (order_id) REFERENCES orders(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_order_items_product 
        FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT ck_order_items_quantity 
        CHECK (quantity > 0),
    CONSTRAINT ck_order_items_price 
        CHECK (price_per_unit >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar datos iniciales
INSERT INTO categories (name, description, image_url) VALUES
('Frutas y Verduras', 'Productos frescos de temporada', '/images/categories/frutas-verduras.jpg'),
('Carnes', 'Carnes frescas y embutidos', '/images/categories/carnes.jpg'),
('Lácteos', 'Leche, quesos y derivados', '/images/categories/lacteos.jpg'),
('Panadería', 'Pan fresco y productos de panadería', '/images/categories/panaderia.jpg'),
('Despensa', 'Productos básicos y conservas', '/images/categories/despensa.jpg');

INSERT INTO products (name, description, price, sku, stock_quantity, image_url, category_id) VALUES
('Manzanas Rojas', 'Manzanas rojas frescas, ideales para consumo directo', 2.50, 'MANZ-001', 100, '/images/products/manzanas-rojas.jpg', 1),
('Pechuga de Pollo', 'Pechuga de pollo fresca, sin piel', 8.90, 'POLL-001', 50, '/images/products/pechuga-pollo.jpg', 2),
('Leche Entera', 'Leche entera pasteurizada 1L', 1.20, 'LECH-001', 200, '/images/products/leche-entera.jpg', 3),
('Pan Integral', 'Pan integral artesanal 500g', 2.80, 'PAN-001', 30, '/images/products/pan-integral.jpg', 4),
('Arroz Blanco', 'Arroz blanco grano largo 1kg', 1.50, 'ARRO-001', 80, '/images/products/arroz-blanco.jpg', 5);

INSERT INTO users (first_name, last_name, email, password_hash, shipping_address, city, postal_code, phone_number) VALUES
('Juan', 'Pérez', 'juan.perez@email.com', '$2b$10$rQZ9yP2J5X7vK8wL3mN4O.vH6tR9sA2dF5gH8jK1lM3nP6qS9tU2v', 'Calle Principal 123', 'Ciudad', '12345', '+1234567890');

-- Triggers
CREATE TRIGGER tr_users_after_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    INSERT INTO carts (user_id) VALUES (NEW.id);
END;

CREATE TRIGGER tr_order_items_after_insert
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE products 
    SET stock_quantity = stock_quantity - NEW.quantity
    WHERE id = NEW.product_id;
END;

-- Vistas
CREATE VIEW v_products_with_category AS
SELECT 
    p.id,
    p.name,
    p.description,
    p.price,
    p.sku,
    p.stock_quantity,
    p.image_url,
    p.is_active,
    c.name as category_name,
    c.description as category_description
FROM products p
INNER JOIN categories c ON p.category_id = c.id
WHERE p.is_active = TRUE;

CREATE VIEW v_cart_details AS
SELECT 
    ci.cart_id,
    c.user_id,
    p.id as product_id,
    p.name as product_name,
    p.price,
    p.image_url,
    ci.quantity,
    (p.price * ci.quantity) as subtotal
FROM cart_items ci
INNER JOIN carts c ON ci.cart_id = c.id
INNER JOIN products p ON ci.product_id = p.id
WHERE p.is_active = TRUE;

CREATE INDEX idx_products_category_price ON products (category_id, price);
CREATE INDEX idx_orders_user_date ON orders (user_id, created_at DESC);

-- Procedimientos almacenados
CREATE PROCEDURE sp_add_to_cart(
    IN p_user_id INT UNSIGNED,
    IN p_product_id INT UNSIGNED,
    IN p_quantity INT UNSIGNED
)
BEGIN
    DECLARE v_cart_id INT UNSIGNED;
    DECLARE v_existing_quantity INT UNSIGNED DEFAULT 0;
    
    SELECT id INTO v_cart_id FROM carts WHERE user_id = p_user_id;
    
    SELECT quantity INTO v_existing_quantity 
    FROM cart_items 
    WHERE cart_id = v_cart_id AND product_id = p_product_id;
    
    IF v_existing_quantity > 0 THEN
        UPDATE cart_items 
        SET quantity = quantity + p_quantity 
        WHERE cart_id = v_cart_id AND product_id = p_product_id;
    ELSE
        INSERT INTO cart_items (cart_id, product_id, quantity) 
        VALUES (v_cart_id, p_product_id, p_quantity);
    END IF;
END;

CREATE PROCEDURE sp_get_cart_total(
    IN p_user_id INT UNSIGNED,
    OUT p_total DECIMAL(10,2)
)
BEGIN
    SELECT COALESCE(SUM(p.price * ci.quantity), 0) INTO p_total
    FROM cart_items ci
    INNER JOIN carts c ON ci.cart_id = c.id
    INNER JOIN products p ON ci.product_id = p.id
    WHERE c.user_id = p_user_id AND p.is_active = TRUE;
END;

SELECT 'Base de datos creada exitosamente!' as mensaje;
SELECT 'Tablas creadas: users, categories, products, carts, cart_items, orders, order_items' as tablas;
SELECT 'Vistas creadas: v_products_with_category, v_cart_details' as vistas;
SELECT 'Procedimientos creados: sp_add_to_cart, sp_get_cart_total' as procedimientos;
