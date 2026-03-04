/**
 * @fileoverview Constantes utilizadas en todo el proyecto
 * @version 1.0.0
 * Definiciones centralizadas de símbolos, colores y mensajes
 */

/**
 * Símbolos utilizados en los archivos de plano
 * @type {Object}
 * @property {string} FOLDER - Símbolo para carpetas
 * @property {string} FILE - Símbolo para archivos
 */
const SYMBOLS = {
  FOLDER: "📁",
  FILE: "📄",
};

/**
 * Caracteres especiales para construcción del árbol de directorios
 * @type {Object}
 * @property {string} BRANCH - Rama con más hermanos (├──)
 * @property {string} LAST_BRANCH - Última rama (└──)
 * @property {string} VERTICAL - Línea vertical (│)
 * @property {string} CONTINUATION - Espacios de continuidad
 */
const TREE_CHARS = {
  BRANCH: "├──",
  LAST_BRANCH: "└──",
  VERTICAL: "│",
  CONTINUATION: "    ",
};

/**
 * Códigos ANSI para colores en terminal
 * @type {Object}
 * @property {string} RESET - Restablecer color
 * @property {string} BRIGHT - Texto brillante
 * @property {string} DIM - Texto oscuro
 * @property {string} GREEN - Color verde
 * @property {string} YELLOW - Color amarillo
 * @property {string} BLUE - Color azul
 * @property {string} RED - Color rojo
 */
const COLORS = {
  RESET: "\x1b[0m",
  BRIGHT: "\x1b[1m",
  DIM: "\x1b[2m",
  GREEN: "\x1b[32m",
  YELLOW: "\x1b[33m",
  BLUE: "\x1b[36m",
  RED: "\x1b[31m",
};

/**
 * Mensajes estándar de la aplicación
 * @type {Object}
 */
const MESSAGES = {
  WELCOME: "¡Bienvenido al Arquitecto de Proyectos!",
  ERROR_NO_FILE: "Error: No se proporcionó un archivo de plano.",
  ERROR_FILE_NOT_FOUND: "Error: El archivo no existe.",
  ERROR_INVALID_FORMAT: "Error: Formato de plano inválido.",
  ERROR_READ_FILE: "Error: No se pudo leer el archivo.",
  ERROR_CREATE_DIR: "Error: No se pudo crear el directorio.",
  SUCCESS_CREATED: "✓ Proyecto creado exitosamente.",
  PARSING: "Parseando plano...",
  BUILDING: "Construyendo estructura...",
  VALIDATING: "Validando configuración...",
};

/**
 * Configuración de validación
 * @type {Object}
 */
const VALIDATION = {
  MIN_PROJECT_NAME_LENGTH: 1,
  MAX_PROJECT_NAME_LENGTH: 255,
  VALID_NAME_PATTERN: /^[a-zA-Z0-9_-]+$/,
};

module.exports = {
  SYMBOLS,
  TREE_CHARS,
  COLORS,
  MESSAGES,
  VALIDATION,
};
