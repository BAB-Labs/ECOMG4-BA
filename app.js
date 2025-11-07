import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { config } from "./src/config/config.js";
import { logInfo } from "./src/utils/logger.utils.js";
import routes from "./src/routes/index.js";
import {
	corsOptions,
	errorHandler,
	notFoundHandler,
} from "./src/middlewares/index.js";
import { setupSwagger } from "./src/config/swagger.config.js";

const port = config.port ?? 3000;

const app = express();

// ✅ 2. Configuracion de swagger para la documentacion de API's
setupSwagger(app);

// ✅ 2. Middlewares básicos
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(morgan("combined"));
app.use(helmet());

// ✅ 3. Rutas Centralizadas
app.use(routes);

// ✅ 4. Ruta raíz de entrada cuando entras al servidor local
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
		documentation: `${config.docs.baseUrl}`,
	});
});

// ✅ 5. Middleware de errores
app.use(notFoundHandler);
app.use(errorHandler);

// ✅ 6. Asignacion del puerto para el backend
app.set("port", port);

// ✅ 7. Ejecucion del servidor de forma local
app.listen(app.get("port"), () => {
	console.log(`\n🚀 ========================================`);
	console.log(`🚀  BACKEND INICIADO CORRECTAMENTE`);
	console.log(`🚀  Servidor: http://localhost:${port}`);
	console.log(`🚀  Entorno: ${config.nodeEnv}`);
	console.log(`🚀  Hora: ${new Date().toLocaleString()}`);
	console.log(`🚀 ========================================\n`);
});

export default app;
