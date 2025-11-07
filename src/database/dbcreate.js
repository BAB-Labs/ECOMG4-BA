require("dotenv").config();
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	multipleStatements: true,
});

connection.connect((err) => {
	if (err) {
		console.error("❌ Error al conectar a MySQL:", err.message);
		return;
	}

	console.log("✅ Conectado a MySQL correctamente.");

	// Ruta absoluta del archivo schema.sql
	const schemaPath = path.join(__dirname, "schema.sql");
	const sql = fs.readFileSync(schemaPath, "utf8");

	connection.query(sql, (error) => {
		if (error) {
			console.error("❌ Error al crear las tablas:", error.message);
		} else {
			console.log("✅ Base de datos y tablas creadas correctamente.");
		}
		connection.end();
	});
});
