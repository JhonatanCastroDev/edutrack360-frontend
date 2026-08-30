# Evidencias GA7-220501096-AA2-EV01 y AA2-EV02

> Guía de Aprendizaje 7 — Actividad de aprendizaje **AA2: Aplicar estándares de codificación**
> Duración de la actividad: 96 horas
> Material de formación de referencia: componente formativo *"Construcción de aplicaciones con JAVA"*
> Fuente: `Guia_aprendizaje_7.pdf` (raíz del repositorio)

---

## 1. Qué pide la guía

### GA7-220501096-AA2-EV01 — Codificación de módulos del software según requerimientos del proyecto

*Evidencia de desempeño.*

Codificar el módulo del proyecto **realizando conexiones con bases de datos por medio de JDBC**.

Elementos exigidos:

- Partir de los artefactos previos del ciclo de software (diagrama de clases, casos de uso, historias de usuario, diseños, prototipos).
- Crear el proyecto **usando herramientas de versionamiento**.
- Cumplir estándares de codificación: nombramiento de **variables, métodos, clases y paquetes**.
- Tener funcionalidades de **inserción, consulta, actualización y eliminación**.

Entregable: carpeta comprimida `CASTROJHONATAN_AA2_EV01` (ZIP o RAR) con los archivos del proyecto y un archivo con el enlace del repositorio.

### GA7-220501096-AA2-EV02 — Módulos de software codificados y probados

*Evidencia de producto.*

Codificar el módulo **enfocado a web con servlets**.

Elementos exigidos:

- Partir de los mismos artefactos previos.
- Crear el proyecto usando herramientas de versionamiento.
- El código debe contener **formularios HTML con servlets**.
- Utilizar los métodos **GET y POST**.
- Utilizar **elementos de JSP**.

Entregable: carpeta comprimida `CASTROJHONATAN_AA2_EV02` (ZIP o RAR) con los archivos del proyecto y un archivo con el enlace del repositorio.

Criterio de evaluación de ambas (lista de chequeo del instructor):
*"Codifica los módulos del software Stand alone, web y móvil, de acuerdo con las especificaciones del diseño y el estándar de codificación."*

---

## 2. Decisiones tomadas

| Punto | Decisión |
|-------|----------|
| Módulo escogido | **Usuarios** (tablas `usuario` + `rol`), que corresponde a la pantalla `/usuarios` del frontend |
| Repositorio | Repositorio propio `edutrack360-backend`, separado del frontend |
| Ubicación local | `~/Desktop/Tareas/edutrack360-backend` (carpeta hermana de este repositorio) |
| Lenguaje | Java 21 LTS (Eclipse Temurin) |
| Proyecto | Maven, empaquetado **WAR** |
| Web | Jakarta Servlet 6.0 + JSP + JSTL 3.0 sobre **Apache Tomcat 10.1** |
| Datos | JDBC puro con `PreparedStatement`, MySQL Connector/J 9.1 |
| Pruebas | JUnit 5 |
| Sin framework | No se usa Spring ni ningún ORM: la guía solo pide JDBC, servlets y JSP |

Las dos evidencias se resuelven en **un mismo proyecto**, porque EV02 es la continuación natural de EV01: la capa web reutiliza el mismo servicio y los mismos DAO.

- **EV01** queda demostrada por `AppConsola`, que ejecuta el ciclo insertar–consultar–actualizar–eliminar contra MySQL por JDBC.
- **EV02** queda demostrada por `UsuarioServlet` e `InicioServlet` con sus páginas JSP y formularios HTML.

---

## 3. Cómo el proyecto cumple cada requisito

### EV01

