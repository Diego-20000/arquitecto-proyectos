/**
 * @fileoverview Parser para archivos de plano
 * @version 1.0.0
 * Analiza archivos de texto plano y extrae la estructura del proyecto
 */

const { SYMBOLS, TREE_CHARS, MESSAGES } = require("../lib/constants");

/**
 * Parsea el contenido de un archivo de plano y lo convierte en estructura
 * @param {string} content - Contenido del archivo de plano
 * @returns {Object} Estructura parsada del proyecto
 * @throws {Error} Si el formato del plano es inválido
 * @example
 * const structure = parseBoard("proyecto/\n├── 📁 src/\n│   └── 📄 main.js");
 */
function parseBoard(content) {
  if (!content || typeof content !== "string") {
    throw new Error("El contenido del plano debe ser una cadena de texto válida");
  }

  const lines = content.split("\n").filter((line) => line.trim());

  if (lines.length === 0) {
    throw new Error("El plano está vacío");
  }

  const structure = {};
  let currentPath = [];
  let previousLevel = -1;

  lines.forEach((line, index) => {
    try {
      const level = calculateLevel(line);
      const isFolder = line.includes(SYMBOLS.FOLDER);
      const isFile = line.includes(SYMBOLS.FILE);
      const name = extractName(line);

      // Validar que sea carpeta o archivo
      if (!isFolder && !isFile) {
        // Primera línea puede no tener símbolos
        if (index === 0 && line.trim().endsWith("/")) {
          const rootName = line.trim().replace("/", "").trim();
          currentPath = [rootName];
          setInStructure(structure, currentPath, { type: "root" });
          previousLevel = 0;
          return;
        }
        return;
      }

      if (!name) return;

      // Ajustar el path actual basado en el nivel
      currentPath = currentPath.slice(0, level);
      currentPath.push(name);
      previousLevel = level;

      if (isFolder) {
        setInStructure(structure, currentPath, { type: "folder" });
      } else if (isFile) {
        setInStructure(structure, currentPath, { type: "file" });
      }
    } catch (error) {
      throw new Error(`Error parseando línea ${index + 1}: ${error.message}`);
    }
  });

  return structure;
}

/**
 * Calcula el nivel de profundidad de una línea en el árbol
 * @param {string} line - Línea a analizar
 * @returns {number} Nivel de profundidad (0 = raíz)
 * @example
 * const level = calculateLevel("│   ├── 📁 src/");
 */
function calculateLevel(line) {
  let level = 0;
  let i = 0;

  while (i < line.length) {
    // Buscar caracteres de rama
    if (line.substring(i, i + 2) === TREE_CHARS.BRANCH ||
        line.substring(i, i + 2) === TREE_CHARS.LAST_BRANCH) {
      return level;
    }

    // Contar lineas verticales
    if (line.substring(i, i + 1) === TREE_CHARS.VERTICAL) {
      level++;
      i += 1;
    }
    // Contar espacios de continuación
    else if (line.substring(i, i + 4) === TREE_CHARS.CONTINUATION) {
      level++;
      i += 4;
    } else {
      i++;
    }
  }

  return level;
}

/**
 * Extrae el nombre del archivo o carpeta desde una línea
 * @param {string} line - Línea que contiene el nombre
 * @returns {string|null} Nombre extraído o null si no hay
 * @example
 * const name = extractName("├── 📁 src/");
 * // Devuelve: "src"
 */
function extractName(line) {
  if (!line || typeof line !== "string") {
    return null;
  }

  // Buscar patrón: símbolo + espacios + nombre + / opcional
  // Intentar con patrón flexible que funcione con emojis multi-byte
  const match = line.match(/[📁📄]/);
  
  if (!match) {
    return null;
  }

  // Obtener posición del emoji
  const emojiIndex = line.indexOf(match[0]);
  
  // Extraer todo después del emoji
  let afterEmoji = line.substring(emojiIndex + match[0].length).trim();
  
  // Limpiar cualquier slash al final
  afterEmoji = afterEmoji.replace(/\/$/, "").trim();
  
  return afterEmoji || null;
}

/**
 * Asigna un valor en una estructura anidada dinámicamente
 * Crea los niveles intermedios si no existen
 * @param {Object} obj - Objeto donde asignar el valor
 * @param {string[]} path - Array con la ruta del elemento
 * @param {*} value - Valor a asignar
 * @throws {Error} Si la ruta es inválida
 * @example
 * const obj = {};
 * setInStructure(obj, ["src", "main.js"], { type: "file" });
 */
function setInStructure(obj, path, value) {
  if (!Array.isArray(path) || path.length === 0) {
    throw new Error("La ruta debe ser un array no vacío");
  }

  let current = obj;

  // Navegar/crear los niveles intermedios
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];

    if (!current[key]) {
      current[key] = {};
    }

    if (typeof current[key] !== "object" || current[key] === null) {
      throw new Error(`Conflicto de ruta: ${key} ya es un archivo`);
    }

    current = current[key];
  }

  // Asignar el valor final
  const finalKey = path[path.length - 1];
  current[finalKey] = value;
}

module.exports = {
  parseBoard,
  calculateLevel,
  extractName,
  setInStructure,
};
