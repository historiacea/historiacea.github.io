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
// @ts-ignore — ilustraciones de IA que aparecen en los capítulos de la historia
const CTX_IA = require.context('@site/static/img/ia', false, /\.(jpe?g|png)$/i);

export const COLECCIONES: Record<string, string[]> = {
  castillo: urlsDe(CTX_CASTILLO),
  recuerdos: urlsDe(CTX_RECUERDOS),
  plantas: urlsDe(CTX_PLANTAS),
  ia: urlsDe(CTX_IA),
};

type ItemFijo = { src: string; alt?: string };

type Props = {
  /** Colección a mostrar: "castillo" | "recuerdos" | "plantas" | "ia". */
  coleccion?: keyof typeof COLECCIONES;
  /** Substring que debe aparecer en la URL para filtrar imágenes. */
  filtro?: string;
  /**
   * Lista explícita y ORDENADA de imágenes (con su descripción opcional).
   * Si se pasa, tiene prioridad sobre `coleccion`: se respeta el orden dado
   * y no se cargan carpetas con require.context. Útil para la galería de la
   * historia, donde el orden de aparición importa y se mezclan carpetas.
   */
  items?: ItemFijo[];
};

// En modo lista, la ficha depende de la carpeta: las de /img/ia llevan el
// disclaimer de IA; el resto (p. ej. /img/libro) muestran solo su descripción.
function fichaDeItem(src: string, alt?: string) {
  if (src.includes('/img/ia/')) return fichaDe(src, 'ia');
  return alt ? { desc: alt } : undefined;
}

export default function GaleriaGrid({ coleccion, filtro, items }: Props): JSX.Element {
  const { open } = useLightbox();

  // Modo lista explícita: respeta el orden dado y conserva el alt del capítulo.
  if (items && items.length > 0) {
    const imgList = items.map(({ src, alt }) => ({
      src,
      alt,
      ficha: fichaDeItem(src, alt),
    }));
    return (
      <div className={styles.grid}>
        {imgList.map((item, i) => (
          <button
            key={item.src + i}
            type="button"
            className={styles.celda}
            aria-label={item.alt || `Ampliar foto ${i + 1} de ${imgList.length}`}
            onClick={() => open(item, imgList, i)}>
            <img src={item.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    );
  }

  const todas = coleccion ? COLECCIONES[coleccion] ?? [] : [];
  const imgs = filtro ? todas.filter((src) => src.includes(filtro)) : todas;

  if (imgs.length === 0) {
    return (
      <p className={styles.vacio}>
        <em>Aún no hay fotos en esta galería — ¡sé el primero en enviarlas!</em>
      </p>
    );
  }

  const imgList = imgs.map((src) => ({ src, ficha: fichaDe(src, coleccion!) }));

  return (
    <div className={styles.grid}>
      {imgList.map((item, i) => (
        <button
          key={item.src}
          type="button"
          className={styles.celda}
          aria-label={`Ampliar foto ${i + 1} de ${imgList.length}`}
          onClick={() => open(item, imgList, i)}>
          <img src={item.src} alt="" loading="lazy" />
        </button>
      ))}
    </div>
  );
}
