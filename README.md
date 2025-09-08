# Historia de Cea - Docusaurus Blog

Un viaje fascinante a través de los siglos por la historia del pueblo de Cea, desde sus orígenes geológicos hasta nuestros días. Ahora desarrollado con **Docusaurus** y **React** para ofrecer una experiencia moderna de blog y documentación.

## 🏰 Características

- **📚 Documentación estructurada**: Historia organizada en secciones y capítulos
- **📜 Blog cronológico**: Timeline interactiva con eventos históricos
- **🏛️ Diseño medieval**: Paleta de colores tierra/marrón inspirada en el logo del castillo
- **📱 Responsive**: Optimizado para dispositivos móviles y desktop
- **🌙 Modo oscuro**: Soporte completo para tema claro y oscuro
- **🔍 Búsqueda**: Funcionalidad de búsqueda integrada
- **⚡ Performance**: Build estático optimizado para GitHub Pages

## 🛠️ Tecnologías

- **[Docusaurus](https://docusaurus.io/)** - Framework de documentación estática
- **React** - Biblioteca de componentes UI
- **TypeScript** - Tipado estático
- **MDX** - Markdown con componentes React
- **GitHub Actions** - CI/CD automático
- **GitHub Pages** - Hosting gratuito

## 🚀 Desarrollo local

### Prerrequisitos

- Node.js ≥ 18.20.8
- npm

### Instalación

```bash
# Instalar dependencias
npm ci

# Iniciar servidor de desarrollo
npm start

# Build para producción
npm run build

# Servir build localmente
npm run serve
```

## 📝 Estructura del proyecto

```
historiacea.github.io/
├── docs/                      # Documentación (Historia y Castillo)
│   ├── historia/
│   │   └── intro.md
│   ├── castillo/
│   │   └── torre.md
│   └── aviso-legal.md
├── blog/                      # Posts del blog (Cronología)
│   ├── authors.yml
│   └── 2025-01-01-cronologia-interactiva.md
├── src/
│   ├── components/            # Componentes React
│   ├── css/
│   │   └── custom.css        # Estilos personalizados
│   └── pages/
│       └── index.tsx         # Página principal
├── static/
│   └── img/
│       └── logo.png          # Logo del castillo
├── docusaurus.config.ts      # Configuración principal
├── sidebars.ts              # Configuración del sidebar
└── .github/workflows/       # GitHub Actions
    └── deploy.yml
```

## 🎨 Personalización

### Colores del tema

El proyecto utiliza una paleta inspirada en el logo medieval:

- **Primario**: `#8B4513` (Saddle Brown)
- **Secundario**: `#A0522D` (Sienna)
- **Texto**: `#5D4037`, `#6D4C41`
- **Fondos**: `#faf5f0`, `#f5ebe0`

### Logo

El logo del castillo se encuentra en `static/img/logo.png` y se usa en:
- Navbar
- Footer
- Favicon
- Metadatos sociales

## 📖 Agregar contenido

### Nueva página de documentación

1. Crear archivo `.md` en `docs/historia/` o `docs/castillo/`
2. Añadir el ID del documento a `sidebars.ts`
3. Usar frontmatter para metadatos

### Nuevo post de blog

1. Crear archivo en `blog/` con formato `YYYY-MM-DD-titulo.md`
2. Usar frontmatter con `slug`, `title`, `authors`, `tags`
3. Añadir `<!-- truncate -->` para excerpt

## 🚀 Deploy

El sitio se despliega automáticamente en GitHub Pages mediante GitHub Actions:

1. Push a la rama `main`
2. GitHub Actions ejecuta el build
3. El sitio se publica en `https://historiacea.github.io`

## 📄 Licencia

Este proyecto es una iniciativa cultural **sin ánimo de lucro** dedicada a preservar la memoria histórica de Cea, León. Todo el contenido se ofrece gratuitamente para fines educativos y culturales.

## 🤝 Contribuir

Si tienes fotografías antiguas, documentos familiares o historias sobre Cea, tu colaboración será muy valiosa. Puedes:

1. Abrir un issue en GitHub
2. Enviar un pull request
3. Contactar a través del repositorio

---

**Historia de Cea** - Preservando la memoria histórica de Cea, León 🏰
