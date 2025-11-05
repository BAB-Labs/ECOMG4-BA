import { Router } from "express";
import { logInfo, logError } from "../config/logger.js";
import { pool } from "../config/database.js"; // Importar el pool

const router = Router();

/**
 * @route GET /health
 * @description Health check endpoint para verificar estado del servidor y BD
 * @access Public
 */
router.get("/health", async (_req, res) => {
	try {
		logInfo("Health check endpoint called");

		let databaseStatus = "error";
		let dbError = null;
		let dbDetails = null;

		// Verificación real de la base de datos
		try {
			// Intentar ejecutar una consulta simple
			const [result] = await pool.query("SELECT 1 as connected");
			databaseStatus = "connected";
			dbDetails = {
				host: pool.pool.config.connectionConfig.host,
				database: pool.pool.config.connectionConfig.database,
				connectionLimit: pool.pool.config.connectionLimit,
			};
			logInfo("✅ Health check - Base de datos conectada correctamente");
		} catch (error) {
			databaseStatus = "error";
			dbError =
				error.message || "Conexión rechazada - MySQL probablemente apagado";
			logError("❌ Health check - Error en base de datos:", error.message);
		}

		// Preparar respuesta
		const healthResponse = {
			status: databaseStatus === "connected" ? "OK" : "Service Unavailable",
			message:
				databaseStatus === "connected"
					? "API funcionando correctamente"
					: "Problema de conexión con la base de datos",
			timestamp: new Date().toISOString(),
			environment: process.env.NODE_ENV || "development",
			database: databaseStatus,
			uptime: `${Math.floor(process.uptime())} segundos`,
			memoryUsage: {
				rss: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`,
				heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
				heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
			},
			version: process.env.API_VERSION || "1.0.0",
		};

		// Agregar detalles de BD si está conectada
		if (databaseStatus === "connected" && dbDetails) {
			healthResponse.databaseDetails = dbDetails;
		}

		// Si hay error en la base de datos, retornar error 503
		if (databaseStatus === "error") {
			healthResponse.error = dbError;
			return res.status(503).json(healthResponse);
		}

		// Todo está bien - retornar 200
		res.status(200).json(healthResponse);
	} catch (error) {
		logError("💥 Error crítico en health check:", error);

		res.status(500).json({
			status: "ERROR",
			message: "Error interno del servidor",
			timestamp: new Date().toISOString(),
			error:
				process.env.NODE_ENV === "development"
					? error.message
					: "Internal server error",
		});
	}
});

export default router;
