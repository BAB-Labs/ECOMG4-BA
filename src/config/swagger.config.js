import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

// Obtener __dirname equivalenbte en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerDocument = YAML.load(
	resolve(__dirname, "../docs/swagger/index.yaml"),
);

export const setupSwagger = (app) => {
	const theme = new SwaggerTheme();
	app.use(
		"/api/docs",
		swaggerUI.serve,
		swaggerUI.setup(swaggerDocument, {
			customCss: theme.getBuffer(SwaggerThemeNameEnum.DRACULA),
		}),
	);
};
