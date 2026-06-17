import { useState } from 'react';
import { useLightbox } from '@site/src/components/Lightbox/context';
import styles from './styles.module.css';

const PLANTAS = [
  {
    num: 0,
    img: '/img/castillo/plantas/planta-0.png',
    imgAnotada: '/img/castillo/plantas/planta-0-o.png',
    titulo: 'Planta baja · El acceso y el aljibe',
    desc: 'La puerta a nivel del suelo y el aljibe que garantizaba el agua durante los asedios. Muros más gruesos de toda la torre.',
  },
  {
    num: 1,
    img: '/img/castillo/plantas/planta-1.png',
    imgAnotada: '/img/castillo/plantas/planta-1-o.png',
    titulo: 'Primera planta · Bóvedas de cañón',
    desc: 'Dependencias cubiertas con bóvedas de ladrillo capaces de sostener el peso de las piezas de artillería superiores.',
  },
  {
    num: 2,
    img: '/img/castillo/plantas/planta-2.png',
    imgAnotada: '/img/castillo/plantas/planta-2-o.png',
    titulo: 'Segunda planta · El acceso elevado',
    desc: 'Segunda puerta en alto y en la cara opuesta: si caía el acceso inferior, la torre seguía siendo defendible.',
  },
  {
    num: 3,
    img: '/img/castillo/plantas/planta-3.png',
    imgAnotada: '/img/castillo/plantas/planta-3-o.png',
    titulo: 'Tercera planta · El nivel de defensa',
    desc: 'Las cuatro torrecillas salientes cubrían con su tiro de flanqueo todas las caras del edificio.',
  },
  {
    num: 4,
    img: '/img/castillo/plantas/planta-4.png',
    imgAnotada: '/img/castillo/plantas/planta-4-o.png',
    titulo: 'Remate · Torrecillas y cubierta',
    desc: 'El remate con las torrecillas que dan al castillo su planta en esvástica, única en España.',
  },
];

export default function CastilloPlantas(): JSX.Element {
  const [activa, setActiva] = useState<number | null>(null);
  const { open } = useLightbox();
  const planta = activa !== null ? PLANTAS[activa] : null;

  function seleccionar(i: number) {
    setActiva(activa === i ? null : i);
  }

  return (
    <div className={styles.wrap}>

      {/* ── Pila isométrica ── */}
      <div className={styles.escena}>
        <div className={styles.pilaWrap}>
          <div className={styles.pila}>
            {PLANTAS.map((p, i) => (
              <button
                key={p.num}
                type="button"
                className={`${styles.planta} ${activa === i ? styles.plantaActiva : ''}`}
                style={{ '--i': i } as React.CSSProperties}
                aria-label={p.titulo}
                onClick={() => seleccionar(i)}
              >
                <img src={p.img} alt={p.titulo} loading="lazy" />
                <span className={styles.chip}>P{p.num}</span>
              </button>
            ))}
          </div>
        </div>
        <p className={styles.ayudaPila}>Pulsa una planta para seleccionarla</p>
      </div>

      {/* ── Panel derecho ── */}
      <aside className={styles.panel}>
        <span className={styles.kicker}>La torre, nivel a nivel</span>
        <ul className={styles.lista}>
          {PLANTAS.map((p, i) => (
            <li key={p.num}>
              <button
                type="button"
                className={`${styles.item} ${activa === i ? styles.itemActivo : ''}`}
                onClick={() => open({ src: p.imgAnotada, alt: p.titulo })}
              >
                <span className={styles.itemNum}>P{p.num}</span>
                <span className={styles.itemTitulo}>{p.titulo}</span>
              </button>
            </li>
          ))}
        </ul>

        {planta ? (
          <div className={styles.detalle}>
            <p className={styles.desc}>{planta.desc}</p>
            <div className={styles.acciones}>
              <button
                type="button"
                className="button button--secondary button--sm"
                onClick={() => open({ src: planta.imgAnotada, alt: `${planta.titulo} (anotado)` })}
              >
                Ver versión anotada
              </button>
            </div>
          </div>
        ) : (
          <p className={styles.ayuda}>
            Pulsa un nivel en la lista para abrirlo, o selecciónalo en el dibujo para ver su descripción.
          </p>
        )}
      </aside>

    </div>
  );
}
