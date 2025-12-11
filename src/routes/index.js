import { Router } from "express";
import healthRoutes from "./health.routes.js";
import { config } from "../config/config.js";
import productsRoutes from "./products.routes.js";

const router = Router();

// ✅ 1. Se ocupa el path de la ruta para la api (/api/v1)
const base = config.api.basePath;

// ✅ 2. Construccion de rutas globales para el backend
router.use(`${base}/health`, healthRoutes);
router.use(`${base}/products`, productsRoutes);

export default router;
