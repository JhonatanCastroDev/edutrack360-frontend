# PROMPT — Evidencia GA6-220501096-AA2-EV02 (Estructura de la BD y restricciones)

> Copia y pega TODO lo que está debajo de la línea en la IA con la que vayas a generar el documento.

---

## ROL

Actúa como un ingeniero de bases de datos y redactor técnico. Vas a producir el documento escrito en Word para la evidencia de desempeño **GA6-220501096-AA2-EV02 — "Creación de la estructura de la BD y aplicación de restricciones"** del SENA, correspondiente al proyecto formativo **EduTrack360**.

## CONTEXTO DEL PROYECTO

**EduTrack360** es una aplicación web (Next.js + React) para instituciones de educación básica y media en Colombia. Permite:

- Registrar usuarios con un rol asignado: **Administrativo, Docente o Acudiente** (formulario con tipo y número de documento, primer/segundo nombre, primer/segundo apellido, fecha de nacimiento, correo, teléfono, dirección y notas).
- Gestionar **cursos** (10-A, 10-B, 11-A…), cada uno con un docente titular y un número de estudiantes.
- Gestionar **asignaturas** (Matemáticas, Español, Ciencias, Inglés, Sociales, Educación Física) con horas semanales y docente asignado.
- Definir **períodos académicos** (Periodo 1 a 4, con fecha de inicio y fin).
- Registrar **calificaciones** por estudiante, asignatura y período (escala colombiana 0.0 a 5.0).
- Registrar **asistencias** diarias con estado **Presente, Ausente, Tarde o Excusa**.
- Un **portal del acudiente** donde el padre o representante consulta las calificaciones y asistencias de sus estudiantes a cargo.

El motor de base de datos es **MySQL 8.0** y el modelado se realiza en **MySQL Workbench**.

## ESQUEMA A DOCUMENTAR (`edutrack360`) — 10 tablas

| # | Tabla | Descripción | Llave primaria | Llaves foráneas |
|---|-------|-------------|----------------|-----------------|
| 1 | `rol` | Catálogo de roles del sistema | `id_rol` | — |
| 2 | `usuario` | Todas las personas del sistema | `id_usuario` | `id_rol` → `rol` |
| 3 | `estudiante` | Datos académicos del alumno | `id_estudiante` | `id_usuario` → `usuario` |
| 4 | `acudiente_estudiante` | Relación N:M acudiente–estudiante | `(id_acudiente, id_estudiante)` | → `usuario`, → `estudiante` |
| 5 | `curso` | Grupo o curso por año lectivo | `id_curso` | `id_docente` → `usuario` |
| 6 | `matricula` | Relación N:M estudiante–curso | `id_matricula` | → `estudiante`, → `curso` |
| 7 | `asignatura` | Materias dictadas en un curso | `id_asignatura` | → `curso`, → `usuario` (docente) |
| 8 | `periodo` | Períodos académicos del año | `id_periodo` | — |
| 9 | `calificacion` | Nota por matrícula, asignatura y período | `id_calificacion` | → `matricula`, → `asignatura`, → `periodo` |
| 10 | `asistencia` | Registro diario de asistencia | `id_asistencia` | → `matricula`, → `asignatura` |

## SCRIPT SQL — SE EJECUTA POR FRAGMENTOS

El script está partido en **15 fragmentos pequeños**, pensados para ejecutarse uno por uno en MySQL Workbench (así se puede capturar la pantalla de cada paso). En el documento debes reproducir cada fragmento **en un bloque de código separado**, con su título y un párrafo corto explicando qué tipos de datos y qué restricciones aplica.

### Fragmento 1 — Crear el esquema

```sql
DROP DATABASE IF EXISTS edutrack360;
CREATE DATABASE edutrack360
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_spanish_ci;
USE edutrack360;
```

### Fragmento 2 — Tabla `rol`

```sql
CREATE TABLE rol (
  id_rol      INT AUTO_INCREMENT,
  nombre      VARCHAR(20)  NOT NULL,
  descripcion VARCHAR(100) NULL,
  CONSTRAINT pk_rol        PRIMARY KEY (id_rol),
  CONSTRAINT uq_rol_nombre UNIQUE (nombre)
) ENGINE = InnoDB;
```

