import winston from "winston";
import path from "path";

// Definir niveles de log y colores
const logLevels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

// Configurar formatos
const logFormat = winston.format.combine(
	winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
	winston.format.errors({ stack: true }),
	winston.format.json(),
);

const consoleFormat = winston.format.combine(
	winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
	winston.format.colorize(),
	winston.format.printf(({ timestamp, level, message, stack }) => {
		if (stack) {
			return `${timestamp} ${level}: ${message}\n${stack}`;
		}
		return `${timestamp} ${level}: ${message}`;
	}),
);

// Crear el logger
const logger = winston.createLogger({
	levels: logLevels,
	level: process.env.LOG_LEVEL || "info",
	format: logFormat,
	transports: [
		// Archivo para todos los logs
		new winston.transports.File({
			filename: path.join("logs", "combined.log"),
			level: "debug",
		}),
		// Archivo solo para errores
		new winston.transports.File({
			filename: path.join("logs", "error.log"),
			level: "error",
		}),
	],
});

// Si estamos en desarrollo, agregar consola con colores
if (process.env.NODE_ENV === "development") {
	logger.add(
		new winston.transports.Console({
			format: consoleFormat,
			level: "debug",
		}),
	);
}

// FUNCIONES HELPER CENTRALIZADAS
export const logInfo = (message, meta = {}) => {
	logger.info(message, meta);
};

export const logError = (message, error = null) => {
	if (error) {
		logger.error(message, { error: error.message, stack: error.stack });
	} else {
		logger.error(message);
	}
};

export const logWarning = (message, meta = {}) => {
	logger.warn(message, meta);
};

export const logDebug = (message, meta = {}) => {
	logger.debug(message, meta);
};

export const logHttp = (message, meta = {}) => {
	logger.http(message, meta);
};

// Exportar el logger original también por si se necesita
export default logger;
