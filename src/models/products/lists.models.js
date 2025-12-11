import { connectionQuery } from "../../helpers/connection.helpers.js";

export const getAllProducts = async () => {
	const rows = await connectionQuery(
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
    WHERE is_active = TRUE`,
	);
	return rows;
};
