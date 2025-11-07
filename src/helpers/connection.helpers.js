import { pool } from "../lib/db.js";

export const connectionQuery = (sql, params) => {
	return new Promise((resolve, reject) => {
		pool.query(sql, params, (error, results) => {
			if (error) {
				console.error("Error en la consulta a la base de datos");
				return reject(error);
			}
			resolve(results);
		});
	});
};
