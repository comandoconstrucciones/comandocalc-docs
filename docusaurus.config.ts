import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ComandoCalc',
  tagline: 'Cálculo estructural de acero para ingenieros colombianos',
  favicon: '/img/favicon.ico',
  url: 'https://docs.comandoconstrucciones.com',
  baseUrl: '/',
  organizationName: 'comandoconstrucciones',
  projectName: 'comandocalc-docs',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: { defaultLocale: 'es', locales: ['es'] },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/comandoconstrucciones/comandocalc-docs/edit/main/',
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'ComandoCalc',
      logo: {
        alt: 'ComandoCalc Logo',
        src: 'img/logo.png',
        style: { height: '32px', width: 'auto' },
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentación',
          docsPluginId: 'default',
        },
        {
          href: 'https://calculadora.comandoconstrucciones.com',
          label: 'Ir a la App',
          position: 'right',
        },

      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentación',
          items: [
            { label: 'Introducción', to: '/docs/intro' },
            { label: 'Guía de inicio', to: '/docs/inicio-rapido' },
            { label: 'Módulos', to: '/docs/modulos/viga' },
          ],
        },
        {
          title: 'API',
          items: [
            { label: 'Referencia completa', to: '/docs/api/referencia' },
            { label: 'Autenticación', to: '/docs/api/autenticacion' },
            { label: 'Swagger UI', href: 'https://api.comandoconstrucciones.com/docs' },
          ],
        },
        {
          title: 'Comando Construcciones',
          items: [
            { label: 'Sitio web', href: 'https://www.comandoconstrucciones.com' },
            { label: 'App de cálculo', href: 'https://calculadora.comandoconstrucciones.com' },
            { label: 'GitHub', href: 'https://github.com/comandoconstrucciones' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Comando Construcciones S.A.S. — Bogotá, Colombia`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'python', 'typescript'],
    },
    algolia: undefined,
  } satisfies Preset.ThemeConfig,
};

export default config;
