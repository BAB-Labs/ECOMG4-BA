import dotenv from "dotenv";
dotenv.config();

// Parseo de tiempo en unidades que tengan caducidad
const parseExpiration = (value) => {
	if (!value) return 1000 * 60 * 60 * 12;

	const match = value.match(/^(\d+)([smhd])$/i);
	if (!match) return Number(value);

	const num = parseInt(match[1], 10);
	const unit = match[2].toLowerCase();

	switch (unit) {
		case "s":
			return num * 1000;
		case "m":
			return num * 1000 * 60;
		case "h":
			return num * 1000 * 60 * 60;
		case "d":
			return num * 1000 * 60 * 60 * 24;
		default:
			return num;
	}
};

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
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 50,
		connectTimeout: 10000,
		acquireTimeout: 10000,
	},
	cookie: {
		cookieMaxAge: parseExpiration(process.env.JWT_EXPIRES_COOKIE),
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		expiresIn: process.env.JWT_EXPIRES_IN,
	},
	docs: {
		baseUrl: process.env.BASE_URL_SWAGGER,
	},
	api: {
		basePath: `/api/${process.env.API_VERSION}`,
	},
};
