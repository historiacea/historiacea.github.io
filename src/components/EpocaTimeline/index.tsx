import { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { gsap } from 'gsap';
import styles from './styles.module.css';

/**
 * Las ocho épocas del recorrido, en orden cronológico. El `id` se usa para
 * marcar cuál está activa: <EpocaTimeline activa="roma" />.
 * `rango` es la etiqueta corta bajo cada hito.
 */
type Epoca = { id: string; label: string; rango: string; href: string };

const EPOCAS: Epoca[] = [
  { id: 'tierra', label: 'La tierra', rango: 'hasta s. I a.C.', href: '/docs/historia/parte-1/' },
  { id: 'roma', label: 'Roma', rango: 's. I a.C. – V', href: '/docs/historia/parte-2/' },
  { id: 'altaedad', label: 'Alta Edad Media', rango: 's. VI – X', href: '/docs/historia/parte-3/' },
  { id: 'senorio', label: 'Señorío', rango: 's. X – XIII', href: '/docs/historia/parte-4/' },
  { id: 'conflictos', label: 'Conflictos', rango: 's. XIV – XVII', href: '/docs/historia/parte-5/' },
  { id: 'ilustracion', label: 'Ilustración', rango: 's. XVIII – XIX', href: '/docs/historia/parte-6/' },
  { id: 'siglo20', label: 'Siglo XX', rango: '1900 – 1999', href: '/docs/historia/parte-7/' },
  { id: 'siglo21', label: 'Siglo XXI', rango: 'hoy', href: '/docs/historia/parte-8/' },
];

type Props = {
  /** id de la época que se resalta como "estás aquí". */
  activa: string;
};

export default function EpocaTimeline({ activa }: Props): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLLIElement>(null);
  // Si hay contenido oculto a izquierda/derecha (para los degradados de borde).
  const [edges, setEdges] = useState({ left: false, right: false });

  const idx = EPOCAS.findIndex((e) => e.id === activa);
  // Porcentaje de línea "recorrida" hasta la época activa.
  const pct = idx <= 0 ? 0 : (idx / (EPOCAS.length - 1)) * 100;

  const updateEdges = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setEdges({
      left: el.scrollLeft > 4,
      right: el.scrollLeft < maxScroll - 4,
    });
  };

  // Al montar: centra la época activa en el viewport y calcula los bordes.
  useEffect(() => {
    const el = scrollRef.current;
    const active = activeRef.current;
    if (el && active) {
      const target = active.offsetLeft - el.clientWidth / 2 + active.offsetWidth / 2;
      el.scrollLeft = Math.max(0, target);
    }
    updateEdges();
    const onResize = () => updateEdges();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from(`.${styles.progress}`, { scaleX: 0, transformOrigin: 'left center', duration: 0.9 })
        .from(`.${styles.step}`, { opacity: 0, y: 8, stagger: 0.05, duration: 0.4 }, '-=0.6')
        .from(
          `.${styles.active} .${styles.dot}`,
          { scale: 0, duration: 0.5, ease: 'back.out(2.5)' },
          '-=0.2',
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const epocaActiva = EPOCAS[idx];

  return (
    <div
      ref={rootRef}
      className={`${styles.shell} ${edges.left ? styles.hasLeft : ''} ${
        edges.right ? styles.hasRight : ''
      }`}>
      <div className={styles.cabecera}>
        <span className={styles.kicker}>El recorrido</span>
        {epocaActiva && (
          <span className={styles.estasAqui}>
            Estás en: <strong>{epocaActiva.label}</strong>
          </span>
        )}
      </div>

      <nav
        ref={scrollRef}
        className={styles.wrap}
        onScroll={updateEdges}
        aria-label="Línea temporal de la historia de Cea">
        <ol className={styles.track}>
          <div className={styles.line} aria-hidden="true">
            <div className={styles.progress} style={{ width: `${pct}%` }} />
          </div>
          {EPOCAS.map((e, i) => {
            const esActiva = e.id === activa;
            const pasada = i < idx;
            return (
              <li
                key={e.id}
                ref={esActiva ? activeRef : undefined}
                className={`${styles.step} ${esActiva ? styles.active : ''} ${
                  pasada ? styles.past : ''
                }`}>
                <Link
                  to={e.href}
                  className={styles.link}
                  aria-current={esActiva ? 'step' : undefined}>
                  <span className={styles.dot} aria-hidden="true" />
                  <span className={styles.label}>{e.label}</span>
                  <span className={styles.rango}>{e.rango}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
