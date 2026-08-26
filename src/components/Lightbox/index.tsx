import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { LightboxContext, type LightboxImage } from './context';
import styles from './styles.module.css';

export default function LightboxProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [img, setImg] = useState<LightboxImage | null>(null);
  const [list, setList] = useState<LightboxImage[]>([]);
  const [index, setIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const figRef = useRef<HTMLDivElement>(null);

  const open = useCallback((next: LightboxImage, imgs?: LightboxImage[], idx?: number) => {
    setList(imgs ?? []);
    setIndex(idx ?? 0);
    setImg(next);
  }, []);

  const close = useCallback(() => setImg(null), []);

  const goTo = useCallback((i: number) => {
    if (!list.length) return;
    const next = list[i];
    if (!next) return;
    setIndex(i);
    setImg(next);
  }, [list]);

  const prev = useCallback(() => goTo((index - 1 + list.length) % list.length), [goTo, index, list.length]);
  const next = useCallback(() => goTo((index + 1) % list.length), [goTo, index, list.length]);

  useEffect(() => {
    if (!img) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [img, close, prev, next]);

  useEffect(() => {
    if (!img) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tl = gsap.timeline();
    if (overlayRef.current)
      tl.from(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power1.out' });
    if (figRef.current)
      tl.from(figRef.current, { scale: 0.9, opacity: 0, duration: 0.3, ease: 'back.out(1.6)' }, '-=0.08');
    return () => { tl.kill(); };
  }, [img]);

  const hasNav = list.length > 1;

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
          <button className={styles.close} aria-label="Cerrar" onClick={close}>×</button>

          {hasNav && (
            <button className={`${styles.navBtn} ${styles.navPrev}`} aria-label="Anterior" onClick={(e) => { e.stopPropagation(); prev(); }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
          )}

          <figure
            ref={figRef}
            className={`${styles.figure} ${img.ficha ? styles.conFicha : ''}`}
            onClick={(e) => e.stopPropagation()}>
            {img.video ? (
              <video
                className={styles.img}
                src={img.src}
                title={img.alt || ''}
                controls
                autoPlay
                playsInline
                controlsList="nodownload"
              />
            ) : (
              <img className={styles.img} src={img.src} alt={img.alt || ''} />
            )}
            {img.ficha ? (
              <aside className={styles.ficha}>
                <span className={styles.fichaKicker}>Ficha de archivo</span>
                {img.ficha.titulo && <h3 className={styles.fichaTitulo}>{img.ficha.titulo}</h3>}
                <dl className={styles.fichaDatos}>
                  {img.ficha.anio && (<><dt>Año</dt><dd>{img.ficha.anio}</dd></>)}
                  {img.ficha.lugar && (<><dt>Lugar</dt><dd>{img.ficha.lugar}</dd></>)}
                  {img.ficha.credito && (<><dt>Autor/a</dt><dd>{img.ficha.credito}</dd></>)}
                  {img.ficha.fuente && (
                    <><dt>Fuente</dt><dd>
                      {img.ficha.enlace
                        ? <a href={img.ficha.enlace} target="_blank" rel="noopener noreferrer">{img.ficha.fuente}</a>
                        : img.ficha.fuente}
                    </dd></>
                  )}
                </dl>
                {img.ficha.desc && <p className={styles.fichaDesc}>{img.ficha.desc}</p>}
              </aside>
            ) : (
              img.alt && <figcaption className={styles.caption}>{img.alt}</figcaption>
            )}
          </figure>

          {hasNav && (
            <button className={`${styles.navBtn} ${styles.navNext}`} aria-label="Siguiente" onClick={(e) => { e.stopPropagation(); next(); }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          )}

          {hasNav && (
            <div className={styles.counter}>{index + 1} / {list.length}</div>
          )}
        </div>
      )}
    </LightboxContext.Provider>
  );
}
