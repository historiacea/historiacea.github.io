import { useRef, useState, useCallback, useEffect } from 'react';
import styles from './styles.module.css';

export type VideoItem = {
  /** Ruta del .mp4 dentro de /static, o URL de embed si `embed` es true. */
  src: string;
  /** Título accesible / rótulo del vídeo. */
  titulo: string;
  /** Póster opcional mientras no se reproduce. */
  poster?: string;
  /** Si es true, `src` se carga en un iframe (YouTube, Vimeo…). */
  embed?: boolean;
  /** Si es false, esta diapositiva no lleva la marca de agua del autor. */
  credito?: boolean;
};

type Props = {
  videos: VideoItem[];
  /** Autor a acreditar sobre el vídeo (marca de agua arriba a la izquierda). */
  autor?: string;
  /** Perfil del autor al que enlaza la marca de agua. */
  autorUrl?: string;
  /**
   * Modo "asomo": el vídeo siguiente se ve medio cortado por la derecha, para
   * invitar a arrastrar. Prescinde de flechas, contador, pie y puntos.
   */
  asomo?: boolean;
};

const AUTOR_POR_DEFECTO = '@followfolley';
const AUTOR_URL_POR_DEFECTO = 'https://www.instagram.com/followfolley/';

/**
 * Carrusel de vídeos alojados en el propio sitio: se arrastra en horizontal
 * (scroll-snap nativo) y lleva flechas, puntos y la marca de agua del autor
 * sobre el reproductor, en el sitio donde YouTube pondría su logo.
 */
