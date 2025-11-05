require("dotenv").config();
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "schema.sql");
const schemaSQL = fs.readFileSync(schemaPath, "utf8");

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	multipleStatements: true,
});

connection.connect((err) => {
	if (err) {
		console.error("❌ Error al conectar con la base de datos:", err.message);
		return;
	}
	console.log("✅ Conectado a MySQL correctamente.");

	connection.query(schemaSQL, (err) => {
		if (err) {
			console.error("❌ Error al crear las tablas:", err.message);
		} else {
			console.log("✅ Base de datos y tablas creadas correctamente.");
		}

		connection.end();
	});
});
