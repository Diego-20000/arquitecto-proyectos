/**
 * Parser - Análiza el archivo de plano y extrae la estructura del proyecto
 */

const { SYMBOLS, TREE_CHARS } = require("../lib/constants");

/**
 * Lee y parsea un archivo de plano
 * @param {string} content - Contenido del archivo de plano
 * @returns {Object} - Estructura parsada del proyecto
 */
function parseBoard(content) {
  const lines = content.split("\n").filter((line) => line.trim());
  const structure = {};
  let currentPath = [];

  lines.forEach((line, index) => {
    const level = calculateLevel(line);
    const isFolder = line.includes(SYMBOLS.FOLDER);
    const isFile = line.includes(SYMBOLS.FILE);
    const name = extractName(line);

    if (!name) return;

    currentPath = currentPath.slice(0, level);
    currentPath.push(name);

    if (isFolder) {
      setInStructure(structure, currentPath, { type: "folder" });
    } else if (isFile) {
      setInStructure(structure, currentPath, { type: "file" });
    }
  });

  return structure;
}

/**
 * Calcula el nivel de profundidad de una línea
 * @param {string} line - Línea del archivo
 * @returns {number} - Nivel de profundidad
 */
function calculateLevel(line) {
  let level = 0;
  let i = 0;

  while (i < line.length) {
    if (line.substring(i, i + 2) === TREE_CHARS.BRANCH ||
        line.substring(i, i + 2) === TREE_CHARS.LAST_BRANCH) {
      return level;
    }
    if (line.substring(i, i + 1) === TREE_CHARS.VERTICAL) {
      level++;
      i += 1;
    } else if (line.substring(i, i + 4) === TREE_CHARS.CONTINUATION) {
      level++;
      i += 4;
    } else {
      i++;
    }
  }

  return level;
}

/**
 * Extrae el nombre del archivo o carpeta de una línea
 * @param {string} line - Línea del archivo
 * @returns {string} - Nombre extraído
 */
function extractName(line) {
  const match = line.match(/[📁📄]\s*(.+?)(?:\/)?$/);
  return match ? match[1].trim() : null;
}

/**
 * Asigna un valor en una estructura anidada
 * @param {Object} obj - Objeto donde asignar
 * @param {Array} path - Ruta del elemento
 * @param {*} value - Valor a asignar
 */
function setInStructure(obj, path, value) {
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!current[key]) {
      current[key] = {};
    }
    current = current[key];
  }
  current[path[path.length - 1]] = value;
}

module.exports = {
  parseBoard,
  calculateLevel,
  extractName,
};
