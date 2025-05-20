# To Do App (Desafío Integrador)

## Descripción

Esta To Do App funciona por consola y guarda las tareas localmente usando un archivo JSON (simulando localStorage). Está implementada en **JavaScript (Node.js)** y **Python**.

## Estructura

- `js-todo/todo.js`: Versión en Node.js.
- `py-todo/todo.py`: Versión en Python.
- `storage.json`: Archivo de almacenamiento local.
- `README.md`: Este archivo.

## Uso

### Node.js

```bash
cd js-todo
node todo.js add "Aprender Node"
node todo.js list
node todo.js done 1
```

### Python

```bash
cd py-todo
python todo.py add "Aprender Python"
python todo.py list
python todo.py done 1
```

## ¿Cómo me ayudó CURSOR?

CURSOR me permitió:

- Generar rápidamente la estructura base de los archivos.
- Refactorizar y documentar el código de manera eficiente.
- Detectar errores y mejorar la legibilidad.
- Probar y comparar implementaciones en diferentes lenguajes.

## Comandos

- `add <desc>`: Agrega una tarea.
- `list`: Lista tareas.
- `done <n>`: Marca la tarea n como completada.

---

¡Listo! Si quieres que cree los archivos en tu proyecto, avísame. ¿Te gustaría que los cree automáticamente?
