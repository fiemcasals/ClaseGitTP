Aquí tienes la guía completa y estructurada del trabajo práctico **clasegitTP**, redactada paso a paso por alumno, sin omitir comandos ni su explicación técnica, resolviendo tus dudas puntuales sobre los comandos de GitHub, los Pull Requests, los flags de los comandos y el funcionamiento interno de fetch.

## **📌 Guía Técnica del Trabajo Práctico: clasegitTP**

### **💡 Conceptos previos y aclaraciones clave**

* **¿La rama inicial es main por defecto?**  
  Historicamente en Git la rama por defecto se llamaba master. Actualmente, la mayoría de instalaciones modernas y plataformas como GitHub usan main. El comando git branch \-M main fuerza que la rama actual pase a llamarse main explícitamente para garantizar compatibilidad total con GitHub.  
* **Sintaxis de git commit \-am "mensaje":**  
  Es una combinación de dos flags:  
  * \-a (*all*): Selecciona automáticamente todos los archivos que ya han sido rastreados (*tracked*) por Git y han sido modificados, ahorrándote ejecutar git add. **Ojo:** No agrega archivos nuevos (*untracked*).  
  * \-m (*message*): Le pasa el mensaje del commit directamente entre comillas desde la consola sin abrir un editor de texto (como Nano o Vim).  
* **¿Se puede hacer un Pull Request desde la consola?**  
  Git como herramienta de control de versiones **no incluye** el concepto de Pull Request (PR es una funcionalidad propia de plataformas web como GitHub, GitLab o Bitbucket). Por ende, con el comando nativo git no se hace un PR directamente; se realiza desde la interfaz gráfica de GitHub. *(Existe una herramienta CLI oficial llamada gh de GitHub que permite hacerlo, pero el flujo estándar de Git lo canaliza vía web).*  
* **¿Qué hace exactamente git fetch?**  
  git fetch descarga las novedades (ramas, commits, etiquetas) desde el servidor remoto a tu copia local, pero **sin alterar ni modificar los archivos de tu área de trabajo actual**. Actualiza tu "mapa local" de lo que pasa en GitHub (origin/main, origin/feature-x). Es una consulta segura para ver qué cambió antes de decidir fusionar (git merge). A diferencia de git pull (que descarga y aplica los cambios inmediatamente en tu código de forma automática), fetch te permite inspeccionar primero.

### **💻 Pasos iniciales (Líder del Proyecto / Docente)**

*(Solo para inicializar el repositorio desde cero en GitHub y vincular la máquina local).*  
Si creas el repositorio vacío en GitHub, ejecutas en la terminal:

Bash  
echo "\# ClaseGitTP" \>\> README.md  
git init  
git add README.md  
git commit \-m "first commit"  
git branch \-M main  
git remote add origin https://github.com/fiemcasals/ClaseGitTP.git  
git push \-u origin main

**Explicación comando por comando:**

