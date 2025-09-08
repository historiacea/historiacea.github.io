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
      title: 'Historia de Cea',
      logo: {
        alt: 'Escudo de Cea',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'historiaSidebar',
          position: 'left',
          label: 'Historia',
        },
        {
          type: 'docSidebar',
          sidebarId: 'castilloSidebar',
          position: 'left',
          label: 'Castillo',
        },
        {to: '/blog', label: 'Cronología', position: 'left'},
        {
          href: 'https://github.com/historiacea/historiacea.github.io',
          label: 'GitHub',
          position: 'right',
        },
      ],
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