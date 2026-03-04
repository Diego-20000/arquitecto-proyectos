# 📚 Ejemplos de Plantillas - Arquitecto de Proyectos

Colección de **plantillas profesionales** para diferentes tipos de proyectos web y aplicaciones modernas.

## 🚀 Plantillas Disponibles

### 1. **Next.js Full-Stack** (`ejemplo-nextjs-full-stack.txt`)
**Ideal para:** Aplicaciones web modernas, SaaS, dashboards
- ✅ Next.js 14+ con App Router
- ✅ TypeScript
- ✅ API Routes
- ✅ Autenticación integrada
- ✅ Base de datos con Prisma
- ✅ Testing con Jest
- ✅ Tailwind CSS

**Uso:**
```bash
node index.js ejemplo-nextjs-full-stack.txt
cd mi-app-nextjs && npm install
```

---

### 2. **FastAPI Backend** (`ejemplo-fastapi-backend.txt`)
**Ideal para:** APIs REST modernas, microservicios, backends escalables
- ✅ FastAPI (Python moderno)
- ✅ SQLAlchemy ORM
- ✅ Validación automática
- ✅ Documentación interactiva
- ✅ Autenticación JWT
- ✅ Testing con pytest
- ✅ Docker

**Uso:**
```bash
node index.js ejemplo-fastapi-backend.txt
cd api-backend-fastapi && pip install -r requirements.txt
```

---

### 3. **Vue.js Moderno** (`ejemplo-vuejs-frontend.txt`)
**Ideal para:** Aplicaciones frontend modernas, SPAs, interfaces ricas
- ✅ Vue 3 con Composition API
- ✅ Vite (herramientas rápidas)
- ✅ Pinia para estado global
- ✅ Vue Router
- ✅ Tailwind CSS
- ✅ TypeScript
- ✅ Testing con Vitest

**Uso:**
```bash
node index.js ejemplo-vuejs-frontend.txt
cd app-vuejs-moderno && npm install
```

---

### 4. **Laravel Full-Stack** (`ejemplo-laravel-fullstack.txt`)
**Ideal para:** Aplicaciones web tradicionales, blogs, plataformas CRUD
- ✅ Laravel 11+
- ✅ Blade templates
- ✅ Eloquent ORM
- ✅ API REST
- ✅ Autenticación
- ✅ Testing con PHPUnit
- ✅ PHPStan para análisis estático

**Uso:**
```bash
node index.js ejemplo-laravel-fullstack.txt
cd app-laravel-moderno && composer install
```

---

### 5. **Monorepo con Nx** (`ejemplo-monorepo-nx.txt`)
**Ideal para:** Proyectos grandes, múltiples aplicaciones, equipos escalables
- ✅ Nx Workspace (monorepo management)
- ✅ Múltiples apps: web, api, mobile, admin
- ✅ Librerías compartidas
- ✅ TypeScript
- ✅ CI/CD con GitHub Actions
- ✅ Docker multi-stage

**Uso:**
```bash
node index.js ejemplo-monorepo-nx.txt
cd monorepo-nx-escalable && npm install
npx nx serve web    # Iniciar app web
npx nx serve api    # Iniciar API
```

---

### 6. **Astro Sitio Estático** (`ejemplo-astro-sitio-estatico.txt`)
**Ideal para:** Blogs, documentación, marketing sites, contenido estático rápido
- ✅ Astro (generador estático)
- ✅ Content Collections
- ✅ Markdown/MDX
- ✅ Tailwind CSS
- ✅ Componentes reutilizables
- ✅ SEO optimizado
- ✅ Rendimiento ultra-rápido

**Uso:**
```bash
node index.js ejemplo-astro-sitio-estatico.txt
cd sitio-astro-moderno && npm install
npm run dev
```

---

### 7. **Electron Desktop App** (`ejemplo-electron-desktop.txt`)
**Ideal para:** Aplicaciones de escritorio, editores, herramientas nativas
- ✅ Electron + Vite
- ✅ React/TypeScript frontend
- ✅ IPC (Inter-Process Communication)
- ✅ Electron Builder packaging
- ✅ Auto-updates
- ✅ Hooks nativos

**Uso:**
```bash
node index.js ejemplo-electron-desktop.txt
cd app-desktop-electron && npm install
npm run dev
```

---

## 📊 Comparativa de Plantillas

