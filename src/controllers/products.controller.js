import { getProductByIdService } from "../services/products.service.js";

export const getProductByIdController = async (req, res) => {
	const { id } = req.params;
	const product = await getProductByIdService(id);

	if (!product) {
		return res.status(404).json({ message: "Product not found" });
	}

	res.status(200).json(product);
};