> 1. **echo "\# ClaseGitTP" \>\> README.md**: Crea un archivo de texto plano llamado README.md con el título del proyecto.  
> 2. **git init**: Inicializa un repositorio Git local en la carpeta actual, creando el directorio oculto .git.  
> 3. **git add README.md**: Pasa el archivo README.md del "Área de trabajo" al "Área de preparación" (*Staging Area*), indicando que formará parte de la próxima foto (commit).  
> 4. **git commit \-m "first commit"**: Guarda permanentemente en el historial los archivos que estaban en el *Staging Area* con el mensaje especificado.  
> 5. **git branch \-M main**: Renombra formalmente la rama actual a main. El flag \-M fuerza el renombrado incluso si la rama ya existía.  
> 6. **git remote add origin \[https://github.com/fiemcasals/ClaseGitTP.git\](https://github.com/fiemcasals/ClaseGitTP.git)**: Asocia tu repositorio local con el repositorio remoto alojado en GitHub bajo el alias origin.  
> 7. **git push \-u origin main**: Sube el contenido de la rama local main hacia el servidor remoto origin. El flag \-u (*set-upstream*) establece un vínculo permanente entre tu rama local main y la remota, permitiendo que en el futuro solo debas escribir git push o git pull.

**1.Fase 1: Preparación del entorno por Dev A:**Desarrollador A: Configuración e inicio del proyecto.  
**1\. Clonar el repositorio remoto:**

Bash  
git clone https://github.com/fiemcasals/ClaseGitTP.git  
cd ClaseGitTP

> * **git clone \<URL\>**: Copia íntegramente el repositorio remoto alojado en GitHub a la máquina local, incluyendo todo el historial de commits, ramas y archivos. Descarga la carpeta lista para trabajar y configura automáticamente el remoto origin.  
> * **cd ClaseGitTP**: Cambia el directorio de la terminal para posicionarte dentro de la carpeta del proyecto.

**2\. Crear el archivo base receta.txt:**

Crea el archivo receta.txt con el siguiente contenido exacto:

Plaintext  
\# Receta de Pizza Casera

Ingredientes:  
\- 500g de harina

Instrucciones:  
1\. Mezclar la harina con agua.

**3\. Registrar y subir la estructura inicial a main:**

Bash  
git status  
git add receta.txt  
git commit \-m "docs: agregar estructura inicial de la receta"  
git push origin main

> * **git status**: Muestra el estado del directorio de trabajo. Informa qué archivos han sido modificados, cuáles no están siendo rastreados (*untracked*) y en qué rama estás parado.  
> * **git add receta.txt**: Coloca el nuevo archivo en el área de preparación (*Staging Area*).  
> * **git commit \-m "..."**: Asienta los cambios en el historial local.  
> * **git push origin main**: Envía los commits de la rama local main a la rama main del servidor origin (GitHub).

**2.Fase 2: Clonado del proyecto por Dev B:**Desarrollador B: Incorporación al proyecto.  
*(Dev B debe tener permisos de colaborador agregados en la pestaña Settings \> Collaborators del repositorio).*

**1\. Clonar el repositorio:**

Bash  
git clone https://github.com/fiemcasals/ClaseGitTP.git  
cd ClaseGitTP

*(Dev B ya obtiene el archivo receta.txt creado por Dev A).*

#### **3.Fase 3: Desarrollo de Features (Paralelo):Trabajo en paralelo en ramas separadas.**

👤 Acciones de Dev A (Añade ingredientes)

Bash  
git checkout \-b feature/ingredientes

> * **git checkout \-b \<nombre-rama\>**: Crea una nueva rama local y se cambia a ella en un solo paso. *(Nota: En versiones modernas de Git también puede usarse git switch \-c \<nombre-rama\>).*

Edita receta.txt agregando las siguientes líneas al final de los ingredientes:

Plaintext  
\- 10g de levadura  
\- 1 cucharada de sal

Registra y sube la rama:

Bash  
git add receta.txt  
git commit \-m "feat: agregar levadura y sal"  
git push origin feature/ingredientes

> * **git push origin feature/ingredientes**: Crea y sube la rama feature/ingredientes al repositorio remoto de GitHub.

**En la web de GitHub (Dev A):**

> 1. Va a la pestaña **Pull Requests** y presiona **New Pull Request**.  
> 2. Selecciona comparar main con feature/ingredientes.  
> 3. Presiona **Create Pull Request** y luego hace clic en **Merge Pull Request** para fusionar los cambios con la rama main.

#### ---

**👤 Acciones de Dev B (Añade pasos de preparación)**

Bash  
git checkout \-b feature/instrucciones

Edita receta.txt agregando las siguientes líneas al final de las instrucciones:

Plaintext  
2\. Dejar leudar 1 hora.  
3\. Hornear a 200 grados.

Registra y sube la rama:

Bash  
git add receta.txt  
git commit \-m "feat: agregar pasos de leudado y horneado"  
git push origin feature/instrucciones

**En la web de GitHub (Dev B):**

> 1. Entra a la solapa **Pull Requests**.  
> 2. Crea el PR de feature/instrucciones hacia main.  
> 3. Realiza el **Merge**. *(Como Dev A y Dev B editaron líneas completamente distintas del archivo, GitHub resuelve la integración automáticamente sin conflictos).*

#### ---

**🔄 Sincronización final de la Fase 3 (Ambos desarrolladores)**

Ambos vuelven a la rama principal y descargan los cambios integrados:

Bash  
git checkout main  
git pull origin main

> * **git checkout main**: Se cambia a la rama local main.  
> * **git pull origin main**: Descarga e integra (combina) automáticamente los últimos cambios de la rama main remota a tu rama main local. *(Es equivalente a ejecutar git fetch seguido de git merge).*

#### **4.Fase 4: Provocar y Resolver un Conflicto:Simulación y resolución de conflictos de integración.**

👤 Paso 1: Dev A edita y pushea primero

Bash  
git checkout \-b fix/tiempo-a

Modifica la línea del horno en receta.txt:

3\. Hornear a 220 grados por 15 minutos.

Registra y sube la modificación:

Bash  
git commit \-am "fix: subir temperatura de horneado a 220"  
git push origin fix/tiempo-a

> * **git commit \-am "..."**: Aplica el add de los archivos modificados que ya están bajo seguimiento y realiza el commit en un solo paso.

Dev A va a GitHub, abre el **Pull Request** y hace **Merge** inmediatamente hacia main.

#### ---

**👤 Paso 2: Dev B edita la misma línea (sin actualizar su rama)**

Bash  
git checkout \-b fix/tiempo-b

Edita **la misma línea** del horno en receta.txt:

3\. Hornear a 180 grados por 30 minutos.

Registra localmente sus cambios:

Bash  
git commit \-am "fix: bajar temperatura a 180 para coccion lenta"  
git push origin fix/tiempo-b

#### ---

**👤 Paso 3: Dev B intenta actualizar e integrar**

Antes de hacer el PR en GitHub, Dev B intenta traer los cambios actuales de main a su rama local para validar que todo esté al día:

Bash  
git fetch origin  
git merge origin/main

> * **git fetch origin**: Trae la información actualizada de todo el repositorio remoto (sabe que origin/main avanzó con el commit de Dev A), pero no toca los archivos locales de Dev B.  
> * **git merge origin/main**: Intenta fusionar la rama origin/main en la rama actual (fix/tiempo-b).

**Respuesta de la terminal para Dev B:**

Plaintext  
CONFLICT (content): Merge conflict in receta.txt  
Automatic merge failed; fix conflicts and then commit the result.

#### ---

**👤 Paso 4: Resolución manual del conflicto por Dev B**

Dev B abre el archivo receta.txt en su editor de texto y observa las marcas generadas por Git:

Plaintext  
\<\<\<\<\<\<\< HEAD  
3\. Hornear a 180 grados por 30 minutos.  
\=======  
3\. Hornear a 220 grados por 15 minutos.  
\>\>\>\>\>\>\> origin/main

**Explicación de marcas:**

> * \<\<\<\<\<\<\< HEAD: Inicio del cambio local de Dev B.  
> * \=======: Separador de propuestas.  
> * \>\>\>\>\>\>\> origin/main: Cambio entrante desde la rama main remota (subido por Dev A).

**Acción de Dev B:**

> 1. Consulta con Dev A y acuerdan dejar un valor intermedio: 3\. Hornear a 200 grados por 20 minutos.  
> 2. Borra manualmente las líneas con los símbolos \<\<\<\<\<\<\<, \======= y \>\>\>\>\>\>\>.  
> 3. Guarda el archivo.  
> 4. Concluye el merge ejecutando:

Bash  
git status  
git add receta.txt  
git commit \-m "fix: resolver conflicto de temperatura de horneado"  
git push origin fix/tiempo-b

> * **git add receta.txt**: Notifica a Git que el conflicto en este archivo ha sido resuelto.  
> * **git commit \-m "..."**: Crea el commit de resolución de merge.  
> * **git push origin fix/tiempo-b**: Sube la rama corregida a GitHub.  
> 5. Dev B va a GitHub, abre el **Pull Request** de fix/tiempo-b hacia main y realiza el **Merge** final.

**5.Fase 5: Inspección del árbol de ramas:**Visualización del árbol de commits.  
Ambos desarrolladores sincronizan sus ramas locales main:

Bash  
git checkout main  
git pull origin main

**Visualización por consola:**

Bash  
git log \--graph \--oneline \--all

> * **git log**: Muestra el historial de commits.  
> * **\--graph**: Dibuja un gráfico en caracteres ASCII mostrando la estructura de ramas y fusiones.  
> * **\--oneline**: Condensa cada commit a una sola línea (muestra el identificador Hash corto y el mensaje).  
> * **\--all**: Muestra los commits de todas las ramas locales y remotas, no solo de la actual.

**Visualización gráfica en GitHub:**

> 1. Ingresan a \[https://github.com/fiemcasals/ClaseGitTP\](https://github.com/fiemcasals/ClaseGitTP).  
> 2. Hacen clic en la pestaña **Insights** (o **Graphs**) y seleccionan **Network**.  
> 3. Observarán la representación visual interactiva con los puntos de bifurcación de las ramas feature y fix, los commits individuales y los puntos donde se volvieron a unir a la rama main.