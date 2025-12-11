import { getProductsService } from "../services/products.service.js";

export const getProductsController = async (req, res) => {
	const products = await getProductsService();
	res.status(200).json(products);
};
