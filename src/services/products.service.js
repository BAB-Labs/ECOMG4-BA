import { getAllProducts } from "../models/products/lists.models.js";

export const getProductsService = async () => {
	const products = await getAllProducts();
	return products;
};
