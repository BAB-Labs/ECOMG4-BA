// Importaciones
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "./src/config/config.js";
import { corsOptions } from "./src/middlewares/cors.middlewares.js";

// Puerto que se tiene que ocupar
const port = config.port ?? 3000;

// Crear instancia de la aplicación
const app = express();

//  Middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));

// Ruta raiz
app.get("/", (_req, res) => {
	res.status(304).json({
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
		// documentation: `${config.docs.baseUrl}`,
	});
});

// Levantando el servidor y esuchando en el puerto localhost:3000
app.listen(port, () => {
	console.log(
		`API funcionando correctamente, servidor corriendo en el puerto http://localhost:${port}`,
	);
});
