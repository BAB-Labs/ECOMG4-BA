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
import { corsOptions } from "./src/middlewares/cors.middlewares.js";

const port = config.port ?? 3000;

const app = express();

// Middlewares básicos
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Morgan con logger centralizado - ✅ PARTE DEL LOGGER
app.use(
	morgan("combined", {
		stream: {
			write: (message) => logHttp(message.trim()),
		},
	}),
);

// Ruta raíz básica
app.get("/", (_req, res) => {
	logInfo("Root endpoint accessed");
	res.status(200).json({
		description: "E-Commerce API",
		name: "E-commerce",
		version: "0.0.1",
		status: "🟢 API funcionando correctamente",
	});
});

app.listen(port, () => {
	// MENSAJE SUPER VISIBLE - ✅ PARTE DEL LOGGER
	console.log(`\n🚀 ========================================`);
	console.log(`🚀  BACKEND INICIADO CORRECTAMENTE`);
	console.log(`🚀  Servidor: http://localhost:${port}`);
	console.log(`🚀  Entorno: ${process.env.NODE_ENV || "development"}`);
	console.log(`🚀  Hora: ${new Date().toLocaleString()}`);
	console.log(`🚀 ========================================\n`);

	// Logs Winston - ✅ PARTE DEL LOGGER
	logInfo(`API funcionando en puerto http://localhost:${port}`);
	logDebug(`Entorno: ${process.env.NODE_ENV}`);
});

export default app;
