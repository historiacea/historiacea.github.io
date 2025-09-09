import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Historia de Cea, León',
  tagline: 'Un viaje fascinante a través de los siglos por la historia del pueblo de Cea',
  favicon: 'img/favicon.ico',

  url: 'https://historiacea.github.io',
  baseUrl: '/',

  organizationName: 'historiacea',
  projectName: 'historiacea.github.io',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/historiacea/historiacea.github.io/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/historiacea/historiacea.github.io/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],


  themeConfig: {
    image: 'img/logo.png',
    navbar: {
      logo: {
        alt: 'Historia de Cea',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'historiaSidebar',
          position: 'right',
          label: 'Historia',
        },
        {
          type: 'docSidebar',
          sidebarId: 'castilloSidebar',
          position: 'right',
          label: 'Castillo',
        },
      ],
    },
    algolia: {
      // Reemplaza estos valores con tus credenciales de Algolia
      appId: '3QKHV6ZLE5',
      apiKey: 'e20c08963e89b1bf7e78dc78b4dbf5cf',
      indexName: 'historiacea',
      
      // Configuraciones opcionales
      contextualSearch: true,
      searchPagePath: 'searya tengch',
      
      // Configuraciones adicionales para español
      searchParameters: {
        facetFilters: ['language:es'],
      },
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
              to: '/docs/castillo/torre',
            },
            {
              label: 'Cronología',
              to: '/blog',
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
      copyright: `© ${new Date().getFullYear()} Historia de Cea. Proyecto sin ánimo de lucro dedicado a preservar la memoria histórica.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;