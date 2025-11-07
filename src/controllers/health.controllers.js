import { config } from "../config/config.js";
import { checkDatabaseHealthServices } from "../services/health.services.js";
import { logInfo, logError } from "../utils/logger.utils.js";

export const healthCheckController = async (_req, res) => {
	try {
		logInfo("Health check endpoint called");

		const dbStatus = await checkDatabaseHealthServices();

		const response = {
			status: dbStatus.connected ? "OK" : "Service Unavailable",
			message: dbStatus.connected
				? "API funcionando correctamente"
				: "Problema de conexión con la base de datos",
			timestamp: new Date().toISOString(),
			environment: config.nodeEnv,
			database: dbStatus.connected ? "connected" : "error",
			uptime: `${Math.floor(process.uptime())} segundos`,
			memoryUsage: {
				rss: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`,
				heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
				heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
			},
			version: process.env.API_VERSION || "1.0.0",
			...(dbStatus.details && { databaseDetails: dbStatus.details }),
			...(dbStatus.error && { error: dbStatus.error }),
		};

		if (!dbStatus.connected) return res.status(503).json(response);

		return res.status(200).json(response);
	} catch (error) {
		logError("💥 Error crítico en health check:", error);

		return res.status(500).json({
			status: "ERROR",
			message: "Error interno del servidor",
			timestamp: new Date().toISOString(),
			error:
				config.nodeEnv === "development"
					? error.message
					: "Internal server error",
		});
	}
};
