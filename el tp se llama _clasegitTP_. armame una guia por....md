Aquí tienes la guía completa y estructurada del trabajo práctico **clasegitTP**, ordenada paso a paso de forma pedagógica: cada concepto teórico se introduce exactamente en el momento en que se puede verificar y ejecutar en la práctica con comandos reales.

## **📌 Guía Técnica del Trabajo Práctico: clasegitTP**

---

### **👑 Fase 0: Inicialización del Repositorio (Docente / Líder)**

#### **💡 Concepto Clave 1: Rama `main` vs `master`**
* **¿La rama inicial es `main` por defecto?**  
  Históricamente en Git la rama por defecto se llamaba `master`. Actualmente, plataformas como GitHub usan `main`. El comando `git branch -M main` fuerza el renombrado de la rama actual a `main` para garantizar compatibilidad total con GitHub antes de subir el primer commit.

#### **Comandos de Inicialización (Docente):**
Si creas el repositorio vacío en GitHub, ejecutas en la terminal:

```bash
echo "# ClaseGitTP" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/fiemcasals/ClaseGitTP.git
git push -u origin main
```

**Explicación comando por comando:**
> 1. **`echo "# ClaseGitTP" >> README.md`**: Crea un archivo de texto plano con el título del proyecto.  
> 2. **`git init`**: Inicializa un repositorio Git local en la carpeta actual (`.git`).  
> 3. **`git add README.md`**: Pasa el archivo al *Staging Area* (área de preparación).  
> 4. **`git commit -m "first commit"`**: Guarda permanentemente el commit en el historial local.  
> 5. **`git branch -M main`**: Renombra formalmente la rama activa a `main` (`-M` fuerza el cambio).  
> 6. **`git remote add origin <URL>`**: Asocia tu repositorio local con el repositorio remoto en GitHub bajo el alias `origin`.  
> 7. **`git push -u origin main`**: Sube el contenido a GitHub. El flag `-u` (*set-upstream*) vincula permanentemente la rama local `main` con `origin/main`.

---

### **👨‍💻 Fase 1: Preparación del Entorno por Dev A**

#### **1. Clonar el repositorio remoto:**
```bash
git clone https://github.com/fiemcasals/ClaseGitTP.git
cd ClaseGitTP
```

#### **💡 Concepto Clave 2: Sintaxis de `git commit -am` y las 3 Áreas de Git**
* **Desglose de flags:**
  * `-a` (*all/tracked*): Auto-selecciona todos los archivos que ya están bajo seguimiento (*tracked*) y han sido modificados.
  * `-m` (*message*): Pasa el mensaje directamente entre comillas.
* **⚠️ La trampa de los archivos nuevos (*untracked*):**
  El flag `-a` **NO incluye archivos nuevos**. Cuando creas `receta.txt` por primera vez, es **obligatorio** hacer primero `git add receta.txt`.

#### **2. Crear el archivo base `receta.txt`:**
Crea el archivo `receta.txt` con el siguiente contenido:

```plaintext
# Receta de Pizza Casera

Ingredientes:
- 500g de harina

Instrucciones:
1. Mezclar la harina con agua.
```

#### **3. Registrar y subir la estructura inicial a `main`:**
```bash
git status
git add receta.txt
git commit -m "docs: agregar estructura inicial de la receta"
git push origin main
```

---

### **👩‍💻 Fase 2: Incorporación de Dev B (Permisos y Clonado)**
*(Dev B debe tener permisos de colaborador agregados en la pestaña Settings > Collaborators del repositorio).*

```bash
git clone https://github.com/fiemcasals/ClaseGitTP.git
cd ClaseGitTP
```
*(Dev B ya obtiene el archivo `receta.txt` creado por Dev A).*

---

### **🔀 Fase 3: Desarrollo de Features en Paralelo**

#### **💡 Concepto Clave: Gestión de Ramas — Crear, Listar y Cambiar (`git checkout` vs `git switch`)**
* **¿Qué es una rama en Git?**  
  No es una copia pesada de archivos. Es un **puntero liviano** (un archivo de texto de 41 bytes) que apunta al último commit de esa línea de trabajo.
* **Comandos esenciales para cambiar de rama:**
  ```bash
  # 1. Ver qué ramas existen localmente y cuál está activa (*):
  git branch

  # 2. Crear y cambiarse a una nueva rama en un solo paso:
  git switch -c feature/ingredientes
  # (Sintaxis clásica: git checkout -b feature/ingredientes)

  # 3. Cambiar a una rama ya existente (ej: volver a main):
  git switch main
  # (Sintaxis clásica: git checkout main)

  # 4. Volver a la rama anterior al instante:
  git switch -
  # (Sintaxis clásica: git checkout -)

  # 5. Listar ramas locales y remotas en GitHub:
  git branch -a
  ```
