# Estructura del Proyecto

**Arquitecto de Proyectos** está organizado de la siguiente manera:

```
arquitecto-proyectos/
├── .github/                    # Configuración de GitHub
│   └── ISSUE_TEMPLATE.md      # Plantilla para reportar issues
├── docs/                       # Documentación del proyecto
│   ├── GUIA_COMPLETA.md       # Guía de uso completa
│   └── CONTRIBUTING.md        # Guía de contribución
├── examples/                   # Ejemplos de planos
│   ├── ejemplo-api.txt        # Ejemplo: API REST
│   ├── ejemplo-web.txt        # Ejemplo: Sitio Web
│   └── ejemplo-simple.txt     # Ejemplo: Proyecto Simple
├── lib/                        # Librerías y constantes
│   └── constants.js           # Constantes globales
├── src/                        # Código fuente principal
│   ├── builder.js             # Lógica de construcción
│   ├── parser.js              # Lógica de parseo
│   └── utils.js               # Utilidades generales
├── tests/                      # Pruebas unitarias
│   └── parser.test.js         # Tests del parser
├── .editorconfig              # Configuración del editor
├── .eslintrc.json             # Configuración de ESLint
├── .gitignore                 # Archivos a ignorar en Git
├── .prettierrc                # Configuración de Prettier
├── CHANGELOG.md               # Historial de cambios
├── index.js                   # Punto de entrada principal
├── LICENSE                    # Licencia del proyecto
├── package.json               # Metadatos y dependencias
├── plano-ejemplo.txt          # Ejemplo de plano
├── README.md                  # Documentación principal
├── SECURITY.md                # Política de seguridad
└── STRUCTURE.md               # Este archivo
```

## Descripción de Carpetas

### `.github/`
Contiene archivos de configuración específicos de GitHub, como plantillas para issues y pull requests.

### `docs/`
Documentación completa del proyecto:
- **GUIA_COMPLETA.md**: Manual detallado sobre cómo usar la herramienta
- **CONTRIBUTING.md**: Instrucciones para contribuidores

### `examples/`
Ejemplos de archivos de plano para diferentes tipos de proyectos:
- **ejemplo-api.txt**: Estructura típica de una API REST
- **ejemplo-web.txt**: Estructura típica de un sitio web con React
- **ejemplo-simple.txt**: Estructura simple HTML/CSS/JS

### `lib/`
Librerías reutilizables:
- **constants.js**: Constantes compartidas entre módulos (símbolos, colores, mensajes)

### `src/`
Código fuente principal de la aplicación:
- **builder.js**: Crea el sistema de archivos basado en la estructura parseada
- **parser.js**: Lee y analiza el archivo de plano
- **utils.js**: Funciones auxiliares (lectura de archivos, impresión de mensajes)

### `tests/`
Pruebas unitarias:
- **parser.test.js**: Tests para el módulo de parseo

## Archivos de Configuración

- **.editorconfig**: Estandariza configuraciones del editor para todos los colaboradores
- **.eslintrc.json**: Reglas de linting para JavaScript
- **.gitignore**: Archivos/carpetas que Git debe ignorar
- **.prettierrc**: Configuración de formato de código

## Archivos Principales

- **index.js**: Punto de entrada. Maneja argumentos y coordina todo el flujo
- **package.json**: Metadatos del proyecto y dependencias
- **LICENSE**: Licencia MIT
- **README.md**: Documentación principal del proyecto
- **CHANGELOG.md**: Historial de versiones y cambios
- **SECURITY.md**: Política de seguridad

## Flujo de Ejecución

```
index.js
  ├─ Lee argumentos de línea de comandos
  ├─ utils.readBoardFile() → Lee el archivo de plano
  ├─ parser.parseBoard() → Parsea la estructura
  ├─ builder.buildStructure() → Crea carpetas y archivos
  └─ utils.printSuccess() → Muestra mensaje de éxito
```

## Cómo Agregar Nuevas Características

1. **Agregar un nuevo módulo**: Crea un archivo en `src/` o `lib/`
2. **Escribir tests**: Agrega tests en `tests/`
3. **Documentar**: Actualiza `docs/GUIA_COMPLETA.md`
4. **Hacer commit**: Sigue the commit conventions

---

**Última actualización:** 3 de marzo de 2026
