import fs from "node:fs";
import path from "node:path";
import { pool } from "../lib/db.js";
import { connectionQuery } from "../helpers/connection.helpers.js";

const runSeeder = async () => {
	try {
		console.log("🚀 Ejecutando Seeder...");

		const queryPath = path.join("src/database/seeding.sql");

		if (!fs.existsSync(queryPath)) {
			console.log("❌ No se encontró el archivo SQL en:", queryPath);
			return;
		}

		const sql = fs.readFileSync(queryPath, "utf8");

		await pool.query(sql);

		console.log(
			"✅ Datos insertados correctamente en la tabla de productos 🚀",
		);
		console.log("🗑️ Limpiando datos incrustados de seed dentro de 15s");

		await new Promise((r) => setTimeout(r, 15000));

		await connectionQuery("DELETE FROM products WHERE id IN (?)", [
			[20000, 20001, 20002, 20003, 20004],
		]);
	} catch (error) {
		console.error("❌ Error ejecutando seeder:", error.message);
		return;
	} finally {
		await pool.end();
		process.exit(0);
	}
};

runSeeder();
