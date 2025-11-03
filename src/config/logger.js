import winston from "winston";
import path from "path";

const logLevels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

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

const logger = winston.createLogger({
	levels: logLevels,
	level: process.env.LOG_LEVEL || "info",
	format: logFormat,
	transports: [
		new winston.transports.File({
			filename: path.join("logs", "combined.log"),
			level: "debug",
		}),

		new winston.transports.File({
			filename: path.join("logs", "error.log"),
			level: "error",
		}),
	],
});

if (process.env.NODE_ENV === "development") {
	logger.add(
		new winston.transports.Console({
			format: consoleFormat,
			level: "debug",
		}),
	);
}

export default logger;
