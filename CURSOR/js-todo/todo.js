// js-todo/todo.js

const fs = require('fs');
const STORAGE_FILE = './storage.json';

/**
 * Carga las tareas desde el archivo de almacenamiento.
 * @returns {Array} Lista de tareas.
 */
const loadTasks = () => {
  try {
    if (!fs.existsSync(STORAGE_FILE)) return [];
    const data = fs.readFileSync(STORAGE_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al cargar tareas:', err.message);
    process.exit(1);
  }
};

/**
 * Guarda las tareas en el archivo de almacenamiento.
 * @param {Array} tasks - Lista de tareas.
 */
const saveTasks = (tasks) => {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error('Error al guardar tareas:', err.message);
    process.exit(1);
  }
};

/**
 * Agrega una nueva tarea.
 * @param {string} desc - Descripción de la tarea.
 */
const addTask = (desc) => {
  if (!desc.trim()) {
    console.log('La descripción no puede estar vacía.');
    process.exit(1);
  }
  const tasks = loadTasks();
  tasks.push({ desc, done: false });
  saveTasks(tasks);
  console.log('Tarea agregada.');
};

/**
 * Lista todas las tareas y muestra un resumen.
 */
const listTasks = () => {
  const tasks = loadTasks();
  if (tasks.length === 0) return console.log('No hay tareas.');
  let doneCount = 0;
  tasks.forEach((t, i) => {
    if (t.done) doneCount++;
    console.log(`${i + 1}. [${t.done ? 'x' : ' '}] ${t.desc}`);
  });
  console.log(`\nResumen: ${doneCount}/${tasks.length} completadas.`);
};

/**
 * Marca una tarea como completada o incompleta.
 * @param {number} idx - Índice de la tarea.
 * @param {boolean} value - true para completar, false para desmarcar.
 */
const setTaskDone = (idx, value = true) => {
  const tasks = loadTasks();
  if (!Number.isInteger(idx) || idx < 1 || idx > tasks.length) {
    console.log('Índice inválido.');
    process.exit(1);
  }
  tasks[idx - 1].done = value;
  saveTasks(tasks);
  console.log(value ? 'Tarea completada.' : 'Tarea desmarcada.');
};

/**
 * Elimina una tarea por índice.
 * @param {number} idx - Índice de la tarea.
 */
const deleteTask = (idx) => {
  const tasks = loadTasks();
  if (!Number.isInteger(idx) || idx < 1 || idx > tasks.length) {
    console.log('Índice inválido.');
    process.exit(1);
  }
  const [removed] = tasks.splice(idx - 1, 1);
  saveTasks(tasks);
  console.log(`Tarea eliminada: ${removed.desc}`);
};

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
    setTaskDone(Number(args[0]), true);
    break;
  case 'undone':
    setTaskDone(Number(args[0]), false);
    break;
  case 'delete':
    deleteTask(Number(args[0]));
    break;
  default:
    console.log('Comandos disponibles:');
    console.log('  add <desc>      Agrega una tarea');
    console.log('  list            Lista tareas');
    console.log('  done <n>        Marca la tarea n como completada');
    console.log('  undone <n>      Desmarca la tarea n');
    console.log('  delete <n>      Elimina la tarea n');
    break;
}
  