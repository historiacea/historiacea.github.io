import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  emoji?: string;
  description: JSX.Element;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: '📚 Historia de Cea',
    emoji: '📚',
    description: (
      <>
        Explora la historia completa del pueblo de Cea desde sus orígenes geológicos 
        hasta nuestros días, organizada en 8 partes y 35 capítulos.
      </>
    ),
    link: '/docs/historia/intro',
  },
  {
    title: '🏰 Torre y Castillo',
    emoji: '🏰',
    description: (
      <>
        Descubre la emblemática Torre de Cea y sus elementos arquitectónicos, 
        símbolo del poder señorial medieval en la comarca.
      </>
    ),
    link: '/docs/castillo/torre',
  },
  {
    title: '📜 Cronología',
    emoji: '📜',
    description: (
      <>
        Explora los eventos más importantes de la historia de Cea organizados 
        cronológicamente desde la cultura vaccea hasta nuestros días.
      </>
    ),
    link: '/blog',
  },
];

function Feature({title, emoji, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className="text--center">
          <div className={styles.featureIcon}>
            {emoji && <span className={styles.emoji}>{emoji}</span>}
          </div>
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
          <a href={link} className="button button--primary">
            Ver más
          </a>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <div className="text--center margin-bottom--lg">
              <Heading as="h2">🗂️ Secciones del Sitio</Heading>
              <p className="hero__subtitle">
                Descubre la rica historia de Cea a través de diferentes perspectivas
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        
        <div className="row margin-top--lg">
          <div className="col col--12">
            <div className="text--center">
              <Heading as="h2">🏘️ Bienvenidos a la Historia de Cea</Heading>
              <p>
                En el corazón de la provincia de León, donde el río Cea serpentea entre campos 
                dorados y colinas suaves, se alza un pueblo que guarda entre sus piedras más de 
                mil años de historia. <strong>Cea</strong> no es solo un nombre en el mapa: es el 
                testimonio vivo de generaciones que forjaron su destino en esta tierra de Castilla y León.
              </p>
              <p>
                Este sitio web nace del amor por preservar la memoria colectiva, reuniendo relatos, 
                documentos y tradiciones que han pasado de generación en generación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}