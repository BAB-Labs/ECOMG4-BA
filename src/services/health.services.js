import { testDbConnectionModels } from "../models/health.models.js";
import { logInfo, logError } from "../utils/logger.utils.js";

export const checkDatabaseHealthServices = async () => {
	try {
		const details = await testDbConnectionModels();

		logInfo("✅ Health check - Base de datos conectada correctamente");

		return {
			connected: true,
			details,
			error: null,
		};
	} catch (error) {
		logError("❌ Health check - Error en base de datos:", error.message);

		return {
			connected: false,
			details: null,
			error:
				error.message || "Conexión rechazada - MySQL probablemente apagado",
		};
	}
};
