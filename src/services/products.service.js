import { getProductById } from "../models/products/listsById.model.js";

export const getProductByIdService = async (id) => {
	const product = await getProductById(id);
	return product;
};
