import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const modules = [
  { icon: '🔩', name: 'Viga', desc: 'Flexión, cortante y deflexión AISC F/G', href: '/docs/modulos/viga' },
  { icon: '🏗️', name: 'Columna', desc: 'Compresión axial AISC E', href: '/docs/modulos/columna' },
  { icon: '🌬️', name: 'Viento', desc: 'NSR-10 Título B — 1,117 municipios', href: '/docs/modulos/viento' },
  { icon: '📐', name: 'Cercha', desc: 'FEM 2D — Pratt, Warren, Howe', href: '/docs/modulos/cercha' },
  { icon: '🏛️', name: 'Pórtico', desc: 'FEM 2D — combinaciones LRFD', href: '/docs/modulos/portico' },
  { icon: '💰', name: 'Presupuesto', desc: 'Peso, materiales y mano de obra', href: '/docs/modulos/presupuesto' },
];

function HomepageHero() {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            ComandoCalc
          </Heading>
          <p className={styles.heroSubtitle}>
            Cálculo estructural de acero para ingenieros colombianos.<br />
            <strong>17 módulos</strong> · AISC 360-16 + NSR-10 · API REST · Exportación PDF
          </p>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              Leer documentación
            </Link>
            <Link className="button button--secondary button--lg" href="https://calculadora.comandoconstrucciones.com">
              Abrir la app →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function ModuleCard({ icon, name, desc, href }: typeof modules[0]) {
  return (
    <Link to={href} className={styles.moduleCard}>
      <div className={styles.moduleIcon}>{icon}</div>
      <div>
        <div className={styles.moduleName}>{name}</div>
        <div className={styles.moduleDesc}>{desc}</div>
      </div>
    </Link>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHero />
      <main>
        <section className={styles.modulesSection}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>Módulos destacados</Heading>
            <div className={styles.modulesGrid}>
              {modules.map(m => <ModuleCard key={m.name} {...m} />)}
            </div>
            <div className={styles.viewAll}>
              <Link to="/docs/modulos/viga">Ver todos los módulos →</Link>
            </div>
          </div>
        </section>

        <section className={styles.apiSection}>
          <div className="container">
            <div className={styles.apiContent}>
              <div>
                <Heading as="h2">API REST incluida</Heading>
                <p>Todos los cálculos están disponibles como endpoints JSON. Sin autenticación, sin costo.</p>
                <Link className="button button--outline button--primary" to="/docs/api/introduccion">
                  Ver referencia de API
                </Link>
              </div>
              <div className={styles.codeBlock}>
                <pre>{`curl -X POST \\
  https://api.comandoconstrucciones.com/api/calc/beam/optimal \\
  -H "Content-Type: application/json" \\
  -d '{
    "dead_load": 250,
    "live_load": 500,
    "span": 6.0,
    "profile_type": "ipe"
  }'`}</pre>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
