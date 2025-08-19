import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Historia de Cea',
      description: 'Relatos y crónicas de Cea, León',
      sidebar: [
        { label: 'Inicio', link: '/' },
        {
          label: 'Capítulos',
          items: [
            { label: 'Capítulo 1', link: '/capitulo-1/' },
            { label: 'Capítulo 2', link: '/capitulo-2/' },
          ],
        },
      ],
    })
  ],
});
