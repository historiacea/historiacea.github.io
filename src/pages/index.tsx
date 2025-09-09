import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(titleRef.current, {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: "power3.out"
    })
    .from(subtitleRef.current, {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: "power2.out"
    }, "-=0.5")
    .from(heroImageRef.current, {
      duration: 1,
      scale: 0.8,
      opacity: 0,
      ease: "back.out(1.7)"
    }, "-=0.3")
    .from(buttonsRef.current?.children, {
      duration: 0.6,
      y: 30,
      opacity: 0,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.2");
  }, []);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className="hero__title" ref={titleRef}>
              {siteConfig.title}
            </Heading>
            <p className="hero__subtitle" ref={subtitleRef}>{siteConfig.tagline}</p>
            <div className={styles.buttons} ref={buttonsRef}>
              <Link
                className="button button--secondary button--lg"
                to="/blog">
                📜 Ver cronología
              </Link>
              <Link
                className="button button--primary button--lg"
                to="/docs/historia/intro">
                🏛️ Comenzar el recorrido
              </Link>
            </div>
          </div>
          <div className={styles.heroImage} ref={heroImageRef}>
            <img src="/img/cea-historic.png" alt="Vista histórica de Cea" className={styles.heroImg} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Inicio"
      description="Un viaje fascinante a través de los siglos por la historia del pueblo de Cea, desde sus orígenes geológicos hasta nuestros días">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}