### Fragmento 3 — Tabla `usuario` (primera FK)

```sql
CREATE TABLE usuario (
  id_usuario       INT AUTO_INCREMENT,
  tipo_documento   ENUM('CC','TI','CE') NOT NULL,
  numero_documento VARCHAR(15)  NOT NULL,
  primer_nombre    VARCHAR(30)  NOT NULL,
  segundo_nombre   VARCHAR(30)  NULL,
  primer_apellido  VARCHAR(30)  NOT NULL,
  segundo_apellido VARCHAR(30)  NULL,
  fecha_nacimiento DATE         NULL,
  correo           VARCHAR(100) NOT NULL,
  telefono         VARCHAR(15)  NOT NULL,
  direccion        VARCHAR(100) NULL,
  notas            TEXT         NULL,
  estado           ENUM('Activo','Inactivo') NOT NULL DEFAULT 'Activo',
  fecha_registro   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_rol           INT          NOT NULL,
  CONSTRAINT pk_usuario         PRIMARY KEY (id_usuario),
  CONSTRAINT uq_usuario_doc     UNIQUE (tipo_documento, numero_documento),
  CONSTRAINT uq_usuario_correo  UNIQUE (correo),
  CONSTRAINT fk_usuario_rol     FOREIGN KEY (id_rol) REFERENCES rol (id_rol)
      ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB;
```

### Fragmento 4 — Tabla `estudiante` (relación 1:1 con `usuario`)

```sql
CREATE TABLE estudiante (
  id_estudiante     INT AUTO_INCREMENT,
  codigo_estudiante VARCHAR(15) NOT NULL,
  fecha_ingreso     DATE        NOT NULL,
  id_usuario        INT         NOT NULL,
  CONSTRAINT pk_estudiante        PRIMARY KEY (id_estudiante),
  CONSTRAINT uq_estudiante_codigo UNIQUE (codigo_estudiante),
  CONSTRAINT uq_estudiante_usuario UNIQUE (id_usuario),
  CONSTRAINT fk_estudiante_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
      ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;
```

### Fragmento 5 — Tabla `acudiente_estudiante` (N:M, llave primaria compuesta)

```sql
CREATE TABLE acudiente_estudiante (
  id_acudiente  INT NOT NULL,
  id_estudiante INT NOT NULL,
  parentesco    VARCHAR(30) NOT NULL,
  CONSTRAINT pk_acudiente_estudiante PRIMARY KEY (id_acudiente, id_estudiante),
  CONSTRAINT fk_ae_usuario    FOREIGN KEY (id_acudiente)  REFERENCES usuario (id_usuario)
      ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_ae_estudiante FOREIGN KEY (id_estudiante) REFERENCES estudiante (id_estudiante)
      ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;
```

### Fragmento 6 — Tabla `curso`

```sql
CREATE TABLE curso (
  id_curso   INT AUTO_INCREMENT,
  nombre     VARCHAR(10) NOT NULL,
  jornada    ENUM('Mañana','Tarde') NOT NULL DEFAULT 'Mañana',
  anio       YEAR        NOT NULL,
  id_docente INT         NULL,
  CONSTRAINT pk_curso        PRIMARY KEY (id_curso),
  CONSTRAINT uq_curso_anio   UNIQUE (nombre, anio),
  CONSTRAINT fk_curso_docente FOREIGN KEY (id_docente) REFERENCES usuario (id_usuario)
      ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB;
```

### Fragmento 7 — Tabla `matricula` (N:M estudiante–curso)

```sql
CREATE TABLE matricula (
  id_matricula    INT AUTO_INCREMENT,
  fecha_matricula DATE NOT NULL,
  estado          ENUM('Activa','Retirada','Finalizada') NOT NULL DEFAULT 'Activa',
  id_estudiante   INT  NOT NULL,
  id_curso        INT  NOT NULL,
  CONSTRAINT pk_matricula        PRIMARY KEY (id_matricula),
  CONSTRAINT uq_matricula        UNIQUE (id_estudiante, id_curso),
  CONSTRAINT fk_matricula_est    FOREIGN KEY (id_estudiante) REFERENCES estudiante (id_estudiante)
      ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_matricula_curso  FOREIGN KEY (id_curso) REFERENCES curso (id_curso)
      ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB;
```

