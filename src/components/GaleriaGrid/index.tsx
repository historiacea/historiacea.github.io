import { useLightbox } from '@site/src/components/Lightbox/context';
import { fichaDe } from '@site/src/data/fichasFotos';
import styles from './styles.module.css';

/**
 * Galería en rejilla con lightbox. Las imágenes se cargan automáticamente de
 * la carpeta de cada colección (require.context): para añadir fotos basta con
 * copiarlas a la carpeta correspondiente en `static/img/...`.
 */

function urlsDe(ctx: __WebpackModuleApi.RequireContext): string[] {
  return ctx
    .keys()
    .sort()
    .map((k) => {
      const mod = ctx(k) as string | { default: string };
      return typeof mod === 'string' ? mod : mod.default;
    });
}

// @ts-ignore — require.context lo aporta webpack en build
const CTX_CASTILLO = require.context('@site/static/img/castillo/galeria', false, /\.(jpe?g|png)$/i);
// @ts-ignore
const CTX_RECUERDOS = require.context('@site/static/img/recuerdos', false, /\.(jpe?g|png)$/i);
// @ts-ignore
const CTX_PLANTAS = require.context('@site/static/img/castillo/plantas', false, /\.(jpe?g|png)$/i);

export const COLECCIONES: Record<string, string[]> = {
  castillo: urlsDe(CTX_CASTILLO),
  recuerdos: urlsDe(CTX_RECUERDOS),
  plantas: urlsDe(CTX_PLANTAS),
};

type Props = {
  /** Colección a mostrar: "castillo" | "recuerdos" | "plantas". */
  coleccion: keyof typeof COLECCIONES;
  /** Substring que debe aparecer en la URL para filtrar imágenes. */
  filtro?: string;
};

export default function GaleriaGrid({ coleccion, filtro }: Props): JSX.Element {
  const { open } = useLightbox();
  const todas = COLECCIONES[coleccion] ?? [];
  const imgs = filtro ? todas.filter((src) => src.includes(filtro)) : todas;

  if (imgs.length === 0) {
    return (
      <p className={styles.vacio}>
        <em>Aún no hay fotos en esta galería — ¡sé el primero en enviarlas!</em>
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {imgs.map((src, i) => (
        <button
          key={src}
          type="button"
          className={styles.celda}
          aria-label={`Ampliar foto ${i + 1} de ${imgs.length}`}
          onClick={() => open({ src, ficha: fichaDe(src, coleccion) })}>
          <img src={src} alt="" loading="lazy" />
        </button>
      ))}
    </div>
  );
}
