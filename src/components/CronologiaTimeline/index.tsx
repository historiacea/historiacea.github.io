import { useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CRONOLOGIA, type Hito } from '@site/src/data/cronologia';
import styles from './styles.module.css';

/** Convierte **negrita**, _cursiva_ y «comillas» en JSX (texto de confianza). */
function renderInline(text: string): (string | JSX.Element)[] {
  const out: (string | JSX.Element)[] = [];
  const re = /\*\*(.+?)\*\*|_(.+?)_/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<strong key={k++}>{m[1]}</strong>);
    else out.push(<em key={k++}>{m[2]}</em>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Card({ hito }: { hito: Hito }): JSX.Element {
  const inner = (
    <>
      {hito.img && (
        <div className={styles.cardMedia}>
          <img src={hito.img} alt="" loading="lazy" />
        </div>
      )}
      <div className={styles.cardBody}>
        <span className={styles.fecha}>{hito.fecha}</span>
        <h3 className={styles.hitoTitulo}>{hito.titulo}</h3>
        <p className={styles.texto}>{renderInline(hito.texto)}</p>
        {hito.href && <span className={styles.cta}>Leer el capítulo →</span>}
      </div>
    </>
  );

  const cls = `${styles.card} ${hito.crucial ? styles.crucial : ''} ${
    hito.href ? styles.clickable : ''
  }`;

  return hito.href ? (
    <Link to={hito.href} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export default function CronologiaTimeline(): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // La línea vertical se "rellena" a medida que se hace scroll por el track.
      const track = rootRef.current!.querySelector(`.${styles.track}`) as HTMLElement;
      gsap.fromTo(
        `.${styles.progress}`,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: track,
            start: 'top 60%',
            end: 'bottom 75%',
            scrub: true,
          },
        },
      );

      if (reduce) return;

      // Cada fila entra desde su lado con fade al aproximarse al viewport.
      const rows = gsap.utils.toArray<HTMLElement>(`.${styles.row}`);
      rows.forEach((row) => {
        const fromLeft = row.classList.contains(styles.left);
        gsap.from(row.querySelector(`.${styles.card}`), {
          opacity: 0,
          x: fromLeft ? -48 : 48,
          y: 24,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 85%' },
        });
        // El punto del hito hace "pop".
        gsap.from(row.querySelector(`.${styles.dot}`), {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(3)',
          scrollTrigger: { trigger: row, start: 'top 85%' },
        });
      });

      // Cabecera de cada época.
      gsap.utils.toArray<HTMLElement>(`.${styles.epocaHead}`).forEach((h) => {
        gsap.from(h, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: h, start: 'top 88%' },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Aplanamos hitos alternando lado izquierda/derecha de forma global.
  let i = 0;

  return (
    <div ref={rootRef} className={styles.wrap}>
      <div className={styles.track}>
        <div className={styles.line} aria-hidden="true">
          <div className={styles.progress} />
        </div>

        {CRONOLOGIA.map((epoca) => (
          <section key={epoca.id} className={styles.epoca}>
            <header className={styles.epocaHead}>
              <h2 className={styles.epocaTitulo}>
                <span className={styles.epocaIcono} aria-hidden="true">
                  {epoca.icono}
                </span>
                {epoca.titulo}
              </h2>
              <span className={styles.epocaRango}>{epoca.rango}</span>
              <p className={styles.epocaContexto}>{renderInline(epoca.contexto)}</p>
            </header>

            {epoca.hitos.map((hito) => {
              const left = i++ % 2 === 0;
              return (
                <div
                  key={hito.fecha + hito.texto.slice(0, 10)}
                  className={`${styles.row} ${left ? styles.left : styles.right}`}>
                  <span
                    className={`${styles.dot} ${hito.crucial ? styles.dotCrucial : ''}`}
                    aria-hidden="true"
                  />
                  <div className={styles.cardSlot}>
                    <Card hito={hito} />
                  </div>
                </div>
              );
            })}
          </section>
        ))}
      </div>
    </div>
  );
}