* **¿Qué pasa con tus archivos en disco?**  
  Git actualiza los archivos de tu carpeta de trabajo (*Working Directory*) para reflejar exactamente el estado del commit de la rama a la que te mudas.

---

#### **👤 Acciones de Dev A (Añade ingredientes en rama separada):**
```bash
git switch -c feature/ingredientes
```
> * **`git switch -c <nombre>`**: Crea una nueva rama local y se posiciona en ella (equivalente clásico: `git checkout -b <nombre>`).

Edita `receta.txt` agregando levadura y sal:
```plaintext
- 10g de levadura
- 1 cucharada de sal
```

Registra y sube la rama:
```bash
git add receta.txt
git commit -m "feat: agregar levadura y sal"
git push origin feature/ingredientes
```

#### **💡 Concepto Clave 3: ¿Qué es un Pull Request? Git CLI vs GitHub**
* Dev A ya subió su rama `feature/ingredientes` a GitHub.
* **Git nativo (CLI):** Solo maneja branches y merges locales/remotos directos. No tiene la función de "Pull Request".
* **GitHub (Plataforma Web):** Introduce el Pull Request (PR) como mecanismo de *Code Review* (revisión de código colaborativa, discusión y validación) antes de fusionar a la rama `main`.

#### **En la web de GitHub (Dev A realiza el Merge):**
> 1. Va a la pestaña **Pull Requests** y presiona **New Pull Request**.  
> 2. Selecciona `base: main` 🠔 `compare: feature/ingredientes`.  
> 3. Presiona **Create Pull Request** y luego clic en **Merge Pull Request** y **Confirm Merge**.

---

#### **👤 Acciones de Dev B (Añade pasos en paralelo):**
```bash
git switch -c feature/instrucciones
```
*(Equivalente clásico: `git checkout -b feature/instrucciones`)*

Edita `receta.txt` agregando los pasos 2 y 3:
```plaintext
2. Dejar leudar 1 hora.
3. Hornear a 200 grados.
```

Registra y sube la rama:
```bash
git add receta.txt
git commit -m "feat: agregar pasos de leudado y horneado"
git push origin feature/instrucciones
```

#### **En la web de GitHub (Dev B):**
> 1. Abre el PR de `feature/instrucciones` hacia `main`.  
> 2. Realiza el **Merge**. Como Dev A y Dev B editaron líneas distintas (*hunks* independientes), GitHub resuelve la integración automáticamente sin conflictos.

---

#### **💡 Concepto Clave 4: `git fetch` vs `git pull` (Inspección Segura sin perder datos locales)**
* **Situación real:** En GitHub `main` ahora tiene tanto los ingredientes como las instrucciones. Pero en tu máquina local puedes estar trabajando en otra rama o con cambios propios.
* **¿Qué hace `git fetch origin`?**  
  Descarga todas las novedades del servidor remoto al puntero `origin/main` en tu base de datos interna, **sin tocar ni modificar tus archivos de trabajo en disco**. Tus datos locales están 100% seguros.
* **Herramientas de inspección en vivo:**
  ```bash
  # 1. Consulta silenciosa y segura al servidor:
  git fetch origin

  # 2. Revisa qué commits nuevos hay en GitHub que aún no integraste:
  git log HEAD..origin/main --oneline

  # 3. Compara las diferencias exactas de código:
  git diff HEAD origin/main

  # 4. Lee el archivo remoto completo sin modificar tu archivo local en disco:
  git show origin/main:receta.txt
  ```
* **¿Qué hace `git pull origin main`?**  
  Es el atajo automático que ejecuta `git fetch` + `git merge origin/main` aplicando los cambios inmediatamente sobre tus archivos.

#### **🔄 Sincronización final de la Fase 3 (Ambos desarrolladores):**
Ambos vuelven a la rama principal y descargan los cambios integrados:
```bash
git switch main
git pull origin main
```
*(Equivalente clásico: `git checkout main`)*

---

### **💥 Fase 4: Provocar y Resolver un Conflicto**

#### **👤 Paso 1: Dev A edita y pushea primero**

```bash
git switch -c fix/tiempo-a
```

