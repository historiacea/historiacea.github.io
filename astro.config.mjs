import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightImageZoom from 'starlight-image-zoom';

export default defineConfig({
  site: 'https://historiacea.github.io',
  integrations: [
    starlight({
      title: 'Historia de Cea, León',
      description: 'Un viaje fascinante a través de los siglos por la historia del pueblo de Cea, desde sus orígenes geológicos hasta nuestros días',
      defaultLocale: 'es',
      locales: {
        es: {
          label: 'Español',
        },
      },
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'keywords',
            content: 'Cea, León, historia, pueblo, origen, actualidad, Castilla y León, medieval, geología, patrimonio'
          }
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: '/cea.svg'
          }
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:image',
            content: '/cea.svg'
          }
        },
        {
          tag: 'link',
          attrs: {
            rel: 'canonical',
            href: 'https://historiacea.github.io'
          }
        }
      ],
      social: {
        github: 'https://github.com/historiacea/historiacea.github.io'
      },
      sidebar: [
        { 
          label: 'Inicio', 
          link: '/', 
          attrs: { 
            class: 'sidebar-home-link'
          }
        },
        { 
          label: 'Índice completo', 
          link: '/indice/', 
          attrs: { 
            class: 'sidebar-index-link'
          }
        },
        {
          label: 'Historia de Cea',
          autogenerate: { directory: '' },
          collapsed: false,
          items: [
            { 
              label: '🌍 Capítulo 1: Orígenes Geológicos', 
              link: '/capitulo-1/',
              attrs: {
                class: 'chapter-link chapter-1'
              }
            },
            { 
              label: '🏰 Capítulo 2: Época Medieval', 
              link: '/capitulo-2/',
              attrs: {
                class: 'chapter-link chapter-2'
              }
            },
            { 
              label: '🌾 Capítulo 3: Edad Moderna', 
              link: '/capitulo-3/',
              attrs: {
                class: 'chapter-link chapter-3'
              }
            },
          ],
        },
      ],
      components: {
        Header: './src/components/Header.astro',
      },
      plugins: [starlightImageZoom()],
      customCss: [
        './src/styles/custom.css',
      ],
      favicon: '/favicon.svg',
    })
  ],
});
