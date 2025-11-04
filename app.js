import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "./src/config/config.js";
import {
	logInfo,
	logError,
	logWarning,
	logHttp,
	logDebug,
} from "./src/config/logger.js";
import routes from "./src/routes/index.js";
import {
	corsOptions,
	notFoundHandler,
	errorHandler,
} from "./src/middlewares/index.js";

const port = config.port ?? 3000;

const app = express();

// Middlewares básicos
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Morgan con logger centralizado
app.use(
	morgan("combined", {
		stream: {
			write: (message) => logHttp(message.trim()),
		},
	}),
);

// RUTAS CENTRALIZADAS
app.use(routes);

// Ruta raíz
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

// Middleware para rutas no encontradas (404) - DEBE IR DESPUÉS DE LAS RUTAS
app.use(notFoundHandler);

// Middleware global de manejo de errores - DEBE IR AL FINAL
app.use(errorHandler);

app.listen(port, () => {
	logInfo(
		`API funcionando correctamente, servidor corriendo en el puerto http://localhost:${port}`,
	);
	logDebug(`Entorno: ${process.env.NODE_ENV}`);
	logDebug(`Log level: ${process.env.LOG_LEVEL || "info"}`);
});

export default app;
