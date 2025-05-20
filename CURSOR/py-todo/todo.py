import json
import os

STORAGE_FILE = 'storage.json'

def load_tasks():
    """Carga las tareas desde el archivo de almacenamiento."""
    if not os.path.exists(STORAGE_FILE):
        return []
    try:
        with open(STORAGE_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print('Error al cargar tareas:', e)
        return []

def save_tasks(tasks):
    """Guarda las tareas en el archivo de almacenamiento."""
    try:
        with open(STORAGE_FILE, 'w', encoding='utf-8') as f:
            json.dump(tasks, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print('Error al guardar tareas:', e)

def add_task(desc):
    """Agrega una nueva tarea."""
    tasks = load_tasks()
    tasks.append({'desc': desc, 'done': False})
    save_tasks(tasks)
    print('Tarea agregada.')

def list_tasks():
    """Lista todas las tareas."""
    tasks = load_tasks()
    if not tasks:
        print('No hay tareas.')
        return
    for i, t in enumerate(tasks, 1):
        print(f"{i}. [{'x' if t['done'] else ' '}] {t['desc']}")

def complete_task(idx):
    """Marca una tarea como completada."""
    tasks = load_tasks()
    if idx < 1 or idx > len(tasks):
        print('Índice inválido.')
        return
    tasks[idx - 1]['done'] = True
    save_tasks(tasks)
    print('Tarea completada.')

if __name__ == '__main__':
    import sys
    args = sys.argv[1:]
    if not args:
        print('Comandos: add <desc>, list, done <n>')
    elif args[0] == 'add':
        add_task(' '.join(args[1:]))
    elif args[0] == 'list':
        list_tasks()
    elif args[0] == 'done':
        complete_task(int(args[1]))
    else:
        print('Comandos: add <desc>, list, done <n>')

