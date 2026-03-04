/**
 * @fileoverview Builder para la creación de estructura de proyectos
 * @version 1.0.0
 * Construye la estructura del proyecto físicamente en el disco duro
 */

const fs = require("fs");
const path = require("path");
const { MESSAGES } = require("../lib/constants");

/**
 * Crea la estructura completa del proyecto en el sistema de archivos
 * Como punto de entrada principal para la construcción del proyecto
 * @param {Object} structure - Estructura parsada del proyecto
 * @param {string} basePath - Ruta base donde se creará el proyecto
 * @param {string} projectName - Nombre del proyecto a crear
 * @returns {{success: boolean, message: string, itemsCreated: number}}
 * @throws {Error} Si basePath no existe o no es válido
 * @throws {Error} Si no hay permisos de escritura
 * @throws {Error} Si la ruta es insegura (path traversal attempt)
 * @example
 * const result = buildStructure(
 *   parsedStructure,
 *   process.cwd(),
 *   "mi-proyecto"
 * );
 * if (result.success) {
 *   console.log(`Creados ${result.itemsCreated} elementos`);
 * }
 */
function buildStructure(structure, basePath, projectName) {
  if (!structure || typeof structure !== "object") {
    throw new Error("La estructura debe ser un objeto válido");
  }

  if (!basePath || typeof basePath !== "string") {
    throw new Error("basePath debe ser una ruta válida");
  }

  if (!projectName || typeof projectName !== "string") {
    throw new Error("projectName debe ser un nombre válido");
  }

  // Validar que basePath existe
  if (!fs.existsSync(basePath)) {
    throw new Error(`La ruta base no existe: ${basePath}`);
  }

  // Validar seguridad de la ruta (prevenir path traversal)
  if (!validatePath(basePath, projectName)) {
    throw new Error(
      "Intento de acceso no autorizado. Verificar ruta del proyecto"
    );
  }

  const projectPath = path.resolve(path.join(basePath, projectName));
  let itemsCreated = 0;

  try {
    // Verificar permisos de escritura
    fs.accessSync(basePath, fs.constants.W_OK);

    // Crear directorio raíz del proyecto
    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
      itemsCreated++;
    }

    // Iterar y crear estructura
    itemsCreated += iterateStructure(structure, projectPath);

    return {
      success: true,
      message: `Estructura creada exitosamente en ${projectPath}`,
      itemsCreated,
      path: projectPath,
    };
  } catch (error) {
    if (error.code === "EACCES") {
      throw new Error(
        `Permiso denegado: No hay permisos de escritura en ${basePath}`
      );
    }
    if (error.code === "ENOENT") {
      throw new Error(`Ruta no encontrada: ${basePath}`);
    }
    throw new Error(`Error creando estructura: ${error.message}`);
  }
}

/**
 * Itera recursivamente sobre la estructura del proyecto
 * Crea archivos y carpetas según el tipo definido
 * @param {Object} obj - Objeto de estructura a iterar (puede ser anidado)
 * @param {string} currentPath - Ruta actual donde se crearán los elementos
 * @returns {number} Cantidad total de elementos creados
 * @throws {Error} Si hay error creando archivo o directorio
 * @example
 * const count = iterateStructure(structure, "/ruta/proyecto");
 * console.log(`Se crearon ${count} elementos`);
 */
