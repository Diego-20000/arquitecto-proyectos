/**
 * Tests para el módulo parser
 * Ejecutar con: npm test -- tests/parser.test.js
 */

const { parseBoard, extractName, calculateLevel } = require("../src/parser");

// Tests para la función parseBoard
console.log("Test: parse board");

// Tests para la función extractName
console.log("Test: extract name");
const testLine = "├── 📁 src/";
const result = extractName(testLine);
console.log(`Resultado: ${result}`);
console.assert(result === "src", "Debería extraer 'src'");

// Tests para la función calculateLevel
console.log("Test: calculate level");
const testLine2 = "│   ├── 📄 file.js";
const level = calculateLevel(testLine2);
console.log(`Nivel: ${level}`);

console.log("\n✓ Todos los tests completados");