### Fragmento 8 — Tabla `asignatura` (con restricción CHECK)

```sql
CREATE TABLE asignatura (
  id_asignatura   INT AUTO_INCREMENT,
  nombre          VARCHAR(50) NOT NULL,
  horas_semanales TINYINT     NOT NULL,
  id_curso        INT         NOT NULL,
  id_docente      INT         NULL,
  CONSTRAINT pk_asignatura        PRIMARY KEY (id_asignatura),
  CONSTRAINT uq_asignatura_curso  UNIQUE (nombre, id_curso),
  CONSTRAINT ck_asignatura_horas  CHECK (horas_semanales BETWEEN 1 AND 10),
  CONSTRAINT fk_asignatura_curso  FOREIGN KEY (id_curso) REFERENCES curso (id_curso)
      ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_asignatura_docente FOREIGN KEY (id_docente) REFERENCES usuario (id_usuario)
      ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB;
```

### Fragmento 9 — Tabla `periodo` (CHECK entre dos columnas)

```sql
CREATE TABLE periodo (
  id_periodo   INT AUTO_INCREMENT,
  nombre       VARCHAR(20) NOT NULL,
  fecha_inicio DATE        NOT NULL,
  fecha_fin    DATE        NOT NULL,
  anio         YEAR        NOT NULL,
  CONSTRAINT pk_periodo       PRIMARY KEY (id_periodo),
  CONSTRAINT uq_periodo_anio  UNIQUE (nombre, anio),
  CONSTRAINT ck_periodo_fecha CHECK (fecha_fin > fecha_inicio)
) ENGINE = InnoDB;
```

### Fragmento 10 — Tabla `calificacion` (tres llaves foráneas)

```sql
CREATE TABLE calificacion (
  id_calificacion INT AUTO_INCREMENT,
  nota            DECIMAL(2,1) NOT NULL,
  observacion     VARCHAR(200) NULL,
  id_matricula    INT NOT NULL,
  id_asignatura   INT NOT NULL,
  id_periodo      INT NOT NULL,
  CONSTRAINT pk_calificacion   PRIMARY KEY (id_calificacion),
  CONSTRAINT uq_calificacion   UNIQUE (id_matricula, id_asignatura, id_periodo),
  CONSTRAINT ck_calificacion_nota CHECK (nota >= 0.0 AND nota <= 5.0),
  CONSTRAINT fk_cal_matricula  FOREIGN KEY (id_matricula)  REFERENCES matricula (id_matricula)
      ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_cal_asignatura FOREIGN KEY (id_asignatura) REFERENCES asignatura (id_asignatura)
      ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_cal_periodo    FOREIGN KEY (id_periodo)    REFERENCES periodo (id_periodo)
      ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB;
```

### Fragmento 11 — Tabla `asistencia`

```sql
CREATE TABLE asistencia (
  id_asistencia INT AUTO_INCREMENT,
  fecha         DATE NOT NULL,
  estado        ENUM('Presente','Ausente','Tarde','Excusa') NOT NULL DEFAULT 'Presente',
  observacion   VARCHAR(200) NULL,
  id_matricula  INT NOT NULL,
  id_asignatura INT NOT NULL,
  CONSTRAINT pk_asistencia   PRIMARY KEY (id_asistencia),
  CONSTRAINT uq_asistencia   UNIQUE (id_matricula, id_asignatura, fecha),
  CONSTRAINT fk_asis_matricula  FOREIGN KEY (id_matricula)  REFERENCES matricula (id_matricula)
      ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_asis_asignatura FOREIGN KEY (id_asignatura) REFERENCES asignatura (id_asignatura)
      ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB;
```

### Fragmento 12 — Índices adicionales para consultas frecuentes