function iterateStructure(obj, currentPath) {
  if (!obj || typeof obj !== "object") {
    return 0;
  }

  let totalCreated = 0;
  const keys = Object.keys(obj);

  keys.forEach((key) => {
    try {
      const item = obj[key];
      const itemPath = path.resolve(path.join(currentPath, key));

      // Validar que la ruta NO sale fuera del directorio permitido
      if (!itemPath.startsWith(path.resolve(currentPath))) {
        throw new Error(`Path traversal detectado: ${itemPath}`);
      }

      if (item && item.type === "folder") {
        // Crear carpeta
        if (!fs.existsSync(itemPath)) {
          fs.mkdirSync(itemPath, { recursive: true });
          totalCreated++;
        }
      } else if (item && item.type === "file") {
        // Crear archivo vacío
        if (!fs.existsSync(itemPath)) {
          fs.writeFileSync(itemPath, "", { encoding: "utf8" });
          totalCreated++;
        }
      } else if (typeof item === "object") {
        // Es un objeto anidado - crear como carpeta y recursionar
        if (!fs.existsSync(itemPath)) {
          fs.mkdirSync(itemPath, { recursive: true });
          totalCreated++;
        }
        // Recursión para subestructuras
        totalCreated += iterateStructure(item, itemPath);
      }
    } catch (error) {
      throw new Error(
        `Error procesando elemento '${key}': ${error.message}`
      );
    }
  });

  return totalCreated;
}

/**
 * Valida que una ruta es segura y no intenta path traversal
 * Verifica que el proyecto se creará dentro de basePath
 * @param {string} basePath - Ruta base (debe existir)
 * @param {string} projectName - Nombre del proyecto
 * @returns {boolean} True si la ruta es segura, False en caso contrario
 * @throws {Error} Si los parámetros no son válidos
 * @example
 * const isValid = validatePath(process.cwd(), "mi-proyecto");
 * if (!isValid) {
 *   throw new Error("Ruta inválida");
 * }
 */
function validatePath(basePath, projectName) {
  if (!basePath || typeof basePath !== "string") {
    throw new Error("basePath debe ser una cadena válida");
  }

  if (!projectName || typeof projectName !== "string") {
    throw new Error("projectName debe ser una cadena válida");
  }

  try {
    // Resolver rutas absolutas
    const resolvedBase = path.resolve(basePath);
    const projectPath = path.resolve(path.join(resolvedBase, projectName));

    // Verificar que la ruta del proyecto está dentro de basePath
    // Usar path.sep para normalizar separadores del SO
    const isValid = projectPath.startsWith(resolvedBase + path.sep) ||
                    projectPath === resolvedBase;

    return isValid;
  } catch (error) {
    return false;
  }
}

/**
 * Verifica si un directorio ya existe y contiene archivos
 * @param {string} directoryPath - Ruta del directorio a verificar
 * @returns {boolean} True si el directorio existe y no está vacío
 * @example
 * if (directoryExists("/ruta/proyecto")) {
 *   console.log("El proyecto ya existe");
 * }
 */
function directoryExists(directoryPath) {
  try {
    if (!fs.existsSync(directoryPath)) {
      return false;
    }

    const stats = fs.statSync(directoryPath);
    if (!stats.isDirectory()) {
      return false;
    }

    // Opcional: verificar si está vacío
    const files = fs.readdirSync(directoryPath);
    return files.length > 0;
  } catch (error) {
    return false;
  }
}

/**
 * Obtiene estadísticas de la creación del proyecto
 * @param {string} projectPath - Ruta del proyecto creado
 * @returns {Object} Objeto con estadísticas {files: number, folders: number, total: number}
 * @example
 * const stats = getProjectStats("/ruta/proyecto");
 * console.log(`Total de elementos: ${stats.total}`);
 */
function getProjectStats(projectPath) {
  if (!fs.existsSync(projectPath)) {
    return { files: 0, folders: 0, total: 0 };
  }

  let fileCount = 0;
  let folderCount = 0;

  const countRecursive = (dirPath) => {
    try {
      const items = fs.readdirSync(dirPath);
      items.forEach((item) => {
        const fullPath = path.join(dirPath, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
          folderCount++;
          countRecursive(fullPath);
        } else {
          fileCount++;
        }
      });
    } catch (error) {
      // Ignorar errores de lectura de permisos
    }
  };

  countRecursive(projectPath);

  return {
    files: fileCount,
    folders: folderCount,
    total: fileCount + folderCount,
  };
}

module.exports = {
  buildStructure,
  iterateStructure,
  validatePath,
  directoryExists,
  getProjectStats,
};
