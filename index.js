#!/usr/bin/env node

/**
 * Arquitecto de Proyectos - v0.1.0
 * Herramienta para generar estructuras de proyectos a partir de un archivo de texto plano.
 */

const fs = require("fs");
const path = require("path");
const { parseBoard } = require("./src/parser");
const { buildStructure } = require("./src/builder");
const { readBoardFile, fileExists, printSuccess, printError, printInfo, getAbsolutePath } = require("./src/utils");
const { COLORS, MESSAGES } = require("./lib/constants");

// Configuración
const VERSION = "0.1.0";
const ARGS = process.argv.slice(2);

/**
 * Función principal
 */
function main() {
  console.log("\n");
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║         ¡Bienvenido al Arquitecto de Proyectos!          ║");
  console.log("║                    v" + VERSION + "                               ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  // Procesar argumentos
  if (ARGS.length === 0 || ARGS[0] === "--help" || ARGS[0] === "-h") {
    showHelp();
    process.exit(0);
  }

  if (ARGS[0] === "--version" || ARGS[0] === "-v") {
    console.log(`v${VERSION}`);
    process.exit(0);
  }

  const boardPath = getAbsolutePath(ARGS[0]);

  // Validar que el archivo exista
  if (!fileExists(boardPath)) {
    printError(MESSAGES.ERROR_FILE_NOT_FOUND);
    console.log(`Ruta: ${boardPath}`);
    process.exit(1);
  }

  try {
    // Leer el archivo de plano
    printInfo(MESSAGES.PARSING);
    const boardContent = readBoardFile(boardPath);

    // Parsear la estructura
    const structure = parseBoard(boardContent);

    // Extraer el nombre del proyecto (primera línea)
    const projectName = boardContent.split("\n")[0].replace("/", "").trim();

    if (!projectName) {
      printError("El plano debe tener un nombre de proyecto en la primera línea.");
      process.exit(1);
    }

    // Construir la estructura
    printInfo(MESSAGES.BUILDING);
    const basePath = process.cwd();
    buildStructure(structure, basePath, projectName);

    // Mensaje de éxito
    printSuccess(MESSAGES.SUCCESS_CREATED);
    console.log(`\n📁 Proyecto creado en: ${path.join(basePath, projectName)}`);
    console.log(`\n¡Para empezar: cd ${projectName}\n`);
  } catch (error) {
    printError(error.message);
    process.exit(1);
  }
}

/**
 * Muestra la pantalla de ayuda
 */
function showHelp() {
  console.log(`
${COLORS.BRIGHT}Uso:${COLORS.RESET}
  node index.js [opciones] <archivo-plano>

${COLORS.BRIGHT}Argumentos:${COLORS.RESET}
  <archivo-plano>    Ruta al archivo de plano (obligatorio)

${COLORS.BRIGHT}Opciones:${COLORS.RESET}
  -h, --help        Muestra esta ayuda
  -v, --version     Muestra la versión

${COLORS.BRIGHT}Ejemplos:${COLORS.RESET}
  node index.js plano.txt
  node index.js examples/ejemplo-web.txt
  node index.js /ruta/absoluta/plano.txt

${COLORS.BRIGHT}Más información:${COLORS.RESET}
  Lee la documentación en docs/GUIA_COMPLETA.md
`);
}

// Ejecutar la aplicación
if (require.main === module) {
  main();
}

module.exports = { main };