| Requisito de la guía | Dónde se cumple |
|----------------------|-----------------|
| Conexión a BD por JDBC | `config/ConexionBD.java` — `DriverManager`, credenciales fuera del código |
| Inserción | `UsuarioDAOImpl.insertar` + `UsuarioServicio.registrar` |
| Consulta | `UsuarioDAOImpl.buscarPorId`, `listarTodos`, `buscarPorFiltro` |
| Actualización | `UsuarioDAOImpl.actualizar` + `UsuarioServicio.actualizar` |
| Eliminación | `UsuarioDAOImpl.eliminar` + `UsuarioServicio.eliminar` |
| Nombramiento de paquetes | `co.edu.sena.edutrack360.<capa>`, todo en minúscula |
| Nombramiento de clases | `PascalCase`: `UsuarioDAOImpl`, `ValidadorUsuario` |
| Nombramiento de métodos | `camelCase` empezando por verbo: `buscarPorId`, `validarUnicidad` |
| Nombramiento de variables | `camelCase` descriptivo: `numeroDocumento`, `filasAfectadas` |
| Constantes | `MAYUSCULAS_CON_GUION_BAJO`: `SQL_INSERTAR`, `LONGITUD_MAXIMA_CORREO` |
| Versionamiento | Repositorio Git propio, con `.gitignore` que excluye `target/` y `db.properties` |

### EV02

| Requisito de la guía | Dónde se cumple |
|----------------------|-----------------|
| Formularios HTML con servlets | `formulario.jsp`, `lista.jsp` e `inicio.jsp` envían al servlet `/usuarios` |
| Método GET | Listar, buscar, ver detalle y abrir formularios (`UsuarioServlet.doGet`) |
| Método POST | Guardar y eliminar (`UsuarioServlet.doPost`), con redirección posterior |
| Elementos de JSP | Directivas `@page`, `@taglib` e `@include`; fragmentos `.jspf`; EL (`${...}`); etiquetas JSTL `c:forEach`, `c:if`, `c:choose`, `c:out`, `c:set`, `c:remove`; `jsp:forward` |
| Probado | 24 pruebas JUnit + plan de pruebas manuales documentado |

---

## 4. Checklist de entrega

Antes de comprimir cada evidencia:

- [ ] MySQL encendido y esquema `edutrack360` creado con `docs/script-edutrack360.sql` del backend
- [ ] `src/main/resources/db.properties` creado a partir de `db.properties.ejemplo`
- [ ] `mvn clean test` en verde (24 pruebas)
- [ ] Repositorio creado en GitHub y `git push` hecho
- [ ] Archivo `ENLACE-REPOSITORIO.txt` con la URL del repositorio dentro del ZIP

### Qué exige exactamente la guía en la entrega

Los lineamientos de **EV01 y EV02 son idénticos** y piden solo tres cosas:

1. Los archivos del proyecto.
2. Un archivo con el enlace del repositorio.
3. Todo comprimido en ZIP o RAR con el nombre `NOMBREAPELLIDO_AA2_EVnn`.

⚠️ **No se pide documento en Word, ni video, ni capturas de pantalla.** Eso aparece
en **AA3-EV02**, que sí exige *"archivos del proyecto, documento en Word, Video"*
con un pantallazo por cada historia de usuario. No confundir las dos actividades.

Nombres finales: `CASTROJHONATAN_AA2_EV01` y `CASTROJHONATAN_AA2_EV02`.

El plan de pruebas (`docs/pruebas-modulo-usuarios.md` del backend) ya viaja dentro
del ZIP como parte de los archivos del proyecto. No es obligatorio, pero respalda
la palabra "probados" del título de la evidencia EV02.

---

## 5. Lo que viene después en la Guía 7

Estas dos evidencias son parte de la actividad AA2. La guía continúa con:

| Actividad | Evidencias | Tema |
|-----------|-----------|------|
| AA1 | EV01 a EV05 | Versionamiento con Git: informes, estándares de codificación y video de comandos |
| AA3 | EV01, EV02 | Módulos con **frameworks de Java**, más documento de pruebas y video |
| AA4 | EV01 a EV03 | Frontend con **React** (aquí encaja el Next.js ya construido) |
| AA5 | EV01 a EV04 | **APIs REST** y testing con **Postman** |

Es en AA3 y AA5 donde entran los frameworks y las APIs; por eso en AA2 se trabaja deliberadamente con JDBC, servlets y JSP puros.