| Característica      | Next.js | FastAPI | Vue.js | Laravel | Nx | Astro | Electron |
|-------------------|---------|---------|--------|---------|-----|-------|----------|
| **Lenguaje**       | JS/TS   | Python  | JS/TS  | PHP     | JS/TS | JS/TS | JS/TS |
| **Full-Stack**     | ✅      | ❌      | ❌     | ✅      | ✅    | ❌    | ⚠️ |
| **API REST**       | ✅      | ✅      | ❌     | ✅      | ✅    | ⚠️    | ⚠️ |
| **Frontend**       | ✅      | ❌      | ✅     | ✅      | ✅    | ✅    | ✅ |
| **Escalabilidad**  | ⭐⭐⭐   | ⭐⭐⭐   | ⭐⭐    | ⭐⭐     | ⭐⭐⭐⭐  | ⭐    | ⭐⭐ |
| **Curva Aprend.**  | 🟡     | 🟡      | 🟢    | 🟢      | 🔴   | 🟢    | 🔴 |
| **Rendimiento**    | ⭐⭐⭐   | ⭐⭐⭐   | ⭐⭐    | ⭐⭐     | ⭐⭐⭐  | ⭐⭐⭐⭐ | ⭐⭐ |

---

## 🔧 Cómo Usar las Plantillas

### Opción 1: Generar desde archivo de texto
```bash
node index.js <archivo-plantilla>.txt
```

El tool automáticamente:
1. ✅ Lee el archivo `.txt`
2. ✅ Parsea la estructura tree
3. ✅ Crea todos los directorios
4. ✅ Genera los archivos necesarios

### Opción 2: Personalizar una plantilla
```bash
# Copia la plantilla
cp ejemplo-nextjs-full-stack.txt mi-proyecto.txt

# Edita con tu editor favorito
code mi-proyecto.txt

# Genera con cambios personalizados
node index.js mi-proyecto.txt
```

---

## 📋 Estructura de las Plantillas

Todas las plantillas siguen un formato **tree-like** estándar:

```
proyecto-raiz/
├── 📁 carpeta-1/
│   ├── 📁 subcarpeta/
│   │   └── 📄 archivo.ext
│   └── 📄 archivo.ext
└── 📄 archivo-raiz.ext
```

**Símbolos utilizados:**
- 🎯 `📁` = Directorio/Carpeta
- 📄 = Archivo
- ├── = Rama (línea vertical)
- └── = Última rama (final)
- │ = Continuación vertical

---

## 🎯 Recomendaciones por Tipo de Proyecto

### 🌐 **Sitio Web/Blog**
→ **Astro** (rendimiento ultra-rápido) o **Next.js** (con CMS)

### 🚀 **Startup/SaaS**
→ **Next.js** (full-stack moderno) o **Monorepo Nx** (si escalas rápido)

### 🔌 **API/Backend**
→ **FastAPI** (Python moderno) o **Nx Monorepo** (JavaScript)

### 💻 **Aplicación Desktop**
→ **Electron** (multiplataforma) o **Tauri** (lightweight)

### 🏢 **Aplicación Empresarial**
→ **Monorepo Nx** (escalabilidad) o **Laravel** (robustez)

### 📱 **Full-Stack Moderno**
→ **Next.js** (todo en uno) o **Monorepo Nx** (múltiples apps)

---

## 🚀 Quick Start

```bash
# 1. Generar proyecto desde plantilla
node index.js ejemplo-nextjs-full-stack.txt

# 2. Entrar en el directorio
cd mi-app-nextjs

# 3. Instalar dependencias
npm install

# 4. Iniciar desarrollo
npm run dev

# 5. ¡Listo! 🎉
```

---

## 📚 Recursos Adicionales

- **[README Principal](/README.md)** - Información general
- **[Guía Completa](/docs/GUIA_COMPLETA.md)** - Ejemplos detallados
- **[Estructura del Proyecto](/STRUCTURE.md)** - Organización interna
- **[Contribuir](/CONTRIBUTING.md)** - Agregar tus propias plantillas

---

## 💡 Crear tu Propia Plantilla

¿Quieres crear una plantilla propia? Es muy simple:

1. Copia una plantilla existente
2. Adapta la estructura a tu necesidad
3. Guarda como `ejemplo-mi-plantilla.txt`
4. ¡Úsala cuando quieras!

---

**¿Tienes sugerencias?** Abre un issue en [GitHub](https://github.com/Diego-20000/arquitecto-proyectos)

---

**Última actualización:** 4 de marzo de 2026
**Versión:** 1.1.0 (Plantillas incluidas)
