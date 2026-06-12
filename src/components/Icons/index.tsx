/**
 * Iconos SVG de línea fina para Historia de Cea.
 * Trazo único heredando currentColor; sustituyen a los emojis decorativos.
 */
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 28, strokeWidth = 1.4, ...rest }: IconProps & { strokeWidth?: number }) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    ...rest,
  };
}

/** Libro abierto — sección Historia */
export function IconBook(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 5.5C10.4 4.3 8.2 3.7 5.5 3.7c-1 0-1.8.8-1.8 1.8v11.2c0 1 .8 1.6 1.8 1.6 2.4 0 4.5.6 6 1.7" />
      <path d="M12 5.5c1.6-1.2 3.8-1.8 6.5-1.8 1 0 1.8.8 1.8 1.8v11.2c0 1-.8 1.6-1.8 1.6-2.4 0-4.5.6-6 1.7" />
      <path d="M12 5.5V20" />
    </svg>
  );
}

/** Torre almenada — sección Castillo */
export function IconTower(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 9V6h2v2h2V6h2v2h2V6h2v3" />
      <path d="M6 9h12v3a3 3 0 0 1-1 2.2V20H7v-5.8A3 3 0 0 1 6 12V9Z" />
      <path d="M10.5 20v-3.2a1.5 1.5 0 0 1 3 0V20" />
    </svg>
  );
}

/** Pergamino enrollado — Cronología */
export function IconScroll(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 4h9a2 2 0 0 1 2 2v10" />
      <path d="M18 16a2 2 0 0 0 2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2h3" />
      <path d="M10 8h5M10 11h5" />
    </svg>
  );
}

/** Río serpenteante — paisaje */
export function IconRiver(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 6c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2" />
      <path d="M4 12c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2" />
      <path d="M4 18c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2" />
    </svg>
  );
}

/** Columna clásica — patrimonio */
export function IconColumn(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 6h14" />
      <path d="M6 6v12M10 6v12M14 6v12M18 6v12" />
      <path d="M4 18h16M7 6 12 3l5 3" />
    </svg>
  );
}

/** Espiga de trigo — tradición agrícola */
export function IconWheat(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21V9" />
      <path d="M12 9c0-2 1.5-3 1.5-3S15 7 15 9s-1.5 3-1.5 3S12 11 12 9Z" />
      <path d="M12 13c0-2 1.5-3 1.5-3M12 13c0-2-1.5-3-1.5-3" />
      <path d="M12 17c0-2 1.5-3 1.5-3M12 17c0-2-1.5-3-1.5-3" />
    </svg>
  );
}

/** Conjunto de personas — comunidad */
export function IconPeople(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="9" cy="8" r="2.5" />
      <path d="M4 19c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      <path d="M15.5 6.2A2.5 2.5 0 0 1 17 11" />
      <path d="M16 14.3c2 .7 3.5 2.5 3.5 4.7" />
    </svg>
  );
}

/** Brújula — propósito / recorrido */
export function IconCompass(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </svg>
  );
}
