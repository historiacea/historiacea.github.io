import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { LightboxContext, type LightboxImage } from './context';
import styles from './styles.module.css';

/**
 * Proveedor global de lightbox. Envuelve la app (en theme/Root) para que una
 * única capa de overlay sirva a todas las imágenes. Las imágenes lo invocan
 * con useLightbox().open({ src, alt }).
 */
export default function LightboxProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [img, setImg] = useState<LightboxImage | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const figRef = useRef<HTMLDivElement>(null);

  const open = useCallback((next: LightboxImage) => setImg(next), []);
  const close = useCallback(() => setImg(null), []);

  // Bloqueo de scroll + cerrar con Escape mientras está abierto.
  useEffect(() => {
    if (!img) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [img, close]);

  // Animación de entrada. La opacidad/visibilidad final la garantiza el CSS,
  // de modo que aunque GSAP no llegue a ejecutarse, el lightbox se ve igual.
  useEffect(() => {
    if (!img) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tl = gsap.timeline();
    if (overlayRef.current)
      tl.from(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power1.out' });
    if (figRef.current)
      tl.from(
        figRef.current,
        { scale: 0.9, opacity: 0, duration: 0.3, ease: 'back.out(1.6)' },
        '-=0.08',
      );
    return () => {
      tl.kill();
    };
  }, [img]);

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {img && (
        <div
          ref={overlayRef}
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={img.alt || 'Imagen ampliada'}
          onClick={close}>
          <button className={styles.close} aria-label="Cerrar" onClick={close}>
            ×
          </button>
          <figure
            ref={figRef}
            className={`${styles.figure} ${img.ficha ? styles.conFicha : ''}`}
            onClick={(e) => e.stopPropagation()}>
            <img className={styles.img} src={img.src} alt={img.alt || ''} />
            {img.ficha ? (
              <aside className={styles.ficha}>
                <span className={styles.fichaKicker}>Ficha de archivo</span>
                {img.ficha.titulo && <h3 className={styles.fichaTitulo}>{img.ficha.titulo}</h3>}
                <dl className={styles.fichaDatos}>
                  {img.ficha.anio && (
                    <>
                      <dt>Año</dt>
                      <dd>{img.ficha.anio}</dd>
                    </>
                  )}
                  {img.ficha.lugar && (
                    <>
                      <dt>Lugar</dt>
                      <dd>{img.ficha.lugar}</dd>
                    </>
                  )}
                  {img.ficha.credito && (
                    <>
                      <dt>Autor/a</dt>
                      <dd>{img.ficha.credito}</dd>
                    </>
                  )}
                  {img.ficha.fuente && (
                    <>
                      <dt>Fuente</dt>
                      <dd>
                        {img.ficha.enlace ? (
                          <a href={img.ficha.enlace} target="_blank" rel="noopener noreferrer">
                            {img.ficha.fuente}
                          </a>
                        ) : (
                          img.ficha.fuente
                        )}
                      </dd>
                    </>
                  )}
                </dl>
                {img.ficha.desc && <p className={styles.fichaDesc}>{img.ficha.desc}</p>}
              </aside>
            ) : (
              img.alt && <figcaption className={styles.caption}>{img.alt}</figcaption>
            )}
          </figure>
        </div>
      )}
    </LightboxContext.Provider>
  );
}
