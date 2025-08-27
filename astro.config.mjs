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
          label: '📜 Cronología', 
          link: '/cronologia/', 
          attrs: { 
            class: 'sidebar-timeline-link'
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
          label: '📘 PARTE I: La tierra antes del tiempo',
          collapsed: true,
          items: [
            { label: 'Capítulo 1: El territorio antes del tiempo', link: '/parte-1-capitulo-1/' },
            { label: 'Capítulo 2: Primeras huellas humanas', link: '/parte-1-capitulo-2/' },
            { label: 'Capítulo 3: Vacceos y astures', link: '/parte-1-capitulo-3/' },
            { label: 'Capítulo 4: Cea entre castros', link: '/parte-1-capitulo-4/' },
            { label: 'Capítulo 5: Los vacceos (Contexto)', link: '/parte-1-capitulo-5/' },
          ],
        },
        {
          label: '📘 PARTE II: Cea en tiempos de Roma',
          collapsed: true,
          items: [
            { label: 'Capítulo 6: La vía romana', link: '/parte-2-capitulo-6/' },
            { label: 'Capítulo 7: Villas, termas, puentes', link: '/parte-2-capitulo-7/' },
            { label: 'Capítulo 8: El puente de Cea', link: '/parte-2-capitulo-8/' },
            { label: 'Capítulo 9: Paganismo y cristianismo', link: '/parte-2-capitulo-9/' },
            { label: 'Capítulo 10: León (Contexto)', link: '/parte-2-capitulo-10/' },
          ],
        },
        {
          label: '📘 PARTE III: Alta Edad Media',
          collapsed: true,
          items: [
            { label: 'Capítulo 11: Caída de Roma y llegada visigoda', link: '/parte-3-capitulo-11/' },
            { label: 'Capítulo 12: La invasión musulmana', link: '/parte-3-capitulo-12/' },
            { label: 'Capítulo 13: Alfonso III y la "civitas mirifica"', link: '/parte-3-capitulo-13/' },
            { label: 'Capítulo 14: La Nodicia de Kesos', link: '/parte-3-capitulo-14/' },
          ],
        },
        {
          label: '📘 PARTE IV: Señorío y monasterios',
          collapsed: true,
          items: [
            { label: 'Capítulo 15: Los condes de Cea', link: '/parte-4-capitulo-15/' },
            { label: 'Capítulo 16: El cordón monástico', link: '/parte-4-capitulo-16/' },
            { label: 'Capítulo 17: Judíos en la Parba', link: '/parte-4-capitulo-17/' },
            { label: 'Capítulo 18: La fortaleza primigenia', link: '/parte-4-capitulo-18/' },
          ],
        },
        {
          label: '📘 PARTE V: Conflictos y decadencia',
          collapsed: true,
          items: [
            { label: 'Capítulo 19: Guerras dinásticas', link: '/parte-5-capitulo-19/' },
            { label: 'Capítulo 20: Peste, hambre y el monte vendido', link: '/parte-5-capitulo-20/' },
            { label: 'Capítulo 21: El Ducado de Cea', link: '/parte-5-capitulo-21/' },
            { label: 'Capítulo 22: Religión y vida cotidiana', link: '/parte-5-capitulo-22/' },
            { label: 'Capítulo 23: La nueva torre de Cea', link: '/parte-5-capitulo-23/' },
          ],
        },
        {
          label: '📘 PARTE VI: Ilustración y reformas',
          collapsed: true,
          items: [
            { label: 'Capítulo 24: Feijoo y Jovellanos', link: '/parte-6-capitulo-24/' },
            { label: 'Capítulo 25: Madoz en Cea', link: '/parte-6-capitulo-25/' },
            { label: 'Capítulo 26: Carlistas y liberales', link: '/parte-6-capitulo-26/' },
            { label: 'Capítulo 27: De señorío a ayuntamiento', link: '/parte-6-capitulo-27/' },
          ],
        },
        {
          label: '📘 PARTE VII: El siglo XX',
          collapsed: true,
          items: [
            { label: 'Capítulo 28: Cea en la Guerra Civil', link: '/parte-7-capitulo-28/' },
            { label: 'Capítulo 29: Repoblación de Riocamba', link: '/parte-7-capitulo-29/' },
            { label: 'Capítulo 30: El éxodo rural', link: '/parte-7-capitulo-30/' },
            { label: 'Capítulo 31: Santa María', link: '/parte-7-capitulo-31/' },
          ],
        },
        {
          label: '📘 PARTE VIII: Cea en el siglo XXI',
          collapsed: true,
          items: [
            { label: 'Capítulo 32: Patrimonio y sostenibilidad', link: '/parte-8-capitulo-32/' },
            { label: 'Capítulo 33: Eólica y nuevos habitantes', link: '/parte-8-capitulo-33/' },
            { label: 'Capítulo 34: Tradiciones vivas', link: '/parte-8-capitulo-34/' },
            { label: 'Capítulo 35: Hacia el futuro', link: '/parte-8-capitulo-35/' },
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
