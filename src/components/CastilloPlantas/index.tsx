import { useLightbox } from '@site/src/components/Lightbox/context';
import styles from './styles.module.css';

const PLANTAS = [
  { num: 0, img: '/img/castillo/plantas/planta-0.png', titulo: 'P0 · Planta baja — El acceso y el aljibe' },
  { num: 1, img: '/img/castillo/plantas/planta-1.png', titulo: 'P1 · Primera planta — Bóvedas de cañón' },
  { num: 2, img: '/img/castillo/plantas/planta-2.png', titulo: 'P2 · Segunda planta — El acceso elevado' },
  { num: 3, img: '/img/castillo/plantas/planta-3.png', titulo: 'P3 · Tercera planta — El nivel de defensa' },
  { num: 4, img: '/img/castillo/plantas/planta-4.png', titulo: 'P4 · Remate — Torrecillas y cubierta' },
];

export default function CastilloPlantas(): JSX.Element {
  const { open } = useLightbox();

  return (
    <div className={styles.wrap}>
      <div className={styles.pila}>
        {PLANTAS.map((p, i) => (
          <button
            key={p.num}
            type="button"
            className={styles.planta}
            style={{ '--i': i } as React.CSSProperties}
            aria-label={`Ampliar ${p.titulo}`}
            onClick={() => open({ src: p.img, alt: p.titulo })}
          >
            <img src={p.img} alt={p.titulo} loading="lazy" />
            <span className={styles.chip}>P{p.num}</span>
          </button>
        ))}
      </div>
      <p className={styles.ayuda}>Pulsa cualquier planta para ampliarla</p>
    </div>
  );
}
