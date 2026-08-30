# Evidencias GA7-220501096-AA3-EV01 y AA3-EV02

> Guía 7 — Actividad **AA3: Codificar los módulos del software Stand-alone, web y móvil**
> Duración: 122 horas · Componente formativo: *"Frameworks para construcción de aplicaciones con JAVA"*

---

## 1. Qué pide la guía

### AA3-EV01 — Codificación con framework *(evidencia de desempeño)*

Codificar el módulo aplicando **alguno de los frameworks de Java** vistos en el componente formativo.

- Partir de los artefactos previos: diagrama de clases, casos de uso, historias de usuario, diseños, prototipos.
- El código debe contener **comentarios**.
- Debe cumplir estándares de codificación.
- Debe crearse con herramientas de versionamiento.

Entrega: ZIP `NOMBRE_APELLIDO_AA3_EV01` con los archivos del proyecto y el archivo del enlace del repositorio.

### AA3-EV02 — Módulos codificados y probados *(evidencia de producto)*

Realizar las pruebas **según los requerimientos de las historias de usuario o casos de uso**.

- Documento escrito con portada, introducción y objetivo.
- **Un pantallazo por cada requisito** levantado en las historias de usuario o casos de uso: primero se describe la historia y debajo va la captura de la interfaz.
- Documentar las **pruebas de validación** (fechas, números, textos, caracteres especiales, longitudes).
- **Video** mostrando toda la funcionalidad con sus validaciones.

Entrega: ZIP `NOMBRE_APELLIDO_AA3_EV02` con archivos del proyecto, documento en Word, video y el archivo del enlace.

⚠️ **Ojo con el nombre del ZIP:** en AA3 lleva guion bajo entre nombre y apellido (`NOMBRE_APELLIDO_AA3_EV01`), a diferencia de AA2 (`NOMBREAPELLIDO_AA2_EV01`).

---

## 2. Decisiones tomadas

| Punto | Decisión |
|-------|----------|
| Framework | **Spring Boot 3.4** + Spring Data JPA + Thymeleaf |
| Módulo | **Calificaciones** (tablas `calificacion`, `matricula`, `asignatura`, `periodo`) |
| Repositorio | `edutrack360-spring`, propio, en `~/Desktop/Tareas/edutrack360-spring` |
| Puerto | 8081, para no chocar con el módulo de AA2 en el 8080 |
| Empaquetado | JAR ejecutable con Tomcat embebido |

Se escogió un módulo distinto al de AA2 para que el proyecto avance en funcionalidad en vez de repetir el mismo CRUD, y porque las calificaciones traen validaciones más ricas para documentar.

---

## 3. Artefactos previos utilizados

Los documentos `GA2-220501093-AA1-EV02` (diagramas y plantillas de casos de uso) y `GA2-220501093-AA1-EV03` (historias de usuario), presentados al instructor Edduar Yakseir Pérez Pérez, contienen 7 casos de uso y 7 historias de usuario. El módulo implementa los tres que corresponden a calificaciones:

| Artefacto | Actor | Qué exige | Cómo se cumple |
|-----------|-------|-----------|----------------|
| **HU-02 / CU-02** Gestión de calificaciones | Docente | CRUD por asignatura y período. Validar que el docente solo acceda a las asignaturas que imparte. Permitir corregir errores. | Listado con filtros, formulario de registro y edición, eliminación; `listarAsignaturasDeDocente` filtra por docente |
| **HU-03** Reportes parciales | Administrativo | Filtrado por fecha y curso | Filtros combinables de curso, asignatura, período y estudiante |
| **HU-06 / CU-03** Consulta de desempeño | Padre de familia | Consultar calificaciones del estudiante, interfaz sencilla | Pantalla de desempeño con promedio general, promedio por asignatura y detalle |

Fuera de alcance, por corresponder a otros módulos: HU-01 (asistencia), HU-04 (reportes globales con exportación a PDF), HU-05 (gestión de usuarios, resuelta en AA2) y HU-07 (soporte).

---

## 4. Cómo el proyecto cumple cada requisito

| Requisito de la guía | Dónde se cumple |
|----------------------|-----------------|
| Framework de Java | Spring Boot, Spring Data JPA, Thymeleaf, Bean Validation |
| Partir de los artefactos previos | Cada controlador y cada pantalla referencia su historia de usuario; el README trae la tabla de trazabilidad |
| El código contiene comentarios | Javadoc en español en todas las clases y métodos públicos, más comentarios en las reglas de negocio y en las plantillas |
| Estándares de codificación | Mismas convenciones que en AA2: paquetes en minúscula, clases en PascalCase, métodos y variables en camelCase, constantes en mayúsculas |
| Versionamiento | Repositorio Git propio con `.gitignore` |
| Pruebas según historias de usuario | `docs/pruebas-modulo-calificaciones.md`, organizado historia por historia |
| Pruebas de validación | Sección 2 de ese mismo documento: números, textos, longitudes, caracteres especiales, obligatorios y reglas de negocio |

---

## 5. Estado

- ✅ Código completo, compila y empaqueta
- ✅ 25 pruebas automatizadas en verde
- ✅ Verificado contra MySQL real: mapeo JPA validado, CRUD completo y validaciones probadas por HTTP
- ⬜ Ejecutar `docs/datos-demo-calificaciones.sql` para poblar las pantallas
- ⬜ Capturas (37 casos en el plan de pruebas)
- ⬜ Documento en Word
- ⬜ Video
- ⬜ Crear el repositorio en GitHub y hacer push

---

## 6. Particularidades del mapeo objeto-relacional

Arrancar con `ddl-auto=validate` destapó tres desajustes entre las entidades y el esquema real. Vale la pena mencionarlos en la sustentación porque demuestran conocimiento del modelo:

| Columna | Tipo en MySQL | Mapeo correcto |
|---------|---------------|----------------|
| `asignatura.horas_semanales` | `TINYINT` | `Byte` |
| `curso.anio`, `periodo.anio` | `YEAR` | `Short` + `yearIsDateType=false` en la URL |
| `curso.jornada`, `matricula.estado`, `usuario.tipo_documento` | `ENUM` | `String` + `@JdbcTypeCode(SqlTypes.CHAR)` |
