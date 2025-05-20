import json
import os
import sys
from typing import List, Dict

STORAGE_FILE = 'storage.json'


def load_tasks() -> List[Dict]:
    """Carga las tareas desde el archivo de almacenamiento."""
    if not os.path.exists(STORAGE_FILE):
        return []
    try:
        with open(STORAGE_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print('Error al cargar tareas:', e)
        sys.exit(1)


def save_tasks(tasks: List[Dict]):
    """Guarda las tareas en el archivo de almacenamiento."""
    try:
        with open(STORAGE_FILE, 'w', encoding='utf-8') as f:
            json.dump(tasks, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print('Error al guardar tareas:', e)
        sys.exit(1)


def add_task(desc: str):
    """Agrega una nueva tarea."""
    if not desc.strip():
        print('La descripción no puede estar vacía.')
        sys.exit(1)
    tasks = load_tasks()
    tasks.append({'desc': desc, 'done': False})
    save_tasks(tasks)
    print('Tarea agregada.')


def list_tasks():
    """Lista todas las tareas y muestra un resumen."""
    tasks = load_tasks()
    if not tasks:
        print('No hay tareas.')
        return
    done_count = 0
    for i, t in enumerate(tasks, 1):
        if t['done']:
            done_count += 1
        print(f"{i}. [{'x' if t['done'] else ' '}] {t['desc']}")
    print(f"\nResumen: {done_count}/{len(tasks)} completadas.")


def set_task_done(idx: int, value: bool = True):
    """Marca una tarea como completada o incompleta."""
    tasks = load_tasks()
    if not isinstance(idx, int) or idx < 1 or idx > len(tasks):
        print('Índice inválido.')
        sys.exit(1)
    tasks[idx - 1]['done'] = value
    save_tasks(tasks)
    print('Tarea completada.' if value else 'Tarea desmarcada.')


def delete_task(idx: int):
    """Elimina una tarea por índice."""
    tasks = load_tasks()
    if not isinstance(idx, int) or idx < 1 or idx > len(tasks):
        print('Índice inválido.')
        sys.exit(1)
    removed = tasks.pop(idx - 1)
    save_tasks(tasks)
    print(f"Tarea eliminada: {removed['desc']}")


def print_help():
    print('Comandos disponibles:')
    print('  add <desc>      Agrega una tarea')
    print('  list            Lista tareas')
    print('  done <n>        Marca la tarea n como completada')
    print('  undone <n>      Desmarca la tarea n')
    print('  delete <n>      Elimina la tarea n')


if __name__ == '__main__':
    args = sys.argv[1:]
    if not args:
        print_help()
    elif args[0] == 'add':
        add_task(' '.join(args[1:]))
    elif args[0] == 'list':
        list_tasks()
    elif args[0] == 'done':
        try:
            set_task_done(int(args[1]), True)
        except (IndexError, ValueError):
            print('Debes indicar un número de tarea válido.')
            sys.exit(1)
    elif args[0] == 'undone':
        try:
            set_task_done(int(args[1]), False)
        except (IndexError, ValueError):
            print('Debes indicar un número de tarea válido.')
            sys.exit(1)
    elif args[0] == 'delete':
        try:
            delete_task(int(args[1]))
        except (IndexError, ValueError):
            print('Debes indicar un número de tarea válido.')
            sys.exit(1)
    else:
        print_help()

