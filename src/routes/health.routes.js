import { Router } from "express";
import { healthCheckController } from "../controllers/health.controllers.js";

const router = Router();

/**
 * @route GET /health
 * @description Health check endpoint para verificar estado del servidor y BD
 * @access Public
 */

router.get("/", healthCheckController);

export default router;
