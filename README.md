# EduTrack360 — Componente frontend

Frontend del proyecto formativo **EduTrack360**, desarrollado para el programa
**Análisis y Desarrollo de Software** del SENA (competencia `220501096`).

Aprendiz: **Jhonatan Castro**

Evidencia: `GA7-220501096-AA4-EV03` — Componente frontend del proyecto formativo.

---

## 1. Tecnologías

| Componente | Versión |
|------------|---------|
| Biblioteca de interfaz | **React 19** |
| Framework | **Next.js 16** (App Router) |
| Lenguaje | TypeScript en modo estricto |
| Estilos | Tailwind CSS v4 |
| Componentes base | shadcn/ui, sobre primitivas de Radix UI |
| Iconos | lucide-react |

Next.js es un framework construido sobre React: aporta el enrutamiento por
carpetas, la separación entre componentes de servidor y de cliente, y la
compilación optimizada. Todo lo que se escribe dentro sigue siendo React.

---

## 2. Puesta en marcha

```bash
npm install
```

```bash
npm run dev
```

El sitio queda en <http://localhost:3000>.

```bash
npm run lint
```

```bash
npm run build
```

### Cuentas de demostración

El inicio de sesión es simulado: el usuario es igual a la contraseña.

| Usuario | Rol | Destino |
|---------|-----|---------|
| `admin` | Administrativo | `/inicio` |
| `docente` | Docente | `/docente/inicio` |
| `acudiente` | Acudiente | `/acudiente/inicio` |

---

## 3. Estructura

```
app/
  page.tsx                        Inicio de sesión (ruta raíz)
  layout.tsx                      Plantilla raíz: idioma, metadatos y fuentes
  globals.css                     Tokens de color y utilidades de Tailwind

  inicio/                         Panel del rol Administrativo
  usuarios/                       Registro y gestión de usuarios
  asistencias/                    Consulta de asistencia por curso
  calificaciones/                 Cursos, asignaturas y períodos

  docente/inicio/                 Panel del rol Docente
  docente/asistencias/            Registro y edición de asistencia
  docente/calificaciones/         Registro y edición de notas
  docente/perfil/                 Perfil, cursos y horario

  acudiente/inicio/               Panel del rol Acudiente
  acudiente/asistencias/          Asistencia del estudiante
  acudiente/calificaciones/       Calificaciones del estudiante
  acudiente/perfil/               Perfil y contacto de emergencia

components/
  sidebar.tsx                     Navegación lateral reutilizable
  ui/                             Componentes de shadcn/ui

lib/utils.ts                      Utilidad cn() para componer clases
```

---

## 4. Trazabilidad con los artefactos del proyecto

Cada pantalla responde a un requisito levantado en las evidencias
`GA2-220501093-AA1-EV02` y `GA2-220501093-AA1-EV03`.

| Historia / Caso de uso | Actor | Pantallas |
|------------------------|-------|-----------|
| CU-04 · Autenticación y redirección por rol | Todos | `/` y `components/sidebar.tsx` |
| HU-05 / CU-04 · Gestión de usuarios y roles | Administrador | `/usuarios` |
| HU-01 / CU-01 · Registro de asistencia | Docente | `/docente/asistencias` |
| HU-02 / CU-02 · Gestión de calificaciones | Docente | `/docente/calificaciones` |
| HU-03 · Reportes parciales | Administrativo | `/asistencias`, `/calificaciones` |
| HU-06 / CU-03 · Consulta de desempeño | Acudiente | `/acudiente/*` |

---

## 5. Estándares de codificación aplicados

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Componentes | `PascalCase`, un componente por archivo | `DocenteCalificaciones` |
| Archivos de página | `page.tsx` dentro de la carpeta de la ruta | `app/docente/perfil/page.tsx` |
| Componentes propios | `kebab-case` en el nombre del archivo | `components/sidebar.tsx` |
| Variables y funciones | `camelCase` | `getStatusCount`, `selectedCourse` |
| Constantes de módulo | `MAYUSCULAS_CON_GUION_BAJO` | `CUENTAS` |
| Tipos | `PascalCase` | `Role`, `NavItem` |
| Idioma | Textos de interfaz en español | — |
| Importaciones | Alias `@/` desde la raíz del proyecto | `@/components/ui/card` |

Reglas de diseño que se respetan en todo el código:

- Cada archivo abre con un comentario que explica su propósito, el rol al que
  atiende y la historia de usuario que implementa.
- Los formularios usan **componentes controlados**: el valor mostrado proviene
  siempre del estado, que es la única fuente de verdad.
- El estado se actualiza de forma **inmutable**, creando objetos nuevos en vez
  de modificar los existentes.
- Los valores que se pueden calcular a partir del estado no se guardan por
  separado, para que no queden desincronizados.
- Toda lista renderizada asigna una `key` estable a cada elemento.
- El proyecto compila y pasa ESLint **sin advertencias**.

---

## 6. Estado actual

Las pantallas trabajan con **datos de demostración** declarados dentro de cada
componente. La estructura de esos objetos ya corresponde a las columnas de las
tablas del esquema `edutrack360`, de modo que al integrar el backend Java solo
cambia el origen de los datos, no la forma de las pantallas.

Los módulos del backend viven en repositorios propios: el de usuarios,
construido con JDBC y servlets, y el de calificaciones, con Spring Boot.
