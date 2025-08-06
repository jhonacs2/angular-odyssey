# Angular & TypeScript Best Practices

You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

---

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

---

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default
- Use signals for state management
- Implement lazy loading for feature routes
- Do **NOT** use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images
  - `NgOptimizedImage` does **not** work for inline base64 images
- **Use Angular Material 20 as the official UI component library**

---

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- **Do NOT** use `ngClass`, use `class` bindings instead
- **DO NOT** use `ngStyle`, use `style` bindings instead

---

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do **NOT** use `mutate` on signals, use `update` or `set` instead

---

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

---

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

---

## Common Pitfalls

- Control flow (`@if`):
  - You **cannot** use `as` expressions in `@else if (...)`.
    - ❌ Invalid: `@else if (bla(); as x)`  

# 🧠 Prompt: SPA Angular 20 estilo Workshop interactivo local

Quiero crear una Single Page Application (SPA) utilizando **Angular 20** con las siguientes características:

---

## 🔧 Stack

- **Framework**: Angular 20 con standalone components
- **UI Kit**: Angular Material 20
- **Editor de contenido**: [Editor.js](https://editorjs.io/)
- **Funcionamiento completamente local** (sin backend)
- **Estado** manejado con signals y almacenamiento en `localStorage`
- **Contenido de cada lección** en formato JSON

---

## 🖼️ Diseño general

La aplicación debe estar dividida en **dos paneles principales**:

- **Panel izquierdo**:  
  Un **timeline o lista vertical** que muestre las lecciones del workshop (como un paso a paso).  
  Cada lección debe tener:
  - Título
  - Estado (completada o no)
  - Indicador visual del avance (✔️ o 🔒)

- **Panel derecho**:  
  Muestra el **contenido editable** de la lección actual utilizando **Editor.js**.  
  El contenido se carga desde un archivo o arreglo **JSON local**.  
  Editor.js debe estar en modo **solo lectura** por defecto.

---

## 📚 Lecciones

Las lecciones se leerán desde un JSON local con la siguiente estructura:

```json
[
  {
    "id": "lesson-1",
    "title": "Introduction to Angular",
    "content": {
      "time": 1712345678900,
      "blocks": [
        {
          "id": "a1b2c3",
          "type": "paragraph",
          "data": {
            "text": "Welcome to Angular 20!"
          }
        }
      ],
      "version": "2.29.1"
    },
    "completed": false
  }
]
```

- Al hacer clic en "Marcar como completada", se debe actualizar el campo `completed: true`.
- El estado de cada lección se guarda en `localStorage`.

---

## 🧩 Requisitos funcionales

- ✅ Mostrar lista de lecciones con indicador visual de avance
- ✅ Al hacer clic en una lección, cargar su contenido en el editor
- ✅ Editor.js en modo **readonly** por defecto
- ✅ Botón "**Marcar como completada**" por lección
- ✅ Al completar una lección, permitir pasar a la siguiente
- ✅ Persistir progreso en `localStorage`
- ✅ Al iniciar la app, cargar progreso guardado
- ✅ Diseño responsive (desktop/tablet)

---

## 🛠️ Mejores prácticas Angular

- Usar **standalone components** (sin NgModules)
- NO poner `standalone: true` (ya es el valor por defecto)
- Usar `signals` para manejar el estado local
- Usar `computed()` para estados derivados
- NO usar `mutate()` en signals (solo `set()` o `update()`)
- NO usar `@HostBinding` ni `@HostListener`
- Usar `host` en el decorador del componente/directiva
- Usar `NgOptimizedImage` para imágenes estáticas
- Usar funciones `input()` y `output()` en lugar de decoradores
- Preferir templates inline en componentes pequeños
- Evitar `ngClass` y `ngStyle`; usar bindings `[class]` y `[style]`
- Usar control de flujo nativo (`@if`, `@for`, `@switch`)
- Usar `ChangeDetectionStrategy.OnPush`
- Usar Reactive Forms (no Template-driven)

---

## 🔚 Extras opcionales

- 🔄 Barra de progreso general del workshop (ej. “3 de 10 completadas”)
- 🔁 Opción para reiniciar el progreso desde configuración
- 🌙 Soporte para modo oscuro (Angular Material)

---
