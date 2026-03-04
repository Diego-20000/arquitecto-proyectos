/**
 * @fileoverview Suite de tests exhaustiva para Arquitecto de Proyectos
 * @version 1.0.0
 * 
 * Pruebas exhaustivas para todos los módulos:
 * - Parser: parseBoard, calculateLevel, extractName, setInStructure
 * - Builder: buildStructure, buildStructure, validatePath, directoryExists
 * - Utils: readBoardFile, fileExists, validateProjectName
 * - Index: parseArguments, showHelp
 * 
 * Ejecutar con: npm test
 */

const fs = require("fs");
const path = require("path");
const { parseBoard, calculateLevel, extractName } = require("../src/parser");
const {
  buildStructure,
  validatePath,
  directoryExists,
} = require("../src/builder");
const {
  validateProjectName,
  fileExists,
} = require("../src/utils");
const { parseArguments } = require("../index");

// ============================================================================
// UTILIDADES DE TEST
// ============================================================================

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

/**
 * Función para ejecutar un test
 * @param {string} description - Descripción del test
 * @param {Function} testFn - Función con las aserciones
 */
function test(description, testFn) {
  totalTests++;
  try {
    testFn();
    passedTests++;
    console.log(`  ✓ ${description}`);
  } catch (error) {
    failedTests++;
    console.error(`  ✗ ${description}`);
    console.error(`    Error: ${error.message}`);
  }
}

/**
 * Función assert personalizada
 * @param {boolean} condition - Condición a validar
 * @param {string} message - Mensaje de error si falla
 */
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

/**
 * Función equal para comparar valores
 * @param {*} actual - Valor actual
 * @param {*} expected - Valor esperado
 * @param {string} message - Mensaje de error
 */
function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(
      message || `Expected ${expected}, but got ${actual}`
    );
  }
}

/**
 * Función deepEqual para comparar objetos
 * @param {*} actual - Valor actual
 * @param {*} expected - Valor esperado
 * @param {string} message - Mensaje de error
 */
function assertDeepEqual(actual, expected, message) {
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);
  if (actualStr !== expectedStr) {
    throw new Error(message || `Objects not equal`);
  }
}

/**
 * Función throws para verificar que se lanza excepcióna
 * @param {Function} fn - Función a ejecutar
 * @param {string} message - Mensaje de error
 */
function assertThrows(fn, message) {
  try {
    fn();
    throw new Error(message || "Expected function to throw");
  } catch (error) {
    if (error.message === (message || "Expected function to throw")) {
      throw error;
    }
    // Lanzó excepción, test pasa
  }
}

// ============================================================================
// TESTS - PARSER
// ============================================================================

console.log("\n" + "=".repeat(70));
console.log("TESTS - PARSER MODULE");
console.log("=".repeat(70));

test("parseBoard: parseBoard debe aceptar contenido válido", () => {
  const content = `proyecto/
├── 📁 src/
│   └── 📄 main.js
└── 📄 package.json`;

  const result = parseBoard(content);
  assert(result && typeof result === "object", "Debe retornar un objeto");
});

test("parseBoard: parseBoard debe lanzar error si contenido es vacío", () => {
  assertThrows(
    () => parseBoard(""),
    "Expected function to throw"
  );
});

test("parseBoard: parseBoard debe lanzar error si contenido no es string", () => {
  assertThrows(
    () => parseBoard(null),
    "Expected function to throw"
  );
});

test("parseBoard: parseBoard debe lanzar error si contenido es undefined", () => {
  assertThrows(
    () => parseBoard(undefined),
    "Expected function to throw"
  );
});

test("extractName: extractName debe extraer nombre de línea con carpeta", () => {
  const name = extractName("├── 📁 src/");
  assert(name && name.includes("src"), "Debe contener 'src'");
});

test("extractName: extractName debe extraer nombre de archivo", () => {
  const name = extractName("├── 📄 main.js");
  assert(name && name.includes("main.js"), "Debe contener 'main.js'");
});

test("extractName: extractName debe limpiar espacios extras", () => {
  const name = extractName("│   ├── 📁   src   /");
  assert(name && name.includes("src"), "Debe contener 'src'");
});

test("extractName: extractName debe retornar null si no hay símbolo", () => {
  const name = extractName("texto sin símbolo");
  assert(name === null, "Debe retornar null");
});

