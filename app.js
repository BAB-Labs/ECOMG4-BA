import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "./src/config/config.js";
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

// Morgan básico (sin integración con Winston para este ticket)
app.use(morgan("combined"));

// Ruta raíz básica
app.get("/", (_req, res) => {
	res.status(200).json({
		description: "E-Commerce API",
		name: "E-commerce",
		version: "0.0.1",
		status: "🟢 API funcionando correctamente",
	});
});

// ✅ RUTA DE PRUEBA PARA VALIDAR ERROR HANDLER (REMOVER ANTES DEL COMMIT)
app.get("/api/test-error", (req, res, next) => {
	const testError = new Error("Error de prueba para validar error handler");
	testError.statusCode = 418; // I'm a teapot
	next(testError);
});

// ✅ MIDDLEWARES DE ERROR - PARTE DEL ERROR HANDLER
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`🚀 Servidor en http://localhost:${port}`);
	console.log(`⚠️  Ruta de prueba: http://localhost:${port}/api/test-error`);
	console.log(`🔍 Prueba 404: http://localhost:${port}/ruta-inexistente`);
});

export default app;
