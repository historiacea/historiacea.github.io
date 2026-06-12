import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CronologiaTimeline from '@site/src/components/CronologiaTimeline';
import styles from './cronologia.module.css';

export default function Cronologia(): JSX.Element {
  return (
    <Layout
      title="Cronología"
      description="Recorre en una línea temporal interactiva los hitos decisivos de la historia de Cea, desde la cultura vaccea hasta el siglo XXI.">
      <header className={styles.head}>
        <div className="container">
          <span className={styles.kicker}>Mil años en una línea</span>
          <Heading as="h1" className={styles.title}>
            Cronología de Cea
          </Heading>
          <p className={styles.lead}>
            Desplázate por el tiempo. Cada hito te lleva al capítulo donde se cuenta la historia
            completa; los marcados en rojo son los momentos que cambiaron el rumbo de la villa.
          </p>
        </div>
      </header>
      <main className="container">
        <CronologiaTimeline />
      </main>
    </Layout>
  );
}