```sql
CREATE INDEX idx_usuario_apellido   ON usuario (primer_apellido, primer_nombre);
CREATE INDEX idx_asistencia_fecha   ON asistencia (fecha);
CREATE INDEX idx_calificacion_nota  ON calificacion (nota);
```

### Fragmento 13 — Datos de prueba

```sql
INSERT INTO rol (nombre, descripcion) VALUES
  ('Administrativo','Gestiona usuarios, cursos y períodos'),
  ('Docente','Registra calificaciones y asistencias'),
  ('Acudiente','Consulta la información del estudiante'),
  ('Estudiante','Miembro del curso');

INSERT INTO usuario (tipo_documento, numero_documento, primer_nombre, primer_apellido, correo, telefono, id_rol) VALUES
  ('CC','1234567890','Jhonatan','Castro','admin@edutrack.com.co','3011234567',1),
  ('CC','1098765432','María','García','mgarcia@edutrack.com.co','3019876543',2),
  ('CC','1055667788','Sandra','Rodríguez','sandra.r@edutrack.com.co','3005551122',3),
  ('TI','1122334455','Ana','Rodríguez','ana.r@edutrack.com.co','3004443311',4);

INSERT INTO estudiante (codigo_estudiante, fecha_ingreso, id_usuario) VALUES ('EST-2026-001','2026-01-20',4);
INSERT INTO acudiente_estudiante (id_acudiente, id_estudiante, parentesco) VALUES (3,1,'Madre');
INSERT INTO curso (nombre, jornada, anio, id_docente) VALUES ('10-A','Mañana',2026,2);
INSERT INTO matricula (fecha_matricula, id_estudiante, id_curso) VALUES ('2026-01-25',1,1);
INSERT INTO asignatura (nombre, horas_semanales, id_curso, id_docente) VALUES ('Matemáticas',5,1,2);
INSERT INTO periodo (nombre, fecha_inicio, fecha_fin, anio) VALUES ('Periodo 1','2026-01-15','2026-03-30',2026);
INSERT INTO calificacion (nota, id_matricula, id_asignatura, id_periodo) VALUES (4.5,1,1,1);
INSERT INTO asistencia (fecha, estado, id_matricula, id_asignatura) VALUES ('2026-02-10','Presente',1,1);
```

### Fragmento 14 — Verificación de la estructura y de las restricciones creadas

```sql
SHOW TABLES;

SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_KEY
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = 'edutrack360'
ORDER BY TABLE_NAME, ORDINAL_POSITION;

SELECT CONSTRAINT_NAME, TABLE_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'edutrack360' AND REFERENCED_TABLE_NAME IS NOT NULL;
```

### Fragmento 15 — Pruebas que DEBEN fallar (demuestran que las restricciones funcionan)

```sql
-- 1. Falla por llave foránea inexistente (rol 99 no existe)
INSERT INTO usuario (tipo_documento, numero_documento, primer_nombre, primer_apellido, correo, telefono, id_rol)
VALUES ('CC','9999999999','Prueba','Error','error@edutrack.com.co','3000000000',99);

-- 2. Falla por UNIQUE: el correo ya está registrado
INSERT INTO usuario (tipo_documento, numero_documento, primer_nombre, primer_apellido, correo, telefono, id_rol)
VALUES ('CC','8888888888','Prueba','Duplicado','admin@edutrack.com.co','3000000000',1);

-- 3. Falla por CHECK: la nota supera 5.0
INSERT INTO calificacion (nota, id_matricula, id_asignatura, id_periodo) VALUES (6.0,1,1,1);

-- 4. Falla por CHECK: la fecha final es anterior a la inicial
INSERT INTO periodo (nombre, fecha_inicio, fecha_fin, anio) VALUES ('Periodo X','2026-05-01','2026-04-01',2026);

-- 5. Falla por RESTRICT: no se puede borrar un rol que tiene usuarios
DELETE FROM rol WHERE id_rol = 1;
```

## ESTRUCTURA QUE DEBE TENER EL DOCUMENTO EN WORD

