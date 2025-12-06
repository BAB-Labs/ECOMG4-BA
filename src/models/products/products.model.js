import { pool } from "../../lib/db.js";

export class Products {
	static async getAllProducts({ limit = 10, offset = 0 } = {}) {
		const [rows] = await pool.query(
			`SELECT 
        id,
        name,
        description,
        price,
        sku,
        stock_quantity,
        image_url,
        category_id,
        is_active,
        created_at,
        updated_at
      FROM products
      WHERE is_active = TRUE
      LIMIT ? OFFSET ?`,
			[limit, offset],
		);
		return rows;
	}

	static async getProductById(id) {
		const [rows] = await pool.query(
			`SELECT 
        id,
        name,
        description,
        price,
        sku,
        stock_quantity,
        image_url,
        category_id,
        is_active,
        created_at,
        updated_at
      FROM products
      WHERE id = ? AND is_active = TRUE`,
			[id],
		);
		return rows[0];
	}

	static async countProducts() {
		const [rows] = await pool.query(
			"SELECT COUNT(*) as total FROM products WHERE is_active = TRUE",
		);
		return rows[0].total;
	}
}