Modifica la línea del horno en `receta.txt`:
```plaintext
3. Hornear a 220 grados por 15 minutos.
```

Registra y sube la modificación:
```bash
git commit -am "fix: subir temperatura de horneado a 220"
git push origin fix/tiempo-a
```

Dev A va a GitHub, abre el **Pull Request** de `fix/tiempo-a` y hace **Merge** inmediatamente hacia `main`.

---

#### **👤 Paso 2: Dev B edita la misma línea (sin actualizar su rama)**

```bash
git switch -c fix/tiempo-b
```

Edita **la misma línea** del horno en `receta.txt`:
```plaintext
3. Hornear a 180 grados por 30 minutos.
```

Registra localmente sus cambios:
```bash
git commit -am "fix: bajar temperatura a 180 para coccion lenta"
git push origin fix/tiempo-b
```

---

#### **👤 Paso 3: Dev B intenta actualizar e integrar**

Antes de hacer el PR en GitHub, Dev B intenta traer los cambios actuales de `main` a su rama local para validar:

```bash
git fetch origin
git merge origin/main
```

**Respuesta de la terminal para Dev B:**
```plaintext
CONFLICT (content): Merge conflict in receta.txt
Automatic merge failed; fix conflicts and then commit the result.
```

#### **💡 El Botón de Pánico: ¿Qué pasa si quiero cancelar el merge? (`git merge --abort`)**
Si en pleno conflicto descubres que no estás listo para resolverlo, que te equivocaste de rama o que prefieres dar marcha atrás sin dejar archivos rotos:

```bash
git merge --abort
```
* **¿Qué hace exactamente `git merge --abort`?**
  1. **Cancela inmediatamente el merge:** Detiene la integración en curso.
  2. **Limpia las marcas:** Elimina todos los delimitadores `<<<<<<<`, `=======` y `>>>>>>>`.
  3. **Restaura el estado original:** Vuelve todos los archivos al estado exacto en que estaban antes de lanzar el comando `git merge`.
  4. **Salida limpia:** Tu rama pasa del estado `fix/tiempo-b|MERGING` a `fix/tiempo-b` normal y segura.

---

#### **👤 Paso 4: Resolución manual del conflicto por Dev B**

Dev B abre el archivo `receta.txt` en su editor de texto y observa las marcas generadas por Git:

```plaintext
<<<<<<< HEAD
3. Hornear a 180 grados por 30 minutos.
=======
3. Hornear a 220 grados por 15 minutos.
>>>>>>> origin/main
```

**Explicación de marcas:**
> * `<<<<<<< HEAD`: Inicio del cambio local de Dev B.  
> * `=======`: Separador de propuestas.  
> * `>>>>>>> origin/main`: Cambio entrante desde la rama main remota (subido por Dev A).

**Acción de Dev B:**
> 1. Consulta con Dev A y acuerdan dejar un valor intermedio: `3. Hornear a 200 grados por 20 minutos.`  
> 2. Borra manualmente las líneas con los símbolos `<<<<<<<`, `=======` y `>>>>>>>`.  
> 3. Guarda el archivo.  
> 4. Concluye el merge ejecutando:

```bash
git status
git add receta.txt
git commit -m "fix: resolver conflicto de temperatura de horneado"
git push origin fix/tiempo-b
```

> 5. Dev B va a GitHub, abre el **Pull Request** de `fix/tiempo-b` hacia `main` y realiza el **Merge** final.

---

### **🌳 Fase 5: Inspección del árbol de ramas**

Ambos desarrolladores sincronizan sus ramas locales `main`:

```bash
git switch main
git pull origin main
```

**Visualización por consola:**
```bash
git log --graph --oneline --all
```

> * **`git log`**: Muestra el historial de commits.  
> * **`--graph`**: Dibuja un gráfico en caracteres ASCII mostrando la estructura de ramas y fusiones.  
> * **`--oneline`**: Condensa cada commit a una sola línea (hash corto y mensaje).  
> * **`--all`**: Muestra los commits de todas las ramas locales y remotas, no solo de la actual.

**Visualización gráfica en GitHub:**
> 1. Ingresan a [https://github.com/fiemcasals/ClaseGitTP](https://github.com/fiemcasals/ClaseGitTP).  
> 2. Hacen clic en la pestaña **Insights** (o **Graphs**) y seleccionan **Network**.  
> 3. Observarán la representación visual interactiva con los puntos de bifurcación de las ramas feature y fix, los commits individuales y los puntos donde se volvieron a unir a la rama main.