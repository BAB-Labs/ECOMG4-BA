import { Router } from "express";
import { getProductByIdController } from "../controllers/products.controller.js";

const router = Router();

router.get("/:id", getProductByIdController);

export default router;
