import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export type Capitulo = {
  /** Número visible en la etiqueta (p. ej. "Capítulo 8"). */
  num: number;
  titulo: string;
  /** Frase corta de gancho bajo el título. */
  gancho: string;
  /** Ruta absoluta al doc del capítulo. */
  href: string;
  /** Imagen de preview; si falta, se muestra un marcador con el número. */
  img?: string;
};

type Props = {
  capitulos: Capitulo[];
};

export default function CapitulosGrid({ capitulos }: Props): JSX.Element {
  return (
    <div className={styles.grid}>
      {capitulos.map((c) => (
        <Link key={c.href} to={c.href} className={styles.card}>
          <div className={styles.media}>
            {c.img ? (
              <img src={c.img} alt={c.titulo} loading="lazy" />
            ) : (
              <span className={styles.placeholder} aria-hidden="true">
                {c.num}
              </span>
            )}
          </div>
          <div className={styles.body}>
            <span className={styles.num}>Capítulo {c.num}</span>
            <span className={styles.titulo}>{c.titulo}</span>
            {/* Evita repetir el título cuando el gancho es idéntico. */}
            {c.gancho && c.gancho.replace(/\.$/, '') !== c.titulo && (
              <span className={styles.gancho}>{c.gancho}</span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
