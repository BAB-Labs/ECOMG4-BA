import mysql from "mysql2/promise";
import { config } from "./config.js";
import { logInfo, logError } from "./logger.js";

// Crear pool de conexiones usando solo opciones válidas para mysql2
export const pool = mysql.createPool({
	host: config.db.host,
	user: config.db.user,
	password: config.db.password,
	database: config.db.database,
	port: config.db.port || 3306,
	waitForConnections: config.db.waitForConnections,
	connectionLimit: config.db.connectionLimit,
	queueLimit: config.db.queueLimit,
	connectTimeout: config.db.connectTimeout,
});

// Función opcional para verificar conexión al iniciar
export const testConnection = async () => {
	try {
		const connection = await pool.getConnection();
		logInfo("✅ Conectado a la base de datos MySQL");
		connection.release();
		return true;
	} catch (error) {
		logError("❌ Error conectando a la base de datos:", error.message);
		return false;
	}
};

// Probar conexión al cargar el módulo (opcional)
testConnection().then((success) => {
	if (success) {
		logInfo("✅ Conexión a BD verificada correctamente");
	} else {
		logError("❌ No se pudo establecer conexión con la BD");
	}
});