1. **Portada** — nombre de la institución (SENA), programa de formación, nombre de la evidencia (GA6-220501096-AA2-EV02), nombre del aprendiz (Jhonatan Castro), nombre del instructor, ciudad y fecha (deja marcadores `[ ]` en los datos que yo debo completar).
2. **Tabla de contenido.**
3. **Introducción** — 2 o 3 párrafos sobre la importancia del modelo relacional y de las restricciones de integridad en EduTrack360.
4. **Objetivo general y objetivos específicos** (3 o 4 específicos).
5. **Descripción de la estructura de la base de datos** — explicación en prosa del esquema, sus 10 tablas y las relaciones 1:1, 1:N y N:M que existen entre ellas.
6. **Diccionario de datos** — una tabla por cada una de las 10 tablas de la base de datos, con las columnas: *Atributo | Tipo de dato | Longitud | Nulo (Sí/No) | Restricción | Descripción*.
7. **Restricciones aplicadas** — una sección por tipo de restricción, explicando qué es y en qué tabla del proyecto se aplicó:
   - Llaves primarias (PRIMARY KEY), incluida la compuesta de `acudiente_estudiante`.
   - Llaves foráneas (FOREIGN KEY) con sus acciones `ON DELETE` / `ON UPDATE` y la razón de cada elección (CASCADE, RESTRICT o SET NULL).
   - Restricciones de unicidad (UNIQUE).
   - Restricciones de obligatoriedad (NOT NULL) y valores por defecto (DEFAULT).
   - Restricciones de validación (CHECK) y de dominio (ENUM).
8. **Script SQL por fragmentos** — los 15 fragmentos anteriores, cada uno en su bloque, con un párrafo explicativo antes y un espacio con el texto `[Insertar captura de pantalla de la ejecución en MySQL Workbench]` después.
9. **Modelo entidad-relación** — espacio con el texto `[Insertar imagen del diagrama EER exportado desde MySQL Workbench]` y una explicación de la notación usada (pata de gallo / crow's foot) y de la cardinalidad de cada relación.
10. **Evidencia de la validación de restricciones** — tabla con las 5 pruebas del fragmento 15: *Prueba | Restricción evaluada | Resultado esperado | Mensaje de error de MySQL*. Incluye los mensajes reales de MySQL 8 (por ejemplo `Error Code: 1452`, `1062`, `3819`, `1451`).
11. **Conclusiones** — 3 o 4 párrafos.
12. **Webgrafía** — mínimo 3 referencias en normas APA 7 (documentación oficial de MySQL y material de formación del SENA).

## REQUISITOS DE FORMA

- Todo en **español**, redacción técnica formal, en tercera persona.
- Normas ICONTEC o APA 7 para márgenes, numeración de páginas y títulos.
- Numera y titula todas las tablas y figuras ("Tabla 1. Diccionario de datos de la tabla `usuario`", "Figura 1. Modelo entidad-relación de EduTrack360").
- No inventes tablas ni columnas distintas a las del esquema entregado.
- Entrega el resultado en **Markdown listo para pegar en Word**, con los títulos jerarquizados y las tablas ya armadas.

## ANEXO — INSTRUCCIONES PARA MYSQL WORKBENCH (inclúyelas al final del documento como guía de reproducción)

1. Abrir MySQL Workbench y conectarse a la instancia local.
2. Abrir una pestaña de consulta SQL y ejecutar los fragmentos 1 al 13 **uno por uno** (seleccionar el fragmento y pulsar el rayo con la selección, o `Ctrl + Shift + Enter`), tomando captura del panel *Output* después de cada uno.
3. Ejecutar el fragmento 14 y capturar los resultados de las tres consultas.
4. Ejecutar cada sentencia del fragmento 15 y capturar el mensaje de error rojo que devuelve MySQL.
5. Generar el diagrama: menú **Database → Reverse Engineer**, seleccionar el esquema `edutrack360` y finalizar; organizar las tablas en el lienzo EER.
6. Guardar el modelo como `edutrack360.mwb` (**File → Save Model As**) y exportar la imagen del diagrama con **File → Export → Export as PNG**.
7. Comprimir en un único archivo **ZIP** el documento en Word, el archivo `edutrack360.mwb`, la imagen del diagrama y el script `edutrack360.sql`.
