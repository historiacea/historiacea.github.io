import { useRef, useState, useCallback } from 'react';
import { useLightbox } from '@site/src/components/Lightbox/context';
import styles from './styles.module.css';

type Props = {
  /** JSON string con las rutas (lo inyecta el plugin remark-foto-slider). */
  imgs: string;
};

/**
 * Carrusel para grupos de imágenes consecutivas de los capítulos.
 * Scroll-snap nativo + flechas + puntos; clic en la foto abre el lightbox.
 */
export default function FotoSlider({ imgs }: Props): JSX.Element {
  const lista: string[] = JSON.parse(imgs);
  const trackRef = useRef<HTMLDivElement>(null);
  const [actual, setActual] = useState(0);
  const { open } = useLightbox();

  const irA = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.max(0, Math.min(lista.length - 1, i));
    el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' });
  }, [lista.length]);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setActual(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <figure className={styles.slider}>
      <div className={styles.viewport}>
        <div ref={trackRef} className={styles.track} onScroll={onScroll}>
          {lista.map((src, i) => (
            <div key={src} className={styles.slide}>
              <img
                src={src}
                alt={`Imagen ${i + 1} de ${lista.length}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                onClick={() => open({ src })}
              />
            </div>
          ))}
        </div>

        {lista.length > 1 && (
          <>
            <button
              type="button"
              className={`${styles.flecha} ${styles.izq}`}
              aria-label="Imagen anterior"
              disabled={actual === 0}
              onClick={() => irA(actual - 1)}>
              ‹
            </button>
            <button
              type="button"
              className={`${styles.flecha} ${styles.der}`}
              aria-label="Imagen siguiente"
              disabled={actual === lista.length - 1}
              onClick={() => irA(actual + 1)}>
              ›
            </button>
            <span className={styles.contador}>
              {actual + 1} / {lista.length}
            </span>
          </>
        )}
      </div>

      {lista.length > 1 && (
        <div className={styles.dots} role="tablist" aria-label="Selector de imagen">
          {lista.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === actual}
              aria-label={`Ver imagen ${i + 1}`}
              className={`${styles.dot} ${i === actual ? styles.dotActivo : ''}`}
              onClick={() => irA(i)}
            />
          ))}
        </div>
      )}
    </figure>
  );
}
