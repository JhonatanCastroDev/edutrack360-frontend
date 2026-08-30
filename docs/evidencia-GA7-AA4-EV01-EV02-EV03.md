# Evidencias GA7-220501096-AA4-EV01, EV02 y EV03

> Guía 7 — Actividad **AA4: Codificar el frontend utilizando framework**
> Duración: 96 horas · Componente formativo: *"Desarrollo de frontend con React JS"*

---

## 1. Qué pide la guía

| Evidencia | Tipo | Producto | Formato |
|-----------|------|----------|---------|
| **AA4-EV01** Taller sobre componentes frontend | Conocimiento | Documento en Word | **PDF** |
| **AA4-EV02** Verificación de procedimientos para la definición de componentes frontend | Desempeño | Documento en Word | **PDF** |
| **AA4-EV03** Componente frontend del proyecto formativo | Producto | Proyecto + enlace del repositorio | ZIP `NOMBRE_APELLIDO_AA4_EV03` |

⚠️ EV01 y EV02 **no llevan ZIP ni repositorio**: se suben como PDF. Solo EV03 se entrega comprimida.
⚠️ El nombre del ZIP usa guion bajo entre nombre y apellido, igual que en AA3.

### AA4-EV01 — cuatro puntos obligatorios

1. Diferencia entre React y JSX
2. ¿Qué son clases en React?
3. Principales eventos de React
4. Mapa conceptual de React

Más portada, introducción, objetivo y las principales características del framework.

### AA4-EV02

Describir los componentes frontend a utilizar, **cada uno con su justificación**. Portada, introducción y objetivo.

### AA4-EV03

Codificar el módulo aplicando React JS, partiendo de los artefactos previos. El código **debe contener comentarios**, cumplir estándares de codificación y estar versionado.

---

## 2. Cómo se resolvió

### EV03 — el código

El frontend ya existía como maqueta. El trabajo consistió en llevarlo al estándar que exige la evidencia:

| Acción | Detalle |
|--------|---------|
| Comentarios de cabecera | En las 14 pantallas, el sidebar, la plantilla raíz y la utilidad `cn`. Cada uno indica propósito, rol e historia de usuario que implementa |
| Conceptos documentados | Componentes controlados, estado derivado, renderizado de listas con clave, renderizado condicional y actualización inmutable |
| Procedencia de terceros | Se documenta que `components/ui/` proviene de shadcn/ui sobre Radix |
| Datos simulados | Marcados explícitamente, con nota de su reemplazo por la API |
| Código muerto | Eliminadas 3 importaciones sin uso, 2 bloques sin referenciar y 1 hook importado y nunca invocado |
| README | Reemplazado el genérico de `create-next-app` por documentación real del proyecto |
| Verificación | `npm run lint` sin advertencias y `npm run build` generando las 15 rutas |

**Decisión de alcance:** no se conectó el frontend al backend de AA3. La guía no lo exige y el aprendiz pidió ceñirse a los lineamientos. Las pantallas conservan sus datos de demostración, con la estructura de objetos ya alineada al esquema `edutrack360`.

### EV01 y EV02 — los documentos

Generados en `GA7-220501096-AA4-EV01.docx` y `GA7-220501096-AA4-EV02.docx`, en la raíz del repo del frontend (excluidos de Git por `.gitignore`).

El mapa conceptual de EV01 se generó como imagen y va embebido en el documento.

---

## 3. Trazabilidad con los artefactos previos

| Historia / Caso de uso | Pantallas |
|------------------------|-----------|
| CU-04 · Autenticación y redirección por rol | `/` y `components/sidebar.tsx` |
| HU-05 / CU-04 · Gestión de usuarios y roles | `/usuarios` |
| HU-01 / CU-01 · Registro de asistencia | `/docente/asistencias` |
| HU-02 / CU-02 · Gestión de calificaciones | `/docente/calificaciones` |
| HU-03 · Reportes parciales | `/asistencias`, `/calificaciones` |
| HU-06 / CU-03 · Consulta de desempeño | `/acudiente/*` |

---

## 4. Estado

- ✅ EV03: código comentado, lint limpio, build correcto, ZIP generado y verificado
- ✅ EV01: documento completo, con mapa conceptual embebido
- ✅ EV02: documento completo, con lista de chequeo de 12 criterios
- ⬜ Completar instructor y fecha en la portada de ambos documentos
- ⬜ Exportar los dos documentos a PDF
- ⬜ Renombrar el repositorio en GitHub a `edutrack360-frontend` y hacer push

---

## 5. Nota sobre Next.js frente a React

La guía habla de React JS y el proyecto usa Next.js. No hay contradicción: Next.js es un framework construido sobre React, y todo el código de componentes, hooks, props, estado y eventos es React puro. Next.js aporta el enrutamiento por carpetas y la compilación. Conviene mencionarlo si el instructor pregunta.
