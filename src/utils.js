/**
 * Utilidades - Funciones auxiliares generales
 */

const fs = require("fs");
const path = require("path");
const { COLORS, MESSAGES } = require("../lib/constants");

/**
 * Lee un archivo de plano
 * @param {string} filePath - Ruta del archivo
 * @returns {string} - Contenido del archivo
 */
function readBoardFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    throw new Error(`No se pudo leer el archivo: ${error.message}`);
  }
}

/**
 * Valida que el archivo exista
 * @param {string} filePath - Ruta del archivo
 * @returns {boolean} - True si existe
 */
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * Imprime un mensaje con color
 * @param {string} message - Mensaje a imprimir
 * @param {string} color - Color a usar
 */
function printColored(message, color = COLORS.RESET) {
  console.log(`${color}${message}${COLORS.RESET}`);
}

/**
 * Imprime un mensaje de error
 * @param {string} message - Mensaje de error
 */
function printError(message) {
  console.error(`${COLORS.RED}✗ ${message}${COLORS.RESET}`);
}

/**
 * Imprime un mensaje de éxito
 * @param {string} message - Mensaje de éxito
 */
function printSuccess(message) {
  console.log(`${COLORS.GREEN}✓ ${message}${COLORS.RESET}`);
}

/**
 * Imprime un mensaje informativo
 * @param {string} message - Mensaje informativo
 */
function printInfo(message) {
  console.log(`${COLORS.BLUE}ℹ ${message}${COLORS.RESET}`);
}

/**
 * Obtiene la ruta absoluta o relativa
 * @param {string} filePath - Ruta del archivo
 * @returns {string} - Ruta absoluta
 */
function getAbsolutePath(filePath) {
  if (path.isAbsolute(filePath)) {
    return filePath;
  }
  return path.resolve(process.cwd(), filePath);
}

module.exports = {
  readBoardFile,
  fileExists,
  printColored,
  printError,
  printSuccess,
  printInfo,
  getAbsolutePath,
};
