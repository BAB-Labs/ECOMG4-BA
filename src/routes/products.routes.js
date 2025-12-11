import { Router } from "express";
import { getProductsController } from "../controllers/products.controller.js";

const router = Router();

//GET /products
router.get("/", getProductsController);

export default router;
