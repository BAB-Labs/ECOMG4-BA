import { logError, logWarning } from "../config/logger.js";

/**
 * @description Middleware para manejar rutas no encontradas (404)
 */
export const notFoundHandler = (req, res, next) => {
	logWarning(`Ruta no encontrada: ${req.method} ${req.originalUrl}`, {
		ip: req.ip,
		userAgent: req.get("User-Agent"),
	});

	res.status(404).json({
		error: "Ruta no encontrada",
		message: `La ruta ${req.method} ${req.originalUrl} no existe`,
		path: req.originalUrl,
		method: req.method,
		timestamp: new Date().toISOString(),
		statusCode: 404,
	});
};

/**
 * @description Middleware global para manejo de errores
 */
export const errorHandler = (error, req, res, next) => {
	// Log del error con Winston centralizado
	logError("Error no manejado:", {
		message: error.message,
		stack: error.stack,
		url: req.originalUrl,
		method: req.method,
		ip: req.ip,
		statusCode: error.statusCode || 500,
	});

	// Determinar el status code
	const statusCode = error.statusCode || error.status || 500;

	// Respuesta de error estandarizada
	const errorResponse = {
		error: getErrorTitle(statusCode),
		message:
			process.env.NODE_ENV === "development"
				? error.message
				: getErrorMessage(statusCode),
		timestamp: new Date().toISOString(),
		path: req.originalUrl,
		statusCode: statusCode,
	};

	// Solo en desarrollo incluir stack trace
	if (process.env.NODE_ENV === "development") {
		errorResponse.stack = error.stack;
	}

	// Manejar errores específicos
	if (error.name === "ValidationError") {
		errorResponse.error = "Error de validación";
		errorResponse.details = error.details;
	}

	if (error.code === "ECONNREFUSED") {
		errorResponse.error = "Error de conexión a la base de datos";
		errorResponse.message = "No se puede conectar al servidor de base de datos";
	}

	res.status(statusCode).json(errorResponse);
};

/**
 * @description Función helper para obtener título del error basado en status code
 */
const getErrorTitle = (statusCode) => {
	const titles = {
		400: "Solicitud incorrecta",
		401: "No autorizado",
		403: "Prohibido",
		404: "No encontrado",
		409: "Conflicto",
		422: "Entidad no procesable",
		500: "Error interno del servidor",
		503: "Servicio no disponible",
	};
	return titles[statusCode] || "Error del servidor";
};

/**
 * @description Función helper para obtener mensaje de error genérico
 */
const getErrorMessage = (statusCode) => {
	const messages = {
		400: "La solicitud contiene datos inválidos",
		401: "Se requiere autenticación para acceder a este recurso",
		403: "No tienes permisos para realizar esta acción",
		404: "El recurso solicitado no fue encontrado",
		409: "El recurso ya existe o hay un conflicto",
		422: "Los datos enviados no pueden ser procesados",
		500: "Ocurrió un error interno en el servidor",
		503: "El servicio no está disponible temporalmente",
	};
	return messages[statusCode] || "Algo salió mal en el servidor";
};
