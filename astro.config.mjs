import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://historiacea.github.io',
  integrations: [
    starlight({
      title: 'Historia de Cea, León',
      description: 'Recorrido por la historia del pueblo de Cea desde sus orígenes hasta la actualidad',
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'keywords',
            content: 'Cea, León, historia, pueblo, origen, actualidad, Castilla y León'
          }
        }
      ],
      sidebar: [
        { label: 'Inicio', link: '/' },
        {
          label: 'Capítulos',
          items: [
            { label: 'Capítulo 1', link: '/capitulo-1/' },
            { label: 'Capítulo 2', link: '/capitulo-2/' },
            { label: 'Capítulo 3', link: '/capitulo-3/' },
          ],
        },
      ],
    })
  ],
});
