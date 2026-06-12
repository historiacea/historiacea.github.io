import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLightbox } from '@site/src/components/Lightbox/context';
import styles from './styles.module.css';

/**
 * Vista 3D de las plantas del castillo de Cea: los planos se apilan en
 * perspectiva isométrica y pueden "explosionarse" para ver cada nivel.
 * Al seleccionar una planta se resalta y se muestra su descripción.
 *
 * Las descripciones son orientativas y editables aquí mismo.
 */
type Planta = {
  num: number;
  img: string;
  /** Versión anotada del plano (sufijo -o). */
  imgAnotada: string;
  titulo: string;
  desc: string;
};

const PLANTAS: Planta[] = [
  {
    num: 0,
    img: '/img/castillo/plantas/planta-0.png',
    imgAnotada: '/img/castillo/plantas/planta-0-o.png',
    titulo: 'Planta baja · El acceso y el aljibe',
    desc: 'La puerta a nivel del suelo y el aljibe que garantizaba el agua durante los asedios. Es la base de la torre, con los muros más gruesos.',
  },
  {
    num: 1,
    img: '/img/castillo/plantas/planta-1.png',
    imgAnotada: '/img/castillo/plantas/planta-1-o.png',
    titulo: 'Primera planta · Bóvedas de cañón',
    desc: 'Dependencias cubiertas con bóvedas de ladrillo, capaces de sostener el peso de las piezas de artillería de los niveles superiores.',
  },
  {
    num: 2,
    img: '/img/castillo/plantas/planta-2.png',
    imgAnotada: '/img/castillo/plantas/planta-2-o.png',
    titulo: 'Segunda planta · El acceso elevado',
    desc: 'La segunda puerta, en alto y en la cara opuesta a la principal: si caía el acceso inferior, la torre seguía siendo defendible.',
  },
  {
    num: 3,
    img: '/img/castillo/plantas/planta-3.png',
    imgAnotada: '/img/castillo/plantas/planta-3-o.png',
    titulo: 'Tercera planta · El nivel de defensa',
    desc: 'Desde aquí las cuatro torrecillas salientes cubrían con su tiro de flanqueo las cuatro caras del edificio.',
  },
  {
    num: 4,
    img: '/img/castillo/plantas/planta-4.png',
    imgAnotada: '/img/castillo/plantas/planta-4-o.png',
    titulo: 'Remate · Torrecillas y cubierta',
    desc: 'El remate de la torre, con las torrecillas que dan al castillo su planta en esvástica, única en España.',
  },
];

export default function CastilloPlantas(): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activa, setActiva] = useState<number | null>(null);
  const [separado, setSeparado] = useState(true);
  const { open } = useLightbox();

  // Entrada: las plantas "caen" y se apilan una a una al llegar al viewport.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.planta}`, {
        opacity: 0,
        z: 260,
        duration: 0.8,
        ease: 'power3.out',
        stagger: -0.14,
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const sep = separado ? 120 : 38;
  const plantaActiva = activa !== null ? PLANTAS[activa] : null;

  return (
    <div ref={rootRef} className={styles.wrap}>
      <div className={styles.escena}>
        <div className={styles.pila} style={{ ['--sep' as string]: `${sep}px` }}>
          {PLANTAS.map((p, i) => (
            <button
              key={p.num}
              type="button"
              className={`${styles.planta} ${activa === i ? styles.plantaActiva : ''} ${
                activa !== null && activa !== i ? styles.plantaApagada : ''
              }`}
              style={{ ['--i' as string]: i }}
              aria-label={p.titulo}
              onClick={() => setActiva(activa === i ? null : i)}>
              <img src={p.img} alt={p.titulo} loading="lazy" />
              <span className={styles.chip}>P{p.num}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className={`button button--secondary button--sm ${styles.toggle}`}
          onClick={() => setSeparado(!separado)}>
          {separado ? 'Apilar plantas' : 'Separar plantas'}
        </button>
      </div>

      <aside className={styles.panel}>
        <span className={styles.kicker}>La torre, nivel a nivel</span>
        <ul className={styles.lista}>
          {PLANTAS.map((p, i) => (
            <li key={p.num}>
              <button
                type="button"
                className={`${styles.item} ${activa === i ? styles.itemActivo : ''}`}
                onClick={() => setActiva(activa === i ? null : i)}>
                <span className={styles.itemNum}>P{p.num}</span>
                <span className={styles.itemTitulo}>{p.titulo}</span>
              </button>
            </li>
          ))}
        </ul>

        {plantaActiva ? (
          <div className={styles.detalle}>
            <p className={styles.desc}>{plantaActiva.desc}</p>
            <div className={styles.acciones}>
              <button
                type="button"
                className="button button--primary button--sm"
                onClick={() => open({ src: plantaActiva.img, alt: plantaActiva.titulo })}>
                Ver plano completo
              </button>
              <button
                type="button"
                className="button button--secondary button--sm"
                onClick={() =>
                  open({ src: plantaActiva.imgAnotada, alt: `${plantaActiva.titulo} (anotado)` })
                }>
                Versión anotada
              </button>
            </div>
          </div>
        ) : (
          <p className={styles.ayuda}>
            Pulsa una planta —en el dibujo o en la lista— para conocerla, y usa{' '}
            <strong>«Separar plantas»</strong> para ver la torre explosionada.
          </p>
        )}
      </aside>
    </div>
  );
}
