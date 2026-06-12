import { useLightbox } from '@site/src/components/Lightbox/context';
import { COLECCIONES } from '@site/src/components/GaleriaGrid';
import { fichaDe } from '@site/src/data/fichasFotos';
import styles from './styles.module.css';

/**
 * Cinta de fotos en movimiento continuo (marquee). Se pausa al pasar el
 * ratón y cada foto abre el lightbox con su ficha. Pensada para la home y
 * como "escaparate" de las galerías dentro de los docs.
 */
type Props = {
  /** Colecciones a mezclar (por defecto, castillo + recuerdos). */
  colecciones?: string[];
  /** Segundos que tarda en dar una vuelta completa. */
  duracion?: number;
};

export default function GaleriaCinta({
  colecciones = ['castillo', 'recuerdos'],
  duracion = 80,
}: Props): JSX.Element {
  const { open } = useLightbox();

  // Intercala las colecciones para variar el ritmo visual.
  const fotos: { src: string; coleccion: string }[] = [];
  const listas = colecciones.map((c) => (COLECCIONES[c] ?? []).map((src) => ({ src, coleccion: c })));
  const max = Math.max(...listas.map((l) => l.length), 0);
  for (let i = 0; i < max; i++) {
    for (const l of listas) if (l[i]) fotos.push(l[i]);
  }

  if (fotos.length === 0) return <></>;

  // Duplicamos la pista para el bucle infinito sin salto.
  const pista = [...fotos, ...fotos];

  return (
    <div className={styles.cinta}>
      <div
        className={styles.pista}
        style={{ ['--duracion' as string]: `${duracion}s` }}>
        {pista.map((f, i) => (
          <button
            key={`${f.src}-${i}`}
            type="button"
            className={styles.foto}
            tabIndex={i < fotos.length ? 0 : -1}
            aria-label="Ampliar foto"
            aria-hidden={i >= fotos.length}
            onClick={() => open({ src: f.src, ficha: fichaDe(f.src, f.coleccion) })}>
            <img src={f.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
