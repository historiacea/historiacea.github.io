import React from 'react';
import clsx from 'clsx';
import { useNavbarSecondaryMenu } from '@docusaurus/theme-common/internal';
import { ThemeClassNames } from '@docusaurus/theme-common';
import styles from './styles.module.css';

/**
 * Override del layout del menú móvil.
 *
 * El comportamiento por defecto de Docusaurus usa dos paneles deslizantes
 * (navbar ↔ capítulos), lo que hacía difícil encontrar la lista de capítulos
 * en móvil. Aquí los APILAMOS verticalmente: al abrir el menú se ve el navbar
 * (Historia · Castillo · Cronología) y, debajo, todos los capítulos de la
 * sección actual, ocupando la pantalla.
 */
function Panel({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div
      className={clsx(
        ThemeClassNames.layout.navbar.mobileSidebar.panel,
        'navbar-sidebar__item menu',
      )}>
      {children}
    </div>
  );
}

export default function NavbarMobileSidebarLayout({
  header,
  primaryMenu,
  secondaryMenu,
}: {
  header: React.ReactNode;
  primaryMenu: React.ReactNode;
  secondaryMenu: React.ReactNode;
}): JSX.Element {
  const { content: secondaryContent } = useNavbarSecondaryMenu();
  const hasSecondary = secondaryContent != null;

  return (
    <div
      className={clsx(
        ThemeClassNames.layout.navbar.mobileSidebar.container,
        'navbar-sidebar',
      )}>
      {header}
      <div className={clsx('navbar-sidebar__items', styles.stacked)}>
        <Panel>{primaryMenu}</Panel>
        {hasSecondary && (
          <>
            <div className={styles.separador} role="separator" aria-hidden="true">
              En esta sección
            </div>
            <Panel>{secondaryMenu}</Panel>
          </>
        )}
      </div>
    </div>
  );
}
