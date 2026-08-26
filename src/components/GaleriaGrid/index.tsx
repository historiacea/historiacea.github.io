import { useLightbox, type LightboxImage } from '@site/src/components/Lightbox/context';
import { fichaDe, type FichaFoto } from '@site/src/data/fichasFotos';
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

type ItemFijo = { src: string; alt?: string; video?: boolean };

/** Vídeos que se muestran como una celda más al principio de una colección. */
export type VideoItem = { src: string; alt?: string; ficha?: FichaFoto };

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
  /**
   * Vídeos que encabezan la rejilla como una celda más: se ven igual que las
   * fotos (con un distintivo de reproducción) y abren el lightbox en vídeo.
   */
  videos?: VideoItem[];
};

// En modo lista, la ficha depende de la carpeta: las de /img/ia llevan el
// disclaimer de IA; el resto (p. ej. /img/libro) muestran solo su descripción.
function fichaDeItem(src: string, alt?: string) {
  if (src.includes('/img/ia/')) return fichaDe(src, 'ia');
  return alt ? { desc: alt } : undefined;
}

/** Celda de vídeo: se ve como una foto más, con su distintivo de play. */
function CeldaVideo({
  item,
  onOpen,
  etiqueta,
}: {
  item: VideoItem;
  onOpen: () => void;
  etiqueta: string;
}): JSX.Element {
  return (
    <button
      type="button"
      className={`${styles.celda} ${styles.celdaVideo}`}
      aria-label={etiqueta}
      onClick={onOpen}>
      {/* `#t=0.1` hace que el navegador pinte un fotograma como miniatura. */}
      <video src={`${item.src}#t=0.1`} preload="metadata" muted playsInline tabIndex={-1} />
      <span className={styles.playIcono} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="26" height="26">
          <path fill="currentColor" d="M8 5.14v13.72L19 12 8 5.14Z" />
        </svg>
      </span>
    </button>
  );
}

export default function GaleriaGrid({ coleccion, filtro, items, videos }: Props): JSX.Element {
  const { open } = useLightbox();
  const listaVideos: LightboxImage[] = (videos ?? []).map((v) => ({
    src: v.src,
    alt: v.alt,
    ficha: v.ficha,
    video: true,
  }));

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
  // Los vídeos van delante y comparten lista con las fotos, para poder pasar
  // de uno a otro con las flechas del lightbox.
  const todoList: LightboxImage[] = [...listaVideos, ...imgList];

  return (
    <div className={styles.grid}>
      {listaVideos.map((v, i) => (
        <CeldaVideo
          key={v.src}
          item={v}
          etiqueta={v.alt || `Reproducir vídeo ${i + 1}`}
          onOpen={() => open(v, todoList, i)}
        />
      ))}
      {imgList.map((item, i) => (
        <button
          key={item.src}
          type="button"
          className={styles.celda}
          aria-label={`Ampliar foto ${i + 1} de ${imgList.length}`}
          onClick={() => open(item, todoList, listaVideos.length + i)}>
          <img src={item.src} alt="" loading="lazy" />
        </button>
      ))}
    </div>
  );
}
