import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '¿Qué es ComandoCalc?',
    },
    {
      type: 'doc',
      id: 'inicio-rapido',
      label: 'Inicio rápido',
    },
    {
      type: 'doc',
      id: 'unidades',
      label: 'Unidades y normas',
    },
    {
      type: 'category',
      label: 'Módulos de Cálculo',
      collapsed: false,
      items: [
        'modulos/viga',
        'modulos/columna',
        'modulos/correas',
        'modulos/correas-fachada',
        'modulos/viento',
        'modulos/vibraciones',
        'modulos/steeldeck',
        'modulos/placa-base',
        'modulos/cercha',
        'modulos/portico',
        'modulos/flexo-compresion',
        'modulos/columna-compuesta',
        'modulos/conexiones',
        'modulos/presupuesto',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'api/introduccion',
        'api/autenticacion',
        'api/referencia',
        'api/perfiles',
        'api/ciudades',
      ],
    },
    {
      type: 'doc',
      id: 'changelog',
      label: 'Changelog',
    },
  ],
};

export default sidebars;