export default function VideoSlider({
  videos,
  autor = AUTOR_POR_DEFECTO,
  autorUrl = AUTOR_URL_POR_DEFECTO,
  asomo = false,
}: Props): JSX.Element {
  const trackRef = useRef<HTMLDivElement>(null);
  const [actual, setActual] = useState(0);

  // En modo asomo las cards son más estrechas que la pista, así que la posición
  // se calcula con el desplazamiento real de cada diapositiva.
  const irA = useCallback(
    (i: number) => {
      const el = trackRef.current;
      if (!el) return;
      const idx = Math.max(0, Math.min(videos.length - 1, i));
      const destino = el.children[idx] as HTMLElement | undefined;
      if (!destino) return;
      // Descontamos el hueco de centrado, que en modo asomo es el margen
      // izquierdo de la primera card.
      const primera = el.children[0] as HTMLElement | undefined;
      const hueco = primera ? primera.offsetLeft - el.offsetLeft : 0;
      el.scrollTo({ left: destino.offsetLeft - el.offsetLeft - hueco, behavior: 'smooth' });
    },
    [videos.length],
  );

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const primera = el.children[0] as HTMLElement | undefined;
    const hueco = primera ? primera.offsetLeft - el.offsetLeft : 0;
    const x = el.scrollLeft;
    let cerca = 0;
    let min = Infinity;
    // `::after` no es un elemento, así que sólo iteramos las diapositivas.
    Array.from(el.children).forEach((hijo, i) => {
      const d = Math.abs((hijo as HTMLElement).offsetLeft - el.offsetLeft - hueco - x);
      if (d < min) {
        min = d;
        cerca = i;
      }
    });
    setActual(cerca);
  };

  // Al cambiar de diapositiva, pausamos los vídeos que quedan fuera de vista.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.querySelectorAll('video').forEach((v, i) => {
      if (i !== actual) v.pause();
    });
  }, [actual]);

  // El distintivo del autor, que en modo asomo va sobre cada vídeo suyo.
  const marca = (
    <a
      className={styles.marca}
      href={autorUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={`Vídeo de ${autor} — ver perfil en Instagram`}>
      <svg
        className={styles.marcaIcono}
        viewBox="0 0 24 24"
        width="16"
        height="16"
        aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 5.68a4.16 4.16 0 1 0 0 8.32 4.16 4.16 0 0 0 0-8.32Zm0 6.86a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.3-7.02a.97.97 0 1 1-1.94 0 .97.97 0 0 1 1.94 0Z"
        />
      </svg>
      <span className={styles.marcaTexto}>{autor}</span>
    </a>
  );

  const reproductor = (v: VideoItem) =>
    v.embed ? (
      <iframe
        src={v.src}
        title={v.titulo}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    ) : (
      <video
        src={v.src}
        poster={v.poster}
        title={v.titulo}
        controls
        playsInline
        preload="metadata"
        controlsList="nodownload"
        // Hasta que no cargan los metadatos el navegador no sabe la forma del
        // vídeo: en cuanto la conoce, fijamos su proporción real para que la
        // card se ajuste a su ancho en vez de dejar bandas negras.
        onLoadedMetadata={(e) => {
          const el = e.currentTarget;
          if (el.videoWidth && el.videoHeight) {
            el.style.aspectRatio = `${el.videoWidth} / ${el.videoHeight}`;
          }
        }}
      />
    );

  // Modo asomo: el vídeo actual va centrado y el siguiente asoma cortado por
  // la derecha. Sin flechas ni pie: sólo los puntos para cambiar.
  if (asomo) {
    return (
      <div className={`${styles.slider} ${styles.sliderAsomo}`}>
        <div ref={trackRef} className={`${styles.track} ${styles.trackAsomo}`} onScroll={onScroll}>
          {videos.map((v, i) => (
            <div
              key={v.src}
              className={`${styles.slide} ${styles.slideAsomo} ${
                i === 0 ? styles.slideAsomoPrimera : ''
              }`}>
              <div className={styles.card}>
                {reproductor(v)}
                {v.credito !== false && marca}
              </div>
            </div>
          ))}
        </div>

        {videos.length > 1 && (
          <div className={styles.dots} role="tablist" aria-label="Selector de vídeo">
            {videos.map((v, i) => (
              <button
                key={v.src}
                type="button"
                role="tab"
                aria-selected={i === actual}
                aria-label={`Ver ${v.titulo}`}
                className={`${styles.dot} ${i === actual ? styles.dotActivo : ''}`}
                onClick={() => irA(i)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <figure className={styles.slider}>
      <div className={styles.viewport}>
        <div ref={trackRef} className={styles.track} onScroll={onScroll}>
          {videos.map((v) => (
            <div key={v.src} className={styles.slide}>
              {reproductor(v)}
            </div>
          ))}
        </div>

        {videos[actual]?.credito !== false && marca}

        {videos.length > 1 && (
          <>
            <button
              type="button"
              className={`${styles.flecha} ${styles.izq}`}
              aria-label="Vídeo anterior"
              disabled={actual === 0}
              onClick={() => irA(actual - 1)}>
              ‹
            </button>
            <button
              type="button"
              className={`${styles.flecha} ${styles.der}`}
              aria-label="Vídeo siguiente"
              disabled={actual === videos.length - 1}
              onClick={() => irA(actual + 1)}>
              ›
            </button>
            <span className={styles.contador}>
              {actual + 1} / {videos.length}
            </span>
          </>
        )}
      </div>

      <figcaption className={styles.pie}>
        <span className={styles.pieTitulo}>{videos[actual]?.titulo}</span>
        {videos.length > 1 && (
          <span className={styles.pieAyuda}> · arrastra para ver más</span>
        )}
      </figcaption>

      {videos.length > 1 && (
        <div className={styles.dots} role="tablist" aria-label="Selector de vídeo">
          {videos.map((v, i) => (
            <button
              key={v.src}
              type="button"
              role="tab"
              aria-selected={i === actual}
              aria-label={`Ver ${v.titulo}`}
              className={`${styles.dot} ${i === actual ? styles.dotActivo : ''}`}
              onClick={() => irA(i)}
            />
          ))}
        </div>
      )}
    </figure>
  );
}
