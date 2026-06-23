import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './colabora.module.css';

export default function ColaboraPage(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const email = (siteConfig.customFields?.contactEmail as string) ?? '';
  const mailto = `mailto:${email}?subject=${encodeURIComponent('Colaboración Historia de Cea')}`;

  return (
    <Layout
      title="Colabora · Historia de Cea"
      description="Envía fotos, documentos o recuerdos para enriquecer la historia de Cea. Proyecto sin ánimo de lucro.">
      <main className={styles.main}>
        <div className={`container ${styles.inner}`}>

          {/* Cabecera */}
          <header className={styles.header}>
            <span className={styles.kicker}>Proyecto sin ánimo de lucro</span>
            <Heading as="h1" className={styles.titulo}>
              Colabora con la historia de Cea
            </Heading>
            <p className={styles.subtitulo}>
              Este proyecto lo construimos entre todos. Si tienes fotografías antiguas,
              documentos, testimonios o simplemente recuerdas algo que merece ser contado,
              nos encantará incorporarlo — siempre con el crédito que te corresponde.
            </p>
          </header>

          {/* Tarjetas de qué puedes aportar */}
          <section className={styles.tarjetas} aria-label="Qué puedes aportar">
            <div className={styles.tarjeta}>
              <span className={styles.tarjetaIcono} aria-hidden="true">📷</span>
              <h2 className={styles.tarjetaTitulo}>Fotografías</h2>
              <p>Fotos del pueblo, del castillo, de fiestas, familias o paisajes de cualquier época. Cuanto más antiguas, más valiosas.</p>
            </div>
            <div className={styles.tarjeta}>
              <span className={styles.tarjetaIcono} aria-hidden="true">📄</span>
              <h2 className={styles.tarjetaTitulo}>Documentos</h2>
              <p>Cartas, escrituras, partidas, recortes de prensa, registros parroquiales o cualquier papel que guarde memoria del pueblo.</p>
            </div>
            <div className={styles.tarjeta}>
              <span className={styles.tarjetaIcono} aria-hidden="true">🗣️</span>
              <h2 className={styles.tarjetaTitulo}>Recuerdos y relatos</h2>
              <p>Historias familiares, anécdotas, leyendas locales o correcciones a lo ya publicado. Todo suma.</p>
            </div>
          </section>

          {/* Bloque de contacto — el email visible y clicable */}
          <section className={styles.contacto}>
            <div className={styles.contactoInner}>
              <div className={styles.contactoTextos}>
                <Heading as="h2" className={styles.contactoTitulo}>
                  Escríbenos
                </Heading>
                <p className={styles.contactoParrafo}>
                  Mándanos un email con lo que tengas — aunque sea una sola foto o una duda.
                  Respondemos a todo. El proyecto es completamente <strong>sin ánimo de lucro</strong>:
                  no hay publicidad, no hay venta de datos, solo historia.
                </p>
                <a className={styles.emailDisplay} href={mailto}>
                  <span className={styles.emailIcono} aria-hidden="true">✉</span>
                  {email}
                </a>
                <p className={styles.contactoNota}>
                  Pulsa la dirección para abrir tu cliente de correo, o cópiala directamente.
                </p>
              </div>
              <div className={styles.contactoCta}>
                <a className={`button button--lg ${styles.botonEnviar}`} href={mailto}>
                  Enviar un email ahora
                </a>
              </div>
            </div>
          </section>

          {/* Nota de privacidad */}
          <p className={styles.privacidad}>
            Tus materiales solo se usarán para enriquecer este sitio web de historia local.
            Nunca se cederán a terceros ni se usarán con fines comerciales.
            Si en algún momento quieres retirar algo que hayas compartido, basta con pedírnoslo.
          </p>

        </div>
      </main>
    </Layout>
  );
}
