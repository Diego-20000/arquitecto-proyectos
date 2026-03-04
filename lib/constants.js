/**
 * Constantes utilizadas en toda la aplicación
 */

const SYMBOLS = {
  FOLDER: "📁",
  FILE: "📄",
};

const TREE_CHARS = {
  BRANCH: "├──",
  LAST_BRANCH: "└──",
  VERTICAL: "│",
  CONTINUATION: "    ",
};

const COLORS = {
  RESET: "\x1b[0m",
  BRIGHT: "\x1b[1m",
  DIM: "\x1b[2m",
  GREEN: "\x1b[32m",
  YELLOW: "\x1b[33m",
  BLUE: "\x1b[36m",
  RED: "\x1b[31m",
};

const MESSAGES = {
  WELCOME: "¡Bienvenido al Arquitecto de Proyectos!",
  ERROR_NO_FILE: "Error: No se proporcionó un archivo de plano.",
  ERROR_FILE_NOT_FOUND: "Error: El archivo no existe.",
  SUCCESS_CREATED: "✓ Proyecto creado exitosamente.",
  PARSING: "Parseando plano...",
  BUILDING: "Construyendo estructura...",
};

module.exports = {
  SYMBOLS,
  TREE_CHARS,
  COLORS,
  MESSAGES,
};
