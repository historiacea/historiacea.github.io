import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import MapaCea from '@site/src/components/MapaCea';
import Colaborar from '@site/src/components/Colaborar';
import GaleriaCinta from '@site/src/components/GaleriaCinta';
import Heading from '@theme/Heading';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import styles from './index.module.css';

// Collage de fotos históricas del libro. `depth` controla la intensidad del
// parallax con el ratón (mayor = se mueve más).
const COLLAGE = [
  { src: '/img/libro/img-055.png', alt: 'La torre de Cea y la villa medieval', cls: styles.p1, depth: 22, float: 3.4 },
  { src: '/img/libro/img-028.png', alt: 'El puente sobre el río Cea', cls: styles.p2, depth: 38, float: 4.2 },
  { src: '/img/libro/img-013.png', alt: 'Castro vacceo reconstruido', cls: styles.p3, depth: 14, float: 3.8 },
  { src: '/img/libro/img-045.png', alt: 'Combate en la frontera medieval', cls: styles.p4, depth: 30, float: 4.6 },
  { src: '/img/libro/img-002.png', alt: 'El paisaje del río Cea', cls: styles.p5, depth: 18, float: 3.2 },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const rootRef = useRef<HTMLElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrada del texto
      gsap
        .timeline({ defaults: { ease: 'power3.out', duration: 0.8 } })
        .from(`.${styles.kicker}`, { y: 14, opacity: 0 })
        .from(`.${styles.title}`, { y: 22, opacity: 0 }, '-=0.5')
        .from(`.${styles.lead}`, { y: 16, opacity: 0 }, '-=0.55')
        .from(`.${styles.buttons} > *`, { y: 12, opacity: 0, stagger: 0.12 }, '-=0.5');

      // Entrada + flotación continua de cada foto del collage
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.photo}`);
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          scale: 0.9,
          y: 30,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3 + i * 0.12,
        });
        const dur = parseFloat(card.dataset.float || '4');
        gsap.to(card, {
          y: '+=14',
          duration: dur,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.4,
        });
      });
    }, rootRef);

    // Parallax con el ratón (desactivado si el usuario prefiere menos movimiento)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let onMove: ((e: MouseEvent) => void) | undefined;
    if (!reduce && collageRef.current) {
      const cards = Array.from(
        collageRef.current.querySelectorAll<HTMLElement>(`.${styles.photo}`),
      );
      onMove = (e: MouseEvent) => {
        if (!collageRef.current) return;
        const r = collageRef.current.getBoundingClientRect();
        const cx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const cy = (e.clientY - (r.top + r.height / 2)) / r.height;
        cards.forEach((card) => {
          const d = parseFloat(card.dataset.depth || '20');
          gsap.to(card, {
            x: -cx * d,
            rotateY: -cx * 4,
            rotateX: cy * 4,
            duration: 0.6,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });
      };
      window.addEventListener('mousemove', onMove);
    }

    return () => {
      if (onMove) window.removeEventListener('mousemove', onMove);
      ctx.revert();
    };
  }, []);

  return (
    <header className={styles.hero} ref={rootRef}>
      <div className={styles.mapBg} aria-hidden="true" />
      <div className={styles.escudoBg} aria-hidden="true" />
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />

      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroText}>
          <span className={styles.kicker}>León · Tierra de Campos</span>
          <Heading as="h1" className={styles.title}>
            {siteConfig.title}
          </Heading>
          <p className={styles.lead}>
            Más de mil años entre el río y la piedra. Un viaje a través de los siglos por la
            historia del pueblo de Cea, desde sus orígenes geológicos hasta nuestros días.
          </p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/docs/historia/intro">
              Comenzar el recorrido
            </Link>
            <Link className="button button--secondary button--lg" to="/cronologia">
              Ver la cronología
            </Link>
          </div>
        </div>

        <div className={styles.collage} ref={collageRef}>
          {COLLAGE.map((p) => (
            <figure
              key={p.src}
              className={`${styles.photo} ${p.cls}`}
              data-depth={p.depth}
              data-float={p.float}>
              <img src={p.src} alt={p.alt} loading="eager" />
            </figure>
          ))}
        </div>
      </div>
    </header>
  );
}

/**
 * Franja a ancho completo con el pueblo de fondo. Reservada para presentar
 * el libro cuando esté listo: basta cambiar el texto y añadir el botón.
 */
function BandaPueblo() {
  return (
    <section className={styles.banda}>
      <div className={styles.bandaOverlay} />
      <div className={styles.bandaEscudo} aria-hidden="true" />
      <div className={`container ${styles.bandaInner}`}>
        <span className={styles.bandaKicker}>Cejam civitatem mirificam</span>
        <Heading as="h2" className={styles.bandaTitulo}>
          Un pueblo que guarda mil años entre sus piedras
        </Heading>
        <p className={styles.bandaTexto}>
          Del castro vacceo al éxodo rural, de la reina Urraca a Las Candelas: toda la memoria
          de Cea, reunida y contada. <strong>Muy pronto, también en un libro.</strong>
        </p>
        <Link className={`button button--secondary button--lg ${styles.bandaBoton}`} to="/docs/historia/intro">
          Descubre la historia completa
        </Link>
      </div>
    </section>
  );
}

/** El castillo desde el aire: vídeo embebido. */
function SeccionVideo() {
  return (
    <section className={styles.videoSeccion}>
      <div className="container">
        <div className={styles.mapaCabecera}>
          <span className={styles.mapaKicker}>El símbolo</span>
          <Heading as="h2" className={styles.mapaTitulo}>
            El castillo, desde el aire
          </Heading>
          <p className={styles.mapaTexto}>
            La torre artillera del siglo XV con planta en esvástica, única en España — y en la{' '}
            <a
              href="https://listarojapatrimonio.org/ficha/castillo-de-cea/"
              target="_blank"
              rel="noopener noreferrer">
              Lista Roja del Patrimonio
            </a>{' '}
            desde 2008.
          </p>
        </div>
        <div className={styles.videoMarco}>
          <iframe
            src="https://www.youtube-nocookie.com/embed/H_DPeG9dQqk"
            title="El castillo de Cea desde el aire"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className={styles.videoCta}>
          <Link className="button button--secondary" to="/docs/castillo">
            Conoce el castillo a fondo →
          </Link>
        </p>
      </div>
    </section>
  );
}

/** Cinta con todas las fotos: castillo + recuerdos del pueblo. */
function SeccionCinta() {
  return (
    <section className={styles.cintaSeccion}>
      <div className="container">
        <div className={styles.mapaCabecera}>
          <span className={styles.mapaKicker}>El archivo</span>
          <Heading as="h2" className={styles.mapaTitulo}>
            La memoria, en imágenes
          </Heading>
          <p className={styles.mapaTexto}>
            Más de 60 fotografías del castillo y del pueblo de otro tiempo. Pulsa cualquiera para
            verla en grande con su ficha de archivo.
          </p>
        </div>
      </div>
      <GaleriaCinta duracion={90} />
      <p className={styles.cintaCtas}>
        <Link className="button button--secondary" to="/docs/castillo/fotos">
          Galería del castillo
        </Link>{' '}
        <Link className="button button--secondary" to="/recuerdos">
          Recuerdos del pueblo
        </Link>
      </p>
    </section>
  );
}

/** El territorio: mapa interactivo centrado en Cea. */
function SeccionMapa() {
  return (
    <section className={styles.mapaSeccion}>
      <div className="container">
        <div className={styles.mapaCabecera}>
          <span className={styles.mapaKicker}>El territorio</span>
          <Heading as="h2" className={styles.mapaTitulo}>
            Donde ocurre esta historia
          </Heading>
          <p className={styles.mapaTexto}>
            En la vega del río Cea, entre Sahagún y las primeras lomas hacia la montaña leonesa.
            Explora el mapa: aquí iremos marcando los escenarios de cada capítulo.
          </p>
        </div>
        <MapaCea alto={480} zoom={13} />
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Mil años de historia de Cea (León)"
      description="La historia completa del pueblo de Cea (León): de los vacceos al siglo XXI, su castillo único en España, el puente sobre el río Cea, la Nodicia de Kesos y la memoria de sus gentes.">
      <div className={styles.heroBlock}>
        <div className={styles.escudoMalla} aria-hidden="true" />
        <HomepageHeader />
        <HomepageFeatures />
      </div>
      <main>
        <BandaPueblo />
        <SeccionVideo />
        <SeccionCinta />
        <SeccionMapa />
        <section className={styles.colaboraSeccion}>
          <div className="container">
            <Colaborar />
          </div>
        </section>
      </main>
    </Layout>
  );
}
