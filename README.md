# To Do App (Desafío Integrador)

## Descripción

Esta To Do App funciona por consola y guarda las tareas localmente usando un archivo JSON (simulando localStorage). Está implementada en **JavaScript (Node.js)** y **Python**.

## Estructura del proyecto

```
Mi-primer-repositorio/
│
├─ js-todo/
│   ├─ todo.js
│   └─ storage.json
│
├─ py-todo/
│   ├─ todo.py
│   └─ storage.json
│
└─ README.md
```

## Uso

### Node.js

1. Instala Node.js si no lo tienes ([nodejs.org](https://nodejs.org/)).
2. En consola:

```bash
cd js-todo
node todo.js add "Aprender Node"
node todo.js list
node todo.js done 1
node todo.js undone 1
node todo.js delete 1
```

### Python

1. Instala Python si no lo tienes ([python.org](https://python.org/)).
2. En consola:

```bash
cd py-todo
python todo.py add "Aprender Python"
python todo.py list
python todo.py done 1
python todo.py undone 1
python todo.py delete 1
```

## Comandos disponibles

- `add <desc>`: Agrega una tarea.
- `list`: Lista tareas y muestra resumen de completadas.
- `done <n>`: Marca la tarea n como completada.
- `undone <n>`: Desmarca la tarea n.
- `delete <n>`: Elimina la tarea n.

## Mejoras implementadas

- Validación de entradas y manejo de errores robusto.
- Comandos para eliminar, marcar y desmarcar tareas.
- Resumen visual de tareas completadas.
- Código modular, limpio y documentado.
- Mensaje de ayuda claro y completo.

## ¿Cómo me ayudó CURSOR?

CURSOR me permitió:
- Generar rápidamente la estructura base de los archivos.
- Refactorizar y documentar el código de manera eficiente.
- Detectar errores y mejorar la legibilidad.
- Probar y comparar implementaciones en diferentes lenguajes.
- Iterar rápidamente sobre nuevas funcionalidades y mejoras.

---

¡Listo para gestionar tus tareas desde la terminal en dos lenguajes diferentes!