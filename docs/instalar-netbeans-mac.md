# Instalar Apache NetBeans en macOS (Apple Silicon)

Guía para dejar listo el entorno de desarrollo del **backend Java de EduTrack360** en este Mac.

**Estado detectado en este equipo:**

- Arquitectura: **arm64** (Apple Silicon)
- Homebrew: **instalado** en `/opt/homebrew`
- Java: **no instalado** (`java -version` responde "Unable to locate a Java Runtime")

Orden correcto: **1) JDK → 2) NetBeans → 3) MySQL/Workbench → 4) Connector/J**.

---

## 1. Instalar el JDK

NetBeans necesita un JDK para ejecutarse y para compilar tus proyectos. Se recomienda **Java 21 LTS (Eclipse Temurin)**.

### Opción A — Homebrew (recomendada)

```bash
brew install --cask temurin@21
```

Homebrew pedirá tu contraseña de macOS porque el JDK se instala en `/Library/Java/JavaVirtualMachines`.

### Opción B — Descarga manual

Descargar el instalador `.pkg` para **macOS aarch64** desde <https://adoptium.net/temurin/releases/?version=21> y ejecutarlo con doble clic.

### Verificar la instalación

```bash
java -version
```

Debe imprimir algo como `openjdk version "21.0.x"`. Si aún dice que no encuentra Java, abre una **terminal nueva**.

Para ver dónde quedó instalado:

```bash
/usr/libexec/java_home -V
```

### Fijar JAVA_HOME (zsh)

```bash
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 21)' >> ~/.zshrc && source ~/.zshrc
```

Comprobar:

```bash
echo $JAVA_HOME && $JAVA_HOME/bin/javac -version
```

---

## 2. Instalar Apache NetBeans

### Opción A — Homebrew (recomendada)

```bash
brew install --cask netbeans
```

Instala **NetBeans IDE** en `/Applications/NetBeans/`. El cask trae un runtime Zulu embebido, pero igual conviene tener el JDK del paso 1 para compilar y para usar `java`/`javac` desde la terminal.

### Opción B — Descarga manual

1. Ir a <https://netbeans.apache.org/front/main/download/>
2. Descargar el instalador de la última versión para **macOS (Apple Silicon / aarch64)**.
3. Abrir el `.dmg` y arrastrar la app a **Aplicaciones**.

### Primera apertura (Gatekeeper)

Si macOS bloquea la app por no estar identificada:

1. Clic derecho sobre la app → **Abrir** → **Abrir** en el diálogo, **o**
2. **Ajustes del Sistema → Privacidad y Seguridad** → botón **Abrir de todos modos**.

### Si NetBeans no encuentra el JDK

Editar el archivo de configuración y descomentar/ajustar la línea `netbeans_jdkhome`:

```bash
open -e /Applications/NetBeans/Apache\ NetBeans.app/Contents/Resources/NetBeans/netbeans/etc/netbeans.conf
```

Poner (con la ruta real que devolvió `/usr/libexec/java_home -v 21`):

```
netbeans_jdkhome="/Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home"
```

Guardar y reabrir NetBeans.

### Verificar dentro del IDE

`NetBeans → Configuración/Preferences → Java → Java Platforms` debe listar el JDK 21.

---

## 3. Instalar MySQL y MySQL Workbench

El esquema `edutrack360` corre en **MySQL 8.0**.

```bash
brew install mysql
```

```bash
brew services start mysql
```

```bash
brew install --cask mysqlworkbench
```

Asegurar la instalación (define la contraseña de `root`):

```bash
mysql_secure_installation
```

Conectarse desde la terminal:

```bash
mysql -u root -p
```

Luego, en Workbench, ejecutar los 15 fragmentos del script documentados en [prompt-GA6-AA2-EV02.md](prompt-GA6-AA2-EV02.md).

---

## 4. Conectar NetBeans con MySQL (Connector/J)

1. Descargar **MySQL Connector/J** (Platform Independent, `.tar.gz` o `.zip`) desde <https://dev.mysql.com/downloads/connector/j/> y descomprimirlo; adentro está el `mysql-connector-j-<version>.jar`.
2. En NetBeans, pestaña **Services / Servicios → Databases → Drivers**: clic derecho sobre **MySQL (Connector/J driver)** → **Customize** y apuntar al `.jar` descargado.
3. Clic derecho en **Databases → New Connection**:
   - Driver: `MySQL (Connector/J driver)`
   - Host: `localhost` · Puerto: `3306`
   - Database: `edutrack360`
   - Usuario: `root` y su contraseña
4. **Test Connection** debe responder *Connection Succeeded*.

Si el proyecto se hace con **Maven**, en lugar del paso 1 basta con agregar la dependencia al `pom.xml`:

```xml
<dependency>
  <groupId>com.mysql</groupId>
  <artifactId>mysql-connector-j</artifactId>
  <version>8.4.0</version>
</dependency>
```

---

## 5. Crear el proyecto del backend en NetBeans

1. **File → New Project**.
2. Elegir la plantilla según lo que pida la guía de la evidencia:
   - **Java with Maven → Java Application** (recomendado para una API o backend con dependencias).
   - **Java with Ant → Java Application** (proyecto clásico, sin gestor de dependencias).
3. Project Name: `edutrack360-backend` · Group Id: `co.edu.sena` · Package: `co.edu.sena.edutrack360`.
4. Ubicarlo **fuera** de la carpeta del frontend Next.js, o en una subcarpeta `backend/` de este repositorio.

---

## Verificación final

```bash
java -version && echo $JAVA_HOME && mysql --version
```

Los tres comandos deben responder sin error, y NetBeans debe abrir mostrando el JDK 21 en *Java Platforms*.

---

## Problemas frecuentes

| Síntoma | Causa | Solución |
|---------|-------|----------|
| `Unable to locate a Java Runtime` | No hay JDK instalado o la terminal es anterior a la instalación | Instalar el JDK (paso 1) y abrir una terminal nueva |
| NetBeans no abre / "no se puede verificar el desarrollador" | Gatekeeper | Clic derecho → Abrir, o Privacidad y Seguridad → Abrir de todos modos |
| NetBeans arranca pero no compila | No tiene JDK asignado | Ajustar `netbeans_jdkhome` en `netbeans.conf` |
| `Can't connect to MySQL server` | El servicio no está arriba | `brew services start mysql` |
| `Public Key Retrieval is not allowed` al conectar | Autenticación de MySQL 8 | Añadir `?allowPublicKeyRetrieval=true&useSSL=false` a la URL JDBC (solo en desarrollo local) |
| Acentos que se ven mal (`Ã±`) | Codificación | Usar `utf8mb4` y añadir `?useUnicode=true&characterEncoding=UTF-8` a la URL JDBC |
