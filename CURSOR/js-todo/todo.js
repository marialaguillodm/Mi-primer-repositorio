// js-todo/todo.js

const fs = require('fs');
const STORAGE_FILE = './storage.json';

/**
 * Carga las tareas desde el archivo de almacenamiento.
 * @returns {Array} Lista de tareas.
 */
function loadTasks() {
  try {
    if (!fs.existsSync(STORAGE_FILE)) return [];
    const data = fs.readFileSync(STORAGE_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al cargar tareas:', err);
    return [];
  }
}

/**
 * Guarda las tareas en el archivo de almacenamiento.
 * @param {Array} tasks - Lista de tareas.
 */
function saveTasks(tasks) {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error('Error al guardar tareas:', err);
  }
}

/**
 * Agrega una nueva tarea.
 * @param {string} desc - Descripción de la tarea.
 */
function addTask(desc) {
  const tasks = loadTasks();
  tasks.push({ desc, done: false });
  saveTasks(tasks);
  console.log('Tarea agregada.');
}

/**
 * Lista todas las tareas.
 */
function listTasks() {
  const tasks = loadTasks();
  if (tasks.length === 0) return console.log('No hay tareas.');
  tasks.forEach((t, i) => {
    console.log(`${i + 1}. [${t.done ? 'x' : ' '}] ${t.desc}`);
  });
}

/**
 * Marca una tarea como completada.
 * @param {number} idx - Índice de la tarea.
 */
function completeTask(idx) {
  const tasks = loadTasks();
  if (idx < 1 || idx > tasks.length) {
    return console.log('Índice inválido.');
  }
  tasks[idx - 1].done = true;
  saveTasks(tasks);
  console.log('Tarea completada.');
}

// --- CLI ---
const [,, cmd, ...args] = process.argv;
switch (cmd) {
  case 'add':
    addTask(args.join(' '));
    break;
  case 'list':
    listTasks();
    break;
  case 'done':
    completeTask(Number(args[0]));
    break;
  default:
    console.log('Comandos: add <desc>, list, done <n>');
}
  