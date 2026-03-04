# Guía Completa - Arquitecto de Proyectos

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Instalación](#instalación)
3. [Formato del Plano](#formato-del-plano)
4. [Ejemplos](#ejemplos)
5. [Comandos](#comandos)
6. [Solución de Problemas](#solución-de-problemas)

## Introducción

**Arquitecto de Proyectos** es una herramienta que automatiza la creación de estructuras de proyectos a partir de un archivo de texto plano. No depende de APIs externas, funciona 100% localmente en tu máquina.

### ¿Por qué usar Arquitecto de Proyectos?

- ✅ Automatiza tareas repetitivas
- ✅ Mantén consistencia en tus proyectos
- ✅ Sin dependencias externas
- ✅ Fácil de usar
- ✅ Rápido y eficiente

## Instalación

### Requisitos Previos

- Node.js v12 o superior
- Un editor de texto (VS Code recomendado)

### Pasos de Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Diego-20000/arquitecto-proyectos.git
cd arquitecto-proyectos
```

2. Instala las dependencias (cuando estén disponibles):
```bash
npm install
```

3. ¡Listo! Ahora puedes usar la herramienta.

## Formato del Plano

El plano es un archivo de texto que describe la estructura de tu proyecto usando símbolos simples.

### Símbolos

- `📁` - Representa una carpeta
- `📄` - Representa un archivo

### Estructura del Árbol

Para crear una jerarquía, usamos los caracteres de árbol estándar:

```
proyecto-raiz/
├── 📁 carpeta1/
│   └── 📄 archivo.txt
├── 📁 carpeta2/
│   ├── 📄 archivo1.js
│   └── 📄 archivo2.js
└── 📄 archivo-raiz.md
```

### Reglas Importantes

1. La primera línea debe ser el nombre de la carpeta raíz (termina con `/`)
2. Usa `├──` para ramas que tienen más hermanos
3. Usa `└──` para la última rama
4. Usa `│` para indicar continuidad vertical
5. Usa espacios o `    ` (4 espacios) para la indentación

## Ejemplos

### Ejemplo 1: Proyecto Web Simple

```
mi-sitio/
├── 📁 css/
│   └── 📄 style.css
├── 📁 js/
│   └── 📄 script.js
└── 📄 index.html
```

### Ejemplo 2: API REST

```
api-backend/
├── 📁 src/
│   ├── 📁 controllers/
│   ├── 📁 models/
│   ├── 📁 routes/
│   └── 📄 app.js
├── 📁 tests/
├── 📄 package.json
└── 📄 server.js
```

## Comandos

### Crear un Proyecto

```bash
node index.js ruta/al/plano.txt
```

**Parámetros:**
- `ruta/al/plano.txt` - Ruta al archivo de plano

**Ejemplo:**
```bash
node index.js examples/ejemplo-web.txt
```

### Ver Ayuda

```bash
node index.js --help
```

### Versión

```bash
node index.js --version
```

## Solución de Problemas

### Error: "El archivo no existe"

**Causa:** La ruta del archivo no es correcta.

**Solución:** Verifica que la ruta sea correcta:
```bash
# Forma absoluta
node index.js C:\ruta\completa\plano.txt

# Forma relativa (desde la carpeta del proyecto)
node index.js examples/ejemplo-web.txt
```

### Error: "Formato de plano inválido"

**Causa:** El archivo de plano tiene un formato incorrecto.

**Solución:** Revisa que:
- Uses los símbolos correctos (📁 y 📄)
- La indentación sea consistente
- Los caracteres de árbol sean válidos (`├──`, `└──`, `│`)

### Proyecto no se crea

**Causa:** Permisos de carpeta insuficientes.

**Solución:** Asegúrate de tener permisos de escritura en la carpeta donde intentas crear el proyecto.

## Contacto y Soporte

Para reportar problemas o sugerir mejoras, visita:
- GitHub Issues: https://github.com/Diego-20000/arquitecto-proyectos/issues
- Email: tu-email@ejemplo.com

---

**Última actualización:** 3 de marzo de 2026
