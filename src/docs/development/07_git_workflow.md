## 🔄 Workflow de Git

### **Linea del Tiempo en desarollo**
- [ ] 🧭 Feature Flow
- [ ] 1️⃣ Crear Issue → 
- [ ] 2️⃣ Crear rama → 
- [ ] 3️⃣ Desarrollar → 
- [ ] 4️⃣ PR → 
- [ ] 5️⃣ Code Review → 
- [ ] 6️⃣ Merge a develop

### **Comandos Básicos**
```shell
    # 1. Crear nueva rama desde develop
    git checkout develop
    git pull origin develop
    git checkout -b feature/auth_middleware

    # 2. Trabajar en la rama
    git add .
    git commit -m "feat: add JWT authentication middleware"

    # 3. Push y crear PR
    git push origin feature/auth_middleware
    # Crear Pull Request desde GitHub

    # 4. Después del merge, limpiar rama local
    git checkout develop
    git pull origin develop
    git branch -d feature/auth_middleware
```

### **Convenciones de Commits**
```shell
    # Tipos de commits
    feat: nueva funcionalidad
    fix: corrección de bug
    update: actualización de funcionalidad existente
    docs: cambios en documentación
    style: formato, punto y coma faltante, etc
    refactor: refactoring de código
    test: agregar tests
    chore: actualizar tareas de build, configuraciones, etc

    # Ejemplos
    git commit -m "feat: add user authentication system"
    git commit -m "fix: resolve login validation bug"
    git commit -m "docs: update API documentation"
    git commit -m "test: add unit tests for user model"
```

### **Resolución de Conflictos**
```shell
    # 1. Actualizar develop
    git checkout develop
    git pull origin develop

    # 2. Hacer rebase de tu rama
    git checkout feature/mi-feature
    git rebase develop

    # 3. Resolver conflictos si existen
    # Editar archivos conflictivos
    git add .
    git rebase --continue

    # 4. Force push (solo en ramas de feature)
    git push --force origin feature/mi-feature
```