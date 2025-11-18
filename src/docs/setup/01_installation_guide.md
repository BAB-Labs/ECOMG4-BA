# ⚙️ Guía de Instalación y Configuración — E-Commerce API (Backend)

> **Versión:** 2025  
> **Proyecto:** E-Commerce Supermarket — MVP  
> **Equipo:** BAB-Labs (Trainee & Junior Developers)

---

## 🧰 1. Requerimientos Iniciales

Asegúrate de tener instaladas las siguientes herramientas:

| Herramienta | Versión recomendada | Descripción |
|--------------|---------------------|--------------|
| Node.js | v22.11.0 | Gestor de entorno JavaScript |
| PNPM | Última versión (vía Corepack) | Gestor de paquetes |
| MySQL Workbench | 8.x | Cliente de base de datos |
| Visual Studio Code | — | Editor de código |
| Git | Última versión | Control de versiones |
| Postman | Última versión | Herramienta para probar API´s |

> ⚙️ **Nota:** No se requiere configuración SSH para Git en este proyecto.

---

## 💻 2. Instalación de NVM (Node Version Manager)

### 🔹 En Windows
1. Descarga desde 👉 [nvm-windows releases](https://github.com/coreybutler/nvm-windows/releases)
2. Instala y abre **PowerShell como administrador**.
3. Verifica la instalación:
```shell
    nvm version
```
### 🔹 En Linux
```shell
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash  
```
Luego, reinicia la terminal y verifica:

```shell
    nvm --version
```

## 🟩 3. Instalación de Node.js y Corepack

🧠 Al clonar el proyecto, la versión correcta de Node.js (22.11.0) se instalará automáticamente gracias al archivo .vscode/tasks.json.

1. **Instala y habilita Corepack:**
```shell
    npm install --global corepack@latest
    npm install -g pnpm@latest-10
```
2. **Verifica:**
```shell
    node -v
    pnpm -v
```

## 🗄️ 4. Instalación de MySQL Workbench

- Descarga e instala desde 👉 [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
- Verifica la conexión local con el usuario root.

🎥 Tutorial recomendado:
- [Cómo instalar y configurar MySQL Workbench](https://www.youtube.com/watch?v=EmQZt6o6-78&t=14s)

## 🔧 5. Configuración de Git

Configura tus credenciales globales:

```shell
    git config --global user.name "Tu Nombre"
    git config --global user.email "tunombre@empresa.com"
```

Ajusta saltos de línea según tu sistema:

```shell
    # Windows
    git config --global core.autocrlf true

    # Linux / macOS
    git config --global core.autocrlf input
```

Verifica la conexión con el repositorio remoto:

```shell
    git remote -v
    git pull origin main
    git push origin main
```
> 🎥 Tutorial: [Configurar Git paso a paso](https://www.youtube.com/watch?v=jdXKwLNUfmg)

## 🚀 6. Inicialización del Proyecto Backend
1. **Clona el repositorio:**
```shell
  git clone <url-del-repositorio>
  cd ECOMG4-BA
```

2. **Instalar dependencias:**

```shell
  pnpm install
```

3. **Inicializa Husky:**

```shell
    pnpm add husky -D -E
    pnpm exec husky init
    pnpm exec husky add .husky/pre-commit "pnpm exec biome check ."
    pnpm exec husky add .husky/pre-push "pnpm test"
```

4. **Configura Biome:**

```shell
    pnpm add -D -E @biomejs/biome
    pnpm exec biome init
```

> 💡 El proyecto ya está configurado en el repositorio principal.
> Estos pasos sirven para familiarizarte con el entorno y las herramientas necesarias.

## 🩺 7. Troubleshooting
| Problema                                             | Solución                                                                                |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Error con Corepack:** `Cannot find matching keyid` | Ejecutar:<br>`bash<br>npm install --global corepack@latest<br>corepack enable pnpm<br>` |
| **NVM no reconocido**                                | Reiniciar la terminal o revisar variables de entorno                                    |
| **PNPM no ejecuta comandos**                         | Asegurarse de que Corepack esté habilitado                                              |

## ⚙️ 8. Habilitar ejecución de scripts en Windows
Windows bloquea scripts PowerShell por seguridad. Para permitirlos:

- Abre PowerShell como administrador.
- Una vez abierta la aplicación ejecutaremos el siguiente comando:
```shell
    Get-ExecutionPolicy -List
```

#### Tipos de políticas más comunes:

| Política         | Descripción                                         |
| ---------------- | --------------------------------------------------- |
| **Restricted**   | No permite ejecutar scripts (por defecto)           |
| **RemoteSigned** | Permite scripts locales, requiere firma en externos |
| **Unrestricted** | Permite todos los scripts                           |
| **AllSigned**    | Todos los scripts deben estar firmados              |

- Esto nos muestra que la política de ejecución no está definida. Para poder corregir esto deberemos ejecutar el siguiente comando:

```shell 
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser ​
```
> Se le tiene que poner que si estas de acuerdo en habilitar la ejecucion de scripts o poner una S

- Si volvemos a listar los permisos podremos ver que el resultado ha cambiado y para el usuario actual la política de ejecución tiene el valor «RemoteSigned»

```shell
    Get-ExecutionPolicy -List
```