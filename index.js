#!/usr/bin/env node

/**
 * @fileoverview CLI principal para Arquitecto de Proyectos
 * @version 1.0.0
 * 
 * Herramienta de línea de comandos para generar estructuras de proyectos
 * a partir de archivos de texto plano con formato tree-like
 * 
 * Uso:
 *   node index.js <archivo-plano> [nombre-proyecto]
 * 
 * Ejemplos:
 *   node index.js plano.txt
 *   node index.js examples/ejemplo-web.txt mi-app
 */

const fs = require("fs");
const path = require("path");
const { parseBoard } = require("./src/parser");
const { buildStructure } = require("./src/builder");
const {
  readBoardFile,
  fileExists,
  printSuccess,
  printError,
  printInfo,
  printWarning,
  validateProjectName,
  printBanner,
  getAbsolutePath,
} = require("./src/utils");
const { COLORS, MESSAGES, VALIDATION } = require("./lib/constants");

// Configuración
const VERSION = "1.0.0";
const ARGS = process.argv.slice(2);

/**
 * Función principal de la aplicación
 * Coordina el flujo: validación → parseo → construcción → resultado
 * @returns {void}
 * @throws {Error} Si hay algún error durante la ejecución
 * 
 * Salida códigos de error:
 * - 0: Éxito
 * - 1: Error general
 * - 2: Argumentos inválidos
 * - 3: Archivo no encontrado
 * - 4: Permiso denegado
 */
function main() {
  try {
    // Mostrar banner
    printBanner("Arquitecto de Proyectos");

    // Procesar argumentos y opciones
    const options = parseArguments(ARGS);

    // Validar argumentos básicos
    if (options.help) {
      showHelp();
      process.exit(0);
    }

    if (options.version) {
      console.log(`\n${COLORS.BRIGHT}Arquitecto de Proyectos${COLORS.RESET} v${VERSION}\n`);
      process.exit(0);
    }

    if (!options.boardPath) {
      printError("Falta el archivo de plano (requerido)");
      console.log(`${COLORS.DIM}Usa: node index.js <archivo-plano> [nombre-proyecto]${COLORS.RESET}\n`);
      process.exit(2);
    }

    // Resolver ruta del archivo de plano
    const boardPath = getAbsolutePath(options.boardPath);

    // Validar existencia del archivo
    if (!fileExists(boardPath)) {
      printError(`El archivo de plano no existe: ${options.boardPath}`);
      process.exit(3);
    }

    // Leer el contenido del archivo de plano
    printInfo(MESSAGES.PARSING);
    let boardContent;
    try {
      boardContent = readBoardFile(boardPath);
    } catch (error) {
      if (error.code === "EACCES") {
        printError(`Permiso denegado al leer: ${boardPath}`);
        process.exit(4);
      }
      throw error;
    }

    // Parsear la estructura
    let structure;
    try {
      structure = parseBoard(boardContent);
    } catch (error) {
      printError(`Error parseando el archivo: ${error.message}`);
      process.exit(1);
    }

    // Determinar nombre del proyecto
    let projectName = options.projectName;
    if (!projectName) {
      // Extraer del archivo plano (primera línea)
      const firstLine = boardContent.split("\n")[0].trim();
      projectName = firstLine.replace("/", "").trim();
    }

    // Validar nombre del proyecto
    if (!projectName) {
      printError("No se pudo determinar el nombre del proyecto");
      process.exit(2);
    }

    const validation = validateProjectName(projectName);
    if (!validation.valid) {
      printError(`Nombre de proyecto inválido: ${validation.error}`);
      process.exit(2);
    }

    // Construir la estructura
    printInfo(MESSAGES.BUILDING);
    const basePath = process.cwd();
    let buildResult;

    try {
      buildResult = buildStructure(structure, basePath, projectName);
    } catch (error) {
      if (error.message.includes("Permiso denegado")) {
        printError(`Permiso denegado: ${error.message}`);
        process.exit(4);
      }
      printError(`Error creando estructura: ${error.message}`);
      process.exit(1);
    }

    // Mostrar resultado exitoso
    console.log();
    printSuccess("✓ Estructura de proyecto creada exitosamente");
    console.log(`  ${COLORS.BRIGHT}Ubicación:${COLORS.RESET} ${buildResult.path}`);
    console.log(`  ${COLORS.BRIGHT}Elementos:${COLORS.RESET} ${buildResult.itemsCreated} creados`);
    console.log(`\n${COLORS.DIM}Para empezar:${COLORS.RESET}`);
    console.log(`  ${COLORS.BRIGHT}cd ${projectName}${COLORS.RESET}\n`);
  } catch (error) {
    printError(`Error inesperado: ${error.message}`);
    if (process.env.DEBUG === "true") {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

/**
 * Parsea los argumentos de línea de comandos
 * Soporta argumentos posicionales y opciones
 * @param {string[]} args - Array de argumentos (process.argv.slice(2))
 * @returns {Object} Objeto con propiedades: boardPath, projectName, help, version
 * @example
 * const opts = parseArguments([
 *   'ejemplos/ejemplo-web.txt',
 *   'mi-proyecto'
 * ]);
 * // Devuelve: {
 * //   boardPath: 'ejemplos/ejemplo-web.txt',
 * //   projectName: 'mi-proyecto',
 * //   help: false,
 * //   version: false
 * // }
 */
function parseArguments(args) {
  const options = {
    boardPath: null,
    projectName: null,
    help: false,
    version: false,
  };

  args.forEach((arg, index) => {
    if (arg === "-h" || arg === "--help") {
      options.help = true;
    } else if (arg === "-v" || arg === "--version") {
      options.version = true;
    } else if (!arg.startsWith("-")) {
      // Argumentos posicionales
      if (!options.boardPath) {
        options.boardPath = arg;
      } else if (!options.projectName) {
        options.projectName = arg;
      }
    }
  });

  return options;
}

/**
 * Muestra la pantalla de ayuda e información de uso
 * Incluye descripción, opciones, ejemplos y más información
 * @returns {void}
 */
function showHelp() {
  console.log(`
${COLORS.BRIGHT}${COLORS.CYAN}╔════════════════════════════════════════════════════╗${COLORS.RESET}
${COLORS.BRIGHT}${COLORS.CYAN}║   Arquitecto de Proyectos - v${VERSION}              ${COLORS.CYAN}║${COLORS.RESET}
${COLORS.BRIGHT}${COLORS.CYAN}║   Generador de Estructuras de Proyectos           ${COLORS.CYAN}║${COLORS.RESET}
${COLORS.BRIGHT}${COLORS.CYAN}╚════════════════════════════════════════════════════╝${COLORS.RESET}

${COLORS.BRIGHT}DESCRIPCIÓN${COLORS.RESET}
  Genera estructuras de proyectos a partir de archivos de plano (tree-like).
  Perfecto para crear múltiples proyectos de forma consistente.

${COLORS.BRIGHT}SINTAXIS${COLORS.RESET}
  node index.js [OPCIONES] <archivo-plano> [nombre-proyecto]

${COLORS.BRIGHT}ARGUMENTOS${COLORS.RESET}
  <archivo-plano>     Ruta al archivo de plano (requerido)
  [nombre-proyecto]   Nombre del proyecto a crear (opcional)
                      Si no se especifica, se usa el de la primera línea del plano

${COLORS.BRIGHT}OPCIONES${COLORS.RESET}
  -h, --help          Muestra esta pantalla de ayuda
  -v, --version       Muestra la versión

${COLORS.BRIGHT}EJEMPLOS${COLORS.RESET}
  # Crear proyecto con nombre del plano
  node index.js plano.txt

  # Crear proyecto con nombre personalizado
  node index.js examples/ejemplo-web.txt mi-aplicacion

  # Usar ruta absoluta
  node index.js /ruta/absoluta/plano.txt

  # Mostrar versión
  node index.js --version

${COLORS.BRIGHT}ARCHIVO DE PLANO${COLORS.RESET}
  El archivo de plano es un archivo de texto que describe la estructura
  del proyecto usando el formato tree-like ASCII.

  Ejemplo:
    mi-proyecto/
    ├── 📁 src/
    │   └── 📄 main.js
    ├── 📁 public/
    │   └── 📄 index.html
    └── 📄 package.json

  Símbolos:
    📁  = Carpeta/Directorio
    📄  = Archivo

${COLORS.BRIGHT}CÓDIGOS DE SALIDA${COLORS.RESET}
  0   = Éxito
  1   = Error general
  2   = Argumentos inválidos
  3   = Archivo no encontrado
  4   = Permiso denegado

${COLORS.BRIGHT}DOCUMENTACIÓN${COLORS.RESET}
  Para más información, consulta:
  - README.md en la raíz del proyecto
  - docs/GUIA_COMPLETA.md para guía detallada
  - https://github.com/Diego-20000/arquitecto-proyectos

${COLORS.BRIGHT}VARIABLES DE ENTORNO${COLORS.RESET}
  DEBUG=true          Muestra información de depuración
                      Ejemplo: DEBUG=true node index.js archivo.txt

`);
}

/**
 * Ejecutar la aplicación solo si este es el módulo principal
 * (No ejecuta si es importado como módulo)
 */
if (require.main === module) {
  main();
}

module.exports = { main, parseArguments, showHelp };