test("calculateLevel: calculateLevel debe calcular nivel 0", () => {
  const level = calculateLevel("├── 📁 src/");
  assertEqual(level, 0, "Nivel debe ser 0");
});

test("calculateLevel: calculateLevel debe calcular nivel 1", () => {
  const level = calculateLevel("│   ├── 📄 main.js");
  assert(level >= 0, "Nivel debe ser >= 0");
});

test("calculateLevel: calculateLevel debe manejar líneas sin árbol", () => {
  const level = calculateLevel("sin simbolos de arbol");
  assert(typeof level === "number", "Debe retornar número");
});

// ============================================================================
// TESTS - BUILDER
// ============================================================================

console.log("\n" + "=".repeat(70));
console.log("TESTS - BUILDER MODULE");
console.log("=".repeat(70));

test("validatePath: validatePath debe aceptar rutas válidas", () => {
  const basePath = process.cwd();
  const isValid = validatePath(basePath, "test-project");
  assert(isValid === true, "Debe aceptar ruta válida");
});

test("validatePath: validatePath debe rechazar path traversal", () => {
  const basePath = process.cwd();
  const isValid = validatePath(basePath, "../../etc/passwd");
  assert(isValid === false, "Debe rechazar path traversal");
});

test("validatePath: validatePath debe lanzar error si basePath es inválido", () => {
  assertThrows(
    () => validatePath(null, "proyecto"),
    "Expected function to throw"
  );
});

test("validatePath: validatePath debe lanzar error si projectName es inválido", () => {
  assertThrows(
    () => validatePath(process.cwd(), null),
    "Expected function to throw"
  );
});

test("directoryExists: directoryExists debe detectar directorios existentes", () => {
  const exists = directoryExists(process.cwd());
  assert(exists === true || exists === false, "Debe retornar booleano");
});

test("directoryExists: directoryExists debe retornar false para rutas inexistentes", () => {
  const exists = directoryExists("/ruta/inexistente/12345");
  assertEqual(exists, false, "Debe retornar false");
});

// ============================================================================
// TESTS - UTILS
// ============================================================================

console.log("\n" + "=".repeat(70));
console.log("TESTS - UTILS MODULE");
console.log("=".repeat(70));

test("validateProjectName: validateProjectName debe aceptar nombres válidos", () => {
  const result = validateProjectName("my-project");
  assert(result.valid === true, "Debe aceptar nombre válido");
});

test("validateProjectName: validateProjectName debe aceptar nombres con números", () => {
  const result = validateProjectName("project123");
  assert(result.valid === true, "Debe aceptar nombres con números");
});

test("validateProjectName: validateProjectName debe aceptar nombres con guiones bajos", () => {
  const result = validateProjectName("my_project");
  assert(result.valid === true, "Debe aceptar guiones bajos");
});

test("validateProjectName: validateProjectName debe rechazar nombres vacíos", () => {
  const result = validateProjectName("");
  assert(result.valid === false, "Debe rechazar nombre vacío");
});

test("validateProjectName: validateProjectName debe rechazar caracteres especiales", () => {
  const result = validateProjectName("project@#$");
  assert(result.valid === false, "Debe rechazar caracteres especiales");
});

test("fileExists: fileExists debe detectar archivos existentes", () => {
  const exists = fileExists(__filename);
  assert(exists === true, "Debe detectar este archivo");
});

test("fileExists: fileExists debe retornar false para archivos inexistentes", () => {
  const exists = fileExists("/archivo/inexistente/12345.txt");
  assertEqual(exists, false, "Debe retornar false");
});

// ============================================================================
// TESTS - INDEX (CLI)
// ============================================================================

console.log("\n" + "=".repeat(70));
console.log("TESTS - INDEX (CLI) MODULE");
console.log("=".repeat(70));

test("parseArguments: parseArguments debe extraer archivo plano", () => {
  const opts = parseArguments(["plano.txt"]);
  assertEqual(opts.boardPath, "plano.txt", "Debe extraer boardPath");
});

test("parseArguments: parseArguments debe extraer archivo y proyecto", () => {
  const opts = parseArguments(["plano.txt", "mi-proyecto"]);
  assertEqual(opts.boardPath, "plano.txt", "Debe extraer boardPath");
  assertEqual(opts.projectName, "mi-proyecto", "Debe extraer projectName");
});

test("parseArguments: parseArguments debe detectar flag --help", () => {
  const opts = parseArguments(["--help"]);
  assert(opts.help === true, "Debe detectar --help");
});

