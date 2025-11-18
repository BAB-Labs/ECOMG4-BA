import fs from "node:fs";
import path from "node:path";
import { pool } from "../lib/db.js";

function runSeeder() {
	try {
		console.log("🚀 Ejecutando Seeder...");

		// Ruta hacia tu archivo SQL
		const sqlPath = path.join(process.cwd(), "src/lib/seeding.sql");
		const sql = fs.readFileSync(sqlPath, "utf8");

		// Ejecutar el contenido del archivo SQL
		pool.query(sql);
		console.log("✅ Datos insertados correctamente 🚀");
	} catch (error) {
		console.error("❌ Error ejecutando seeder:", error.message);
	}
}

runSeeder();
