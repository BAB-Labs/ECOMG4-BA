import { pool } from "../lib/db.js";

export const testDbConnectionModels = async () => {
	await pool.query("SELECT 1 as connected");

	return {
		host: pool.pool.config.connectionConfig.host,
		database: pool.pool.config.connectionConfig.database,
		connectionLimit: pool.pool.config.connectionLimit,
	};
};
