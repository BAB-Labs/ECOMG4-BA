import dotenv from "dotenv";
dotenv.config();

// Exportacion del objeto de configuracion de variables de entorno
export const config = {
	port: process.env.PORT || 3000,
	nodeEnv: process.env.NODE_ENV,
	db: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		runtime: process.env.RUNTIME,
		connectTimeout: 30000,
		waitForConnections: true,
		connectionLimit: 100,
		queueLimit: 0,
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		expiresIn: process.env.EXP_TOKEN,
	},
	docs: {
		baseUrl: process.env.BASE_URL_SWAGGER,
	},
	api: {
		basePath: `/api/${process.env.API_VERSION}`,
	},
};
