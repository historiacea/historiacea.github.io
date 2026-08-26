import { useEffect, useRef } from 'react';
import styles from './styles.module.css';

type Props = {
  /** Ruta del .mp4 de fondo. */
  src: string;
  /** Póster mientras carga el vídeo. */
  poster?: string;
  /** Velocidad del rebobinado (1 = misma que la ida). */
  velocidadInversa?: number;
};

/**
 * Vídeo de fondo en bucle "ping-pong": al llegar al final rebobina hacia atrás
 * en lugar de saltar al principio, de modo que el zoom del dron entra y sale
 * sin corte visible. Como ningún navegador reproduce vídeo hacia atrás de
 * forma nativa, el rebobinado se hace a mano moviendo `currentTime` en cada
 * frame con requestAnimationFrame.
 *
 * Si el usuario prefiere menos movimiento, se queda en un fotograma fijo.
 */
export default function VideoFondo({
  src,
  poster,
  velocidadInversa = 1,
}: Props): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      video.pause();
      return;
    }

    let rafId = 0;
    let ultimo = 0;
    let rebobinando = false;

    // Rebobina moviendo currentTime frame a frame hasta volver al inicio.
    const rebobinar = (t: number) => {
      if (!rebobinando) return;
      const dt = ultimo ? (t - ultimo) / 1000 : 0;
      ultimo = t;
      const siguiente = video.currentTime - dt * velocidadInversa;
      if (siguiente <= 0) {
        video.currentTime = 0;
        rebobinando = false;
        void video.play().catch(() => {});
        return;
      }
      video.currentTime = siguiente;
      rafId = requestAnimationFrame(rebobinar);
    };

    const alTerminar = () => {
      if (rebobinando) return;
      video.pause();
      rebobinando = true;
      ultimo = 0;
      // Arrancamos un pelín antes del final para evitar quedarnos clavados.
      if (video.duration) {
        video.currentTime = Math.max(0, video.duration - 0.05);
      }
      rafId = requestAnimationFrame(rebobinar);
    };

    // `ended` no siempre dispara sin loop en todos los navegadores: vigilamos
    // también el tiempo por si acaso.
    const alAvanzar = () => {
      if (!rebobinando && video.duration && video.currentTime >= video.duration - 0.08) {
        alTerminar();
      }
    };

    // Pausamos cuando la pestaña no está visible, para no gastar batería.
    const alCambiarVisibilidad = () => {
      if (document.hidden) {
        video.pause();
        rebobinando = false;
        cancelAnimationFrame(rafId);
      } else if (!rebobinando) {
        void video.play().catch(() => {});
      }
    };

    video.addEventListener('ended', alTerminar);
    video.addEventListener('timeupdate', alAvanzar);
    document.addEventListener('visibilitychange', alCambiarVisibilidad);
    void video.play().catch(() => {});

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener('ended', alTerminar);
      video.removeEventListener('timeupdate', alAvanzar);
      document.removeEventListener('visibilitychange', alCambiarVisibilidad);
    };
  }, [src, velocidadInversa]);

  return (
    <div className={styles.fondo} aria-hidden="true">
      <video
        ref={videoRef}
        className={styles.video}
        src={src}
        poster={poster}
        muted
        playsInline
        autoPlay
        preload="auto"
        tabIndex={-1}
      />
      <div className={styles.velo} />
    </div>
  );
}
