/**
 * @fileoverview Utilidades generales del proyecto
 * @version 1.0.0
 * Funciones auxiliares para lectura de archivos, impresión de mensajes y manejo de rutas
 */

const fs = require("fs");
const path = require("path");
const { COLORS, MESSAGES, VALIDATION } = require("../lib/constants");

/**
 * Lee un archivo de plano de forma síncrona
 * @param {string} filePath - Ruta absoluta o relativa del archivo
 * @returns {string} Contenido del archivo en formato UTF-8
 * @throws {Error} Si no se puede leer el archivo o no existe
 * @example
 * const content = readBoardFile("./plano.txt");
 */
function readBoardFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(MESSAGES.ERROR_FILE_NOT_FOUND);
    }
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    throw new Error(`${MESSAGES.ERROR_READ_FILE} ${error.message}`);
  }
}

/**
 * Verifica si un archivo existe en el sistema de archivos
 * @param {string} filePath - Ruta a verificar
 * @returns {boolean} True si el archivo existe, false en caso contrario
 * @example
 * if (fileExists("./plano.txt")) {
 *   console.log("El archivo existe");
 * }
 */
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * Imprime un mensaje con color específico en la consola
 * @param {string} message - Mensaje a imprimir
 * @param {string} [color=COLORS.RESET] - Código ANSI del color
 * @returns {void}
 * @example
 * printColored("Hola mundo", COLORS.GREEN);
 */
function printColored(message, color = COLORS.RESET) {
  console.log(`${color}${message}${COLORS.RESET}`);
}

/**
 * Imprime un mensaje de error en rojo
 * @param {string} message - Mensaje de error
 * @returns {void}
 * @example
 * printError("Algo salió mal");
 */
function printError(message) {
  console.error(`${COLORS.RED}✗ ${message}${COLORS.RESET}`);
}

/**
 * Imprime un mensaje de éxito en verde
 * @param {string} message - Mensaje de éxito
 * @returns {void}
 * @example
 * printSuccess("Operación completada");
 */
function printSuccess(message) {
  console.log(`${COLORS.GREEN}✓ ${message}${COLORS.RESET}`);
}

/**
 * Imprime un mensaje informativo en azul
 * @param {string} message - Mensaje informativo
 * @returns {void}
 * @example
 * printInfo("Procesando archivo...");
 */
function printInfo(message) {
  console.log(`${COLORS.BLUE}ℹ ${message}${COLORS.RESET}`);
}

/**
 * Imprime un mensaje de advertencia en amarillo
 * @param {string} message - Mensaje de advertencia
 * @returns {void}
 * @example
 * printWarning("Este archivo ya existe");
 */
function printWarning(message) {
  console.log(`${COLORS.YELLOW}⚠ ${message}${COLORS.RESET}`);
}

/**
 * Obtiene la ruta absoluta de un archivo
 * Si es relativa, la convierte usando el CWD actual
 * @param {string} filePath - Ruta del archivo (absoluta o relativa)
 * @returns {string} Ruta absoluta del archivo
 * @example
 * const absPath = getAbsolutePath("./plano.txt");
 */
function getAbsolutePath(filePath) {
  if (path.isAbsolute(filePath)) {
    return filePath;
  }
  return path.resolve(process.cwd(), filePath);
}

/**
 * Valida el nombre de un proyecto
 * @param {string} projectName - Nombre del proyecto a validar
 * @returns {Object} Objeto con propiedades: {valid: boolean, error?: string}
 * @example
 * const result = validateProjectName("mi-proyecto");
 * if (!result.valid) {
 *   console.error(result.error);
 * }
 */
function validateProjectName(projectName) {
  if (!projectName || projectName.length === 0) {
    return { valid: false, error: "El nombre del proyecto no puede estar vacío" };
  }

  if (projectName.length > VALIDATION.MAX_PROJECT_NAME_LENGTH) {
    return {
      valid: false,
      error: `El nombre no puede exceder ${VALIDATION.MAX_PROJECT_NAME_LENGTH} caracteres`,
    };
  }

  if (!VALIDATION.VALID_NAME_PATTERN.test(projectName)) {
    return {
      valid: false,
      error: "Solo se permiten letras, números, guiones y underscores",
    };
  }

  return { valid: true };
}

/**
 * Imprime un banner decorativo en la consola
 * @param {string} title - Título a mostrar
 * @returns {void}
 * @example
 * printBanner("Arquitecto de Proyectos");
 */
function printBanner(title) {
  console.log("\n");
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log(`║  ${title.padEnd(54)}║`);
  console.log("╚══════════════════════════════════════════════════════════╝\n");
}

module.exports = {
  readBoardFile,
  fileExists,
  printColored,
  printError,
  printSuccess,
  printInfo,
  printWarning,
  getAbsolutePath,
  validateProjectName,
  printBanner,
};
