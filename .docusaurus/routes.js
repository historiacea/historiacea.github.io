import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'fa3'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '182'),
    exact: true
  },
  {
    path: '/blog/authors',
    component: ComponentCreator('/blog/authors', '0b7'),
    exact: true
  },
  {
    path: '/blog/cronologia-interactiva',
    component: ComponentCreator('/blog/cronologia-interactiva', '08e'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '287'),
    exact: true
  },
  {
    path: '/blog/tags/cea',
    component: ComponentCreator('/blog/tags/cea', '520'),
    exact: true
  },
  {
    path: '/blog/tags/cronologia',
    component: ComponentCreator('/blog/tags/cronologia', 'de4'),
    exact: true
  },
  {
    path: '/blog/tags/historia',
    component: ComponentCreator('/blog/tags/historia', '54f'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', '5de'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '643'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'cbc'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'bb4'),
            routes: [
              {
                path: '/docs/aviso-legal',
                component: ComponentCreator('/docs/aviso-legal', 'da4'),
                exact: true,
                sidebar: "historiaSidebar"
              },
              {
                path: '/docs/castillo/torre',
                component: ComponentCreator('/docs/castillo/torre', '9d7'),
                exact: true,
                sidebar: "castilloSidebar"
              },
              {
                path: '/docs/historia/intro',
                component: ComponentCreator('/docs/historia/intro', '823'),
                exact: true,
                sidebar: "historiaSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
