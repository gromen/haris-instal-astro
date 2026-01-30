import { defineConfig } from 'astro/config';
import tailwindcss from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://haris-instal.pl',
  output: 'server',
  adapter: netlify(),
  integrations: [tailwindcss()],
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl'],
  },
});
