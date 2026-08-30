# Evidencias GA7-220501096-AA5 (EV01 a EV04)

> Guía 7 — Actividad **AA5: Crear servicios web** · 144 horas

Las cuatro evidencias se agrupan en dos bloques: uno sobre un **caso** independiente y otro sobre las **APIs del proyecto**.

| Evidencia | Qué pide | Dónde está |
|-----------|----------|------------|
| **EV01** Servicios web — caso | Servicio de registro e inicio de sesión. Código comentado, versionado | Repo `edutrack360-autenticacion` |
| **EV02** API | Testing con Postman: video, capturas, archivo ENDPOINTS | Mismo repo |
| **EV03** Servicios web — proyecto | APIs del proyecto, con documentación de cada servicio | Repo `edutrack360-spring` |
| **EV04** API del proyecto | Testing con Postman: video, capturas, archivo ENDPOINTS | Mismo repo |

Nombres de los ZIP: `NOMBRE_APELLIDO_AA5_EVnn`, con guion bajo.

---

## Bloque del caso — EV01 y EV02

Repositorio propio: `~/Desktop/Tareas/edutrack360-autenticacion`, puerto **8082**.
Proyecto mínimo: Spring Boot, sin base de datos, usuarios en memoria.

| Método | Ruta | Respuestas |
|--------|------|-----------|
| POST | `/api/registro` | 201 · 409 si existe · 400 si no valida |
| POST | `/api/login` | 200 · 401 si falla · 400 si no valida |

Las contraseñas se cifran con BCrypt. El mensaje de error de autenticación es idéntico cuando el usuario no existe y cuando la contraseña es incorrecta, para no revelar qué nombres están registrados.

5 pruebas JUnit. Documentación en `ENDPOINTS.txt`.

---

## Bloque del proyecto — EV03 y EV04

Se añadió una capa REST al módulo de calificaciones ya existente, **sin lógica de negocio nueva**: los controladores REST y la interfaz web se apoyan en el mismo `CalificacionServicio`.

Once servicios bajo `/api` en el puerto 8081: CRUD de calificaciones, desempeño de un estudiante y cinco catálogos. Documentación completa en `ENDPOINTS.txt` del repo de Spring.

Detalles de diseño:

- Las respuestas usan **registros planos**, no las entidades JPA. Evita que el JSON arrastre las relaciones del modelo y desacopla la API del esquema.
- El manejador de errores de la API se restringe con `assignableTypes` a los controladores REST, porque el manejador de la interfaz web devuelve HTML y competirían por la misma excepción.

---

## Estado

- ✅ EV01: código, pruebas y ENDPOINTS. Verificado con los 7 casos por HTTP
- ✅ EV03: 11 servicios. Verificados por HTTP contra la base de datos real, incluidas las tres reglas de negocio
- ✅ EV02 y EV04: documentos de pruebas con marcadores de captura (8 y 14 figuras)
- ⬜ Crear el repositorio `edutrack360-autenticacion` en GitHub y hacer push
- ⬜ Capturas de Postman y videos
- ⬜ Completar instructor y fecha en los dos documentos
