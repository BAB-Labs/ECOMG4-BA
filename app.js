import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "./src/config/config.js";
import { corsOptions } from "./src/middlewares/cors.middlewares.js";
import {
	logInfo,
	logError,
	logWarning,
	logHttp,
	logDebug,
} from "./src/config/logger.js";

const port = config.port ?? 3000;

const app = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(
	morgan("combined", {
		stream: {
			write: (message) => logHttp(message.trim()),
		},
	}),
);

app.get("/", (_req, res) => {
	logInfo("Root endpoint accessed");

	res.status(200).json({
		description:
			"E-Commerce para la gestion de contenido en productos y servicios del mercado",
		name: "E-commerce",
		version: "0.0.1",
		author: {
			name: "BAB-Labs",
			github: "https://github.com/BAB-Labs",
		},
		api: "/api/v1",
		status: "🟢 API funcionando correctamente",
	});
});

app.get("/health", (_req, res) => {
	logInfo("Health check endpoint called");

	res.status(200).json({
		status: "OK",
		message: "API funcionando correctamente",
		timestamp: new Date().toISOString(),
		environment: process.env.NODE_ENV,
	});
});

app.use((req, res, next) => {
	logWarning(`Ruta no encontrada: ${req.originalUrl}`);

	res.status(404).json({
		error: "Ruta no encontrada",
		path: req.originalUrl,
		timestamp: new Date().toISOString(),
	});
});

app.use((error, req, res, next) => {
	logError("Error no manejado", error);

	res.status(500).json({
		error: "Error interno del servidor",
		message:
			process.env.NODE_ENV === "development" ? error.message : "Algo salió mal",
		timestamp: new Date().toISOString(),
	});
});

app.listen(port, () => {
	logInfo(
		`API funcionando correctamente, servidor corriendo en el puerto http://localhost:${port}`,
	);
	logDebug(`Entorno: ${process.env.NODE_ENV}`);
	logDebug(`Log level: ${process.env.LOG_LEVEL || "info"}`);
});

export default app;
