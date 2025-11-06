import { Router } from "express";
import healthRoutes from "./health.routes.js";

const router = Router();

router.use("/api/v1", healthRoutes);

export default router;
