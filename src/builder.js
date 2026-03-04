/**
 * Builder - Construye la estructura físicamente en el disco
 */

const fs = require("fs");
const path = require("path");

/**
 * Crea la estructura de directorios y archivos basada en el objeto parsado
 * @param {Object} structure - Estructura parsada del proyecto
 * @param {string} basePath - Ruta base donde crear
 * @param {string} projectName - Nombre del proyecto
 */
function buildStructure(structure, basePath, projectName) {
  const projectPath = path.join(basePath, projectName);

  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath, { recursive: true });
  }

  iterateStructure(structure, projectPath);
}

/**
 * Itera sobre la estructura y crea archivos y carpetas
 * @param {Object} obj - Objeto a iterar
 * @param {string} currentPath - Ruta actual
 */
function iterateStructure(obj, currentPath) {
  Object.keys(obj).forEach((key) => {
    const item = obj[key];
    const itemPath = path.join(currentPath, key);

    if (item.type === "folder") {
      if (!fs.existsSync(itemPath)) {
        fs.mkdirSync(itemPath, { recursive: true });
      }
    } else if (item.type === "file") {
      if (!fs.existsSync(itemPath)) {
        fs.writeFileSync(itemPath, "");
      }
    } else if (typeof item === "object") {
      if (!fs.existsSync(itemPath)) {
        fs.mkdirSync(itemPath, { recursive: true });
      }
      iterateStructure(item, itemPath);
    }
  });
}

/**
 * Valida que la ruta sea segura
 * @param {string} basePath - Ruta base
 * @param {string} projectName - Nombre del proyecto
 * @returns {boolean} - True si es válido
 */
function validatePath(basePath, projectName) {
  const projectPath = path.resolve(path.join(basePath, projectName));
  const resolvedBase = path.resolve(basePath);

  return projectPath.startsWith(resolvedBase);
}

module.exports = {
  buildStructure,
  iterateStructure,
  validatePath,
};
