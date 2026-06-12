import clsx from 'clsx';
import { useNavbarSecondaryMenu } from '@docusaurus/theme-common/internal';
import { ThemeClassNames } from '@docusaurus/theme-common';
import styles from './styles.module.css';

/**
 * Layout del menú móvil, reescrito sin el doble panel deslizante de Infima:
 * estructura propia en columna — navbar arriba, separador y, debajo, todos
 * los capítulos de la sección actual. Todo visible y desplazable.
 */
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
        styles.drawer,
      )}>
      {header}
      <div className={styles.cuerpo}>
        <nav className={clsx('menu', styles.seccion)}>{primaryMenu}</nav>
        {hasSecondary && (
          <>
            <div className={styles.separador} role="separator">
              En esta sección
            </div>
            <nav className={clsx('menu', styles.seccion)}>{secondaryMenu}</nav>
          </>
        )}
      </div>
    </div>
  );
}
