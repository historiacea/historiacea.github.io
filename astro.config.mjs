import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Historia de Cea',
      description: 'Relatos y crónicas de Cea, León',
    })
  ],
});
