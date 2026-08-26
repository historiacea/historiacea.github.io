import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { IconBook, IconTower, IconScroll } from '@site/src/components/Icons';
import VideoFondo from '@site/src/components/VideoFondo';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Icon: React.ComponentType<{ size?: number }>;
  description: string;
  to: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'La Historia',
    Icon: IconBook,
    description:
      'El relato completo de Cea desde sus orígenes geológicos hasta nuestros días, en ocho partes y treinta y cinco capítulos.',
    to: '/docs/historia/intro',
  },
  {
    title: 'La Torre y el Castillo',
    Icon: IconTower,
    description:
      'La emblemática Torre de Cea y sus elementos arquitectónicos, símbolo del poder señorial medieval en la comarca.',
    to: '/docs/castillo',
  },
  {
    title: 'La Cronología',
    Icon: IconScroll,
    description:
      'Los acontecimientos decisivos de Cea ordenados en el tiempo, desde la cultura vaccea hasta el presente.',
    to: '/cronologia',
  },
];

function Feature({ title, Icon, description, to }: FeatureItem) {
  return (
    <Link to={to} className={clsx(styles.card, 'reveal')}>
      <span className={styles.cardIcon}>
        <Icon size={22} />
      </span>
      <Heading as="h3" className={styles.cardTitle}>
        {title}
      </Heading>
      <p className={styles.cardDesc}>{description}</p>
    </Link>
  );
}

export default function HomepageFeatures(): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);

  // Revelado sutil al entrar en viewport, sin plugins externos.
  useEffect(() => {
    const els = rootRef.current?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 20 });
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef}>
      <section className={styles.sections}>
        <VideoFondo src="/video/castillo-cea-dron-2.mp4" />
        <div className={styles.sectionsEscudo} aria-hidden="true" />
        <div className="container">
          <div className={clsx(styles.sectionHeader, 'reveal')}>
            <Heading as="h2" className={styles.sectionTitle}>
              Explora la memoria de Cea
            </Heading>
            <p className={styles.sectionSubtitle}>
              Tres caminos para recorrer mil años de historia.
            </p>
          </div>
          <div className={styles.grid}>
            {FeatureList.map((props) => (
              <Feature key={props.title} {...props} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.welcome}>
        <div className="container">
          <div className={clsx(styles.welcomeInner, 'reveal')}>
            <div className={styles.welcomeEscudo} aria-hidden="true" />
            <Heading as="h2" className={styles.welcomeTitle}>
              Un pueblo que guarda mil años entre sus piedras
            </Heading>
            <p className={styles.welcomeText}>
              En el corazón de la provincia de León, donde el río Cea serpentea entre campos
              dorados y colinas suaves, se alza un pueblo que conserva el testimonio vivo de
              generaciones que forjaron su destino en esta tierra de Castilla y León.
            </p>
            <p className={styles.welcomeText}>
              Este sitio nace del deseo de preservar la memoria colectiva, reuniendo relatos,
              documentos y tradiciones que han pasado de generación en generación.
            </p>
            <Link to="/docs/historia/intro" className={styles.welcomeLink}>
              Empezar por el principio
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
