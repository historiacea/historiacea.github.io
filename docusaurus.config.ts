import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkFotoSlider from './src/plugins/remark-foto-slider';

// Email de contacto/colaboración. Cambiarlo aquí lo actualiza en todo el
// sitio (componente <Colaborar/>, footer, páginas legales...).
const CONTACT_EMAIL = 'daevacp@gmail.com';

const config: Config = {
  title: 'Historia de Cea, León',
  tagline: 'Un viaje fascinante a través de los siglos por la historia del pueblo de Cea',
  favicon: 'img/favicon.png',

  url: 'https://historiacea.github.io',
  baseUrl: '/',

  organizationName: 'historiacea',
  projectName: 'historiacea.github.io',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  customFields: {
    contactEmail: CONTACT_EMAIL,
  },

  // Datos estructurados (JSON-LD) para buscadores: el sitio y el monumento.
  headTags: [
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Historia de Cea',
        alternateName: 'La historia de Cea, León',
        url: 'https://historiacea.github.io/',
        description:
          'La historia completa del pueblo de Cea (León): de los vacceos al siglo XXI, su castillo único en España, su puente, la Nodicia de Kesos y la memoria de sus gentes.',
        inLanguage: 'es',
      }),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Historia de Cea',
        url: 'https://historiacea.github.io/',
        logo: 'https://historiacea.github.io/img/logo-icono.png',
        email: CONTACT_EMAIL,
        nonprofitStatus: 'Nonprofit',
      }),
    },
  ],

  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
      rel: 'stylesheet',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/historiacea/historiacea.github.io/tree/main/',
          // Agrupa imágenes consecutivas de los capítulos en un slider.
          // Debe correr ANTES de los plugins internos de Docusaurus, que
          // transforman los nodos `image` de markdown en JSX.
          beforeDefaultRemarkPlugins: [remarkFotoSlider],
        },
        // La cronología dejó de ser un blog: ahora es la página interactiva
        // /cronologia. Desactivamos el blog por completo.
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // /blog (antigua cronología) redirige a la nueva página interactiva.
  // Usamos createRedirects (no valida el destino, que es una página React).
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath: string) {
          if (existingPath === '/cronologia') {
            return ['/blog', '/blog/cronologia-interactiva'];
          }
          // /docs/historia/parte-X redirige desde /docs/historia/parte-X/portada
          if (/\/docs\/historia\/parte-\d+$/.test(existingPath)) {
            return [`${existingPath}/portada`];
          }
          return undefined;
        },
      },
    ],
  ],

  themeConfig: {
    // Tarjeta social por defecto (1200x630) para Open Graph / Twitter.
    image: 'img/social-card.jpg',
    metadata: [
      { name: 'keywords', content: 'Cea, León, historia de Cea, castillo de Cea, Tierra de Campos, vacceos, Nodicia de Kesos, puente de Cea, Sahagún, patrimonio, Lista Roja' },
      { name: 'author', content: 'Historia de Cea' },
      { name: 'theme-color', content: '#9a3b3f' },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'es_ES' },
      { property: 'og:site_name', content: 'Historia de Cea' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    navbar: {
      logo: {
        alt: 'La historia de Cea',
        src: 'img/logo-historia-cea.png',
      },
      items: [
        {
          type: 'dropdown',
          position: 'right',
          label: 'Historia',
          items: [
            { to: '/docs/historia/intro', label: 'Introducción' },
            { to: '/docs/historia/parte-1', label: 'I · La tierra antes del tiempo' },
            { to: '/docs/historia/parte-2', label: 'II · Cea en tiempos de Roma' },
            { to: '/docs/historia/parte-3', label: 'III · Alta Edad Media' },
            { to: '/docs/historia/parte-4', label: 'IV · Señorío y monasterios' },
            { to: '/docs/historia/parte-5', label: 'V · Conflictos y decadencia' },
            { to: '/docs/historia/parte-6', label: 'VI · Ilustración y reformas' },
            { to: '/docs/historia/parte-7', label: 'VII · El siglo XX' },
            { to: '/docs/historia/parte-8', label: 'VIII · Cea en el siglo XXI' },
          ],
        },
        {
          type: 'dropdown',
          position: 'right',
          label: 'Castillo',
          items: [
            { to: '/docs/castillo', label: 'El castillo de un vistazo' },
            { to: '/docs/castillo/fotos', label: 'Fotos' },
          ],
        },
        {
          to: '/cronologia',
          position: 'right',
          label: 'Cronología',
        },
        {
          to: '/recuerdos',
          position: 'right',
          label: 'Recuerdos',
        },
      ],
    },
    algolia: {
      appId: 'F88R859OJR',
      apiKey: '22f0b5450c4889e63067de9dba5c90a6',
      indexName: 'historiacea',
      
      // Configuraciones opcionales
      contextualSearch: false,
      searchPagePath: 'search',
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Navegación',
          items: [
            {
              label: 'Inicio',
              to: '/',
            },
            {
              label: 'Historia',
              to: '/docs/historia/intro',
            },
            {
              label: 'Castillo',
              to: '/docs/castillo',
            },
            {
              label: 'Cronología',
              to: '/cronologia',
            },
          ],
        },
        {
          title: 'Participa',
          items: [
            {
              label: 'Recuerdos del pueblo',
              to: '/recuerdos',
            },
            {
              label: 'Colabora · envía fotos o documentos',
              to: '/colabora',
            },
          ],
        },
        {
          title: 'Información Legal',
          items: [
            {
              label: 'Aviso Legal',
              to: '/docs/aviso-legal',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/historiacea/historiacea.github.io',
            },
          ],
        },
      ],
      logo: {
        alt: 'La historia de Cea — Cejam civitatem mirificam',
        src: 'img/logo-historia-cea.png',
        href: '/',
        width: 280,
      },
      copyright: `© ${new Date().getFullYear()} Historia de Cea. Proyecto sin ánimo de lucro dedicado a preservar la memoria histórica.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;