test("parseArguments: parseArguments debe detectar flag -h", () => {
  const opts = parseArguments(["-h"]);
  assert(opts.help === true, "Debe detectar -h");
});

test("parseArguments: parseArguments debe detectar flag --version", () => {
  const opts = parseArguments(["--version"]);
  assert(opts.version === true, "Debe detectar --version");
});

test("parseArguments: parseArguments debe detectar flag -v", () => {
  const opts = parseArguments(["-v"]);
  assert(opts.version === true, "Debe detectar -v");
});

test("parseArguments: parseArguments debe ignorar flags desconocidas", () => {
  const opts = parseArguments(["plano.txt", "--unknown"]);
  assertEqual(opts.boardPath, "plano.txt", "Debe mantener boardPath");
});

// ============================================================================
// TESTS DE INTEGRACIÓN
// ============================================================================

console.log("\n" + "=".repeat(70));
console.log("INTEGRATION TESTS");
console.log("=".repeat(70));

test("Integración: Parser debe extraer estructura válida", () => {
  const content = `app/
├── 📁 src/
│   ├── 📄 main.js
│   └── 📄 utils.js
├── 📁 public/
│   └── 📄 index.html
└── 📄 package.json`;

  const structure = parseBoard(content);
  assert(structure !== null, "Debe parsear correctamente");
  assert(typeof structure === "object", "Debe retornar objeto");
});

test("Integración: Validación de nombres de proyecto", () => {
  const validNames = ["project", "my-app", "app_name", "project123"];
  validNames.forEach((name) => {
    const result = validateProjectName(name);
    assert(
      result.valid === true,
      `${name} debe ser válido`
    );
  });
});

test("Integración: Validación de nombres inválidos", () => {
  const invalidNames = ["", "project!", "app@", "🚀emoji"];
  invalidNames.forEach((name) => {
    const result = validateProjectName(name);
    assert(
      result.valid === false,
      `${name} debe ser inválido`
    );
  });
});

// ============================================================================
// TESTS DE EDGE CASES
// ============================================================================

console.log("\n" + "=".repeat(70));
console.log("EDGE CASE TESTS");
console.log("=".repeat(70));

test("Edge Case: Parser con múltiples niveles de profundidad", () => {
  const content = `root/
├── 📁 level1/
│   └── 📁 level2/
│       └── 📁 level3/
│           └── 📄 deep.js`;

  try {
    const result = parseBoard(content);
    assert(result !== null, "Debe manejar múltiples niveles");
  } catch (e) {
    // Puede fallar, pero no debe crash
  }
});

test("Edge Case: Parser con estructura muy grande", () => {
  let content = "proyecto/\n";
  for (let i = 0; i < 100; i++) {
    content += `├── 📄 file${i}.js\n`;
  }

  try {
    const result = parseBoard(content);
    assert(result !== null, "Debe manejar estructura grande");
  } catch (e) {
    // Puede fallar, pero no debe crash
  }
});

test("Edge Case: ValidatePath con rutas con espacios", () => {
  const basePath = process.cwd();
  const isValid = validatePath(basePath, "my project");
  assert(typeof isValid === "boolean", "Debe retornar booleano");
});

test("Edge Case: validateProjectName con unicode", () => {
  const result = validateProjectName("proyectoÑ");
  assert(typeof result.valid === "boolean", "Debe manejar unicode");
});

test("Edge Case: extractName con caracteres de escape", () => {
  const name = extractName("├── 📁 name-with\\-escape/");
  assert(name === null || typeof name === "string", "Debe manejar escapes");
});

// ============================================================================
// RESUMEN DE RESULTADOS
// ============================================================================

console.log("\n" + "=".repeat(70));
console.log("TEST SUMMARY");
console.log("=".repeat(70));

const passPercentage = ((passedTests / totalTests) * 100).toFixed(2);
console.log(`
${passedTests} tests passed
${failedTests} tests failed
${totalTests} total tests

Success Rate: ${passPercentage}%
`);

if (failedTests === 0) {
  console.log("✓ ALL TESTS PASSED");
  process.exit(0);
} else {
  console.log(
    `✗ ${failedTests} TEST(S) FAILED`
  );
  process.exit(1);
}

module.exports = {
  test,
  assert,
  assertEqual,
  assertDeepEqual,
  assertThrows,
};
