import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

type Props = {
  /** Versión reducida para pies de página de capítulos. */
  compact?: boolean;
  /** Texto opcional que sustituye al mensaje por defecto. */
  texto?: string;
};

/**
 * Llamada a colaborar. El email sale de customFields.contactEmail en
 * docusaurus.config.ts: cambiarlo allí lo actualiza en todo el sitio.
 */
export default function Colaborar({ compact = false, texto }: Props): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const email = (siteConfig.customFields?.contactEmail as string) ?? '';
  const mailto = `mailto:${email}?subject=${encodeURIComponent('Colaboración Historia de Cea')}`;

  if (compact) {
    return (
      <aside className={styles.compact}>
        <span aria-hidden="true" className={styles.icono}>✉️</span>
        <span>
          ¿Tienes <strong>fotos, documentos o recuerdos</strong> que completen esta historia?{' '}
          <a href={mailto}>Escríbenos y colabora</a> — este proyecto lo construimos entre todos.
        </span>
      </aside>
    );
  }

  return (
    <section className={styles.banner}>
      <div className={styles.bannerInner}>
        <img
          src="/img/logo-icono.png"
          alt=""
          aria-hidden="true"
          className={styles.iconoGrande}
        />
        <div className={styles.textos}>
          <h3 className={styles.titulo}>Colabora con la historia de Cea</h3>
          <p className={styles.parrafo}>
            {texto ??
              'Este proyecto, sin ánimo de lucro, lo construimos entre todos. Si tienes fotos antiguas, documentos, recuerdos o correcciones, nos encantará incorporarlos con su debido crédito.'}
          </p>
        </div>
        <a className={`button button--primary ${styles.boton}`} href={mailto}>
          Enviar un email
        </a>
      </div>
    </section>
  );
}
