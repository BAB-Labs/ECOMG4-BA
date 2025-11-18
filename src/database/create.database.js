import fs from "node:fs";
import path from "node:path";
import { pool } from "../lib/db.js";

const createDataBase = async () => {
	try {
		console.log("🚀 Ejecutando schema para crear base de datos...");

		const queryPath = path.join("ECOMG4-TB1.sql");

		if (!fs.existsSync(queryPath)) {
			console.log("❌ No se encontró el archivo SQL en:", queryPath);
			return;
		}

		const sql = fs.readFileSync(queryPath, "utf8");

		await pool.query(sql);

		console.log("✅ Base de datos creada correctamente");
	} catch (error) {
		console.error("❌ Error ejecutando script SQL:", error.message);
		return;
	} finally {
		await pool.end();
		process.exit(0);
	}
};

createDataBase();
