import { Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import { urbanThread } from '../stores/urbanThread';
import { pureGlow } from '../stores/pureGlow';

const YEAR = new Date().getFullYear();

const REPO_URL = 'https://github.com/VivekShukla04/ecommerce-storefront-portfolio';

const CAPABILITIES = [
  {
    title: 'Search & category filtering',
    body: 'Live search across titles, categories and descriptions, combined with category chips that report counts.',
  },
  {
    title: 'Product detail pages',
    body: 'Every item has its own route with gallery imagery, materials, care notes, variants and related products.',
  },
  {
    title: 'Working cart',
    body: 'Add, remove and adjust quantities with live subtotal, shipping threshold and tax maths, persisted per store.',
  },
  {
    title: 'Demo checkout',
    body: 'A full checkout flow that validates input and shows a confirmation — deliberately processing no payment.',
  },
  {
    title: 'Resilient imagery',
    body: 'Loading skeletons and a branded fallback mean a slow or failed image never breaks the layout.',
  },
  {
    title: 'Responsive by default',
    body: 'Fluid grids, a mobile navigation drawer and accessible focus states across desktop, tablet and phone.',
  },
];

const STACK = ['React 19', 'Vite', 'React Router', 'CSS custom properties', 'ES Modules'];

export default function PortfolioHome() {
  return (
    <div className="portfolio theme-portfolio">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="portfolio__header">
        <div className="portfolio__header-inner">
          <span className="portfolio__mark">
            <span aria-hidden="true">◈</span> Storefront Portfolio
          </span>
          <nav className="portfolio__nav" aria-label="Portfolio navigation">
            <a href="#demos">Demos</a>
            <a href="#build">What I built</a>
            <a href="#stack">Stack</a>
            <a href={REPO_URL} target="_blank" rel="noreferrer">
              Source code
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="portfolio-hero">
          <p className="portfolio-hero__eyebrow">E-commerce front-end portfolio</p>
          <h1 className="portfolio-hero__title">
            Two complete storefronts, one shared component library.
          </h1>
          <p className="portfolio-hero__body">
            I built a premium fashion store and a skincare store as two distinct sections of a single
            responsive application. Both are fully navigable demos — product discovery, filtering,
            product pages, a working bag and a demo checkout — with no backend and no placeholder
            interactions.
          </p>
          <div className="portfolio-hero__actions">
            <a className="btn btn--primary" href="#demos">
              Explore the demos
            </a>
            <a className="btn btn--outline" href={REPO_URL} target="_blank" rel="noreferrer">
              View the source on GitHub
            </a>
          </div>
        </section>

        <section className="demos" id="demos">
          <h2 className="section__title">The storefronts</h2>
          <div className="demo-grid">
            <article className="demo-card">
              <Link
                to="/urban-thread"
                className="demo-card__media"
                aria-label={`Open the ${urbanThread.name} storefront`}
              >
                <ProductImage
                  src={urbanThread.hero.image}
                  alt={`${urbanThread.name} storefront`}
                  fallbackLabel="U"
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </Link>
              <div className="demo-card__body">
                <p className="demo-card__eyebrow">{urbanThread.tagline}</p>
                <h3 className="demo-card__title">
                  <Link to="/urban-thread">{urbanThread.name}</Link>
                </h3>
                <p className="demo-card__text">{urbanThread.description}</p>
                <ul className="demo-card__meta">
                  <li>{urbanThread.products.length} products</li>
                  <li>{urbanThread.categories.length} categories</li>
                  <li>Editorial serif identity</li>
                </ul>
                <Link className="btn btn--primary btn--sm" to="/urban-thread">
                  Open Urban Thread
                </Link>
              </div>
            </article>

            <article className="demo-card">
              <Link
                to="/pureglow"
                className="demo-card__media"
                aria-label={`Open the ${pureGlow.name} storefront`}
              >
                <ProductImage
                  src={pureGlow.hero.image}
                  alt={`${pureGlow.name} storefront`}
                  fallbackLabel="P"
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </Link>
              <div className="demo-card__body">
                <p className="demo-card__eyebrow">{pureGlow.tagline}</p>
                <h3 className="demo-card__title">
                  <Link to="/pureglow">{pureGlow.name}</Link>
                </h3>
                <p className="demo-card__text">{pureGlow.description}</p>
                <ul className="demo-card__meta">
                  <li>{pureGlow.products.length} products</li>
                  <li>{pureGlow.categories.length} categories</li>
                  <li>Clean clinical identity</li>
                </ul>
                <Link className="btn btn--primary btn--sm" to="/pureglow">
                  Open PureGlow
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section className="build" id="build">
          <h2 className="section__title">What I implemented</h2>
          <div className="build__grid">
            {CAPABILITIES.map((item) => (
              <article key={item.title} className="build-card">
                <h3 className="build-card__title">{item.title}</h3>
                <p className="build-card__body">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="stack" id="stack">
          <h2 className="section__title">Built with</h2>
          <ul className="stack__list">
            {STACK.map((item) => (
              <li key={item} className="stack__chip">
                {item}
              </li>
            ))}
          </ul>
          <p className="stack__note">
            Static build with no server, no database and no paid services — deployable to any
            static host, including Vercel, Netlify and GitHub Pages.
          </p>
        </section>

        <section className="limits">
          <h2 className="section__title">Honest limitations</h2>
          <ul className="limits__list">
            <li>
              These are original portfolio demos built for this portfolio. They are not stores I have
              managed for clients and they have no sales history.
            </li>
            <li>
              The checkout is a simulation. No payment provider is integrated and no order is ever
              created.
            </li>
            <li>
              Product copy, prices and review counts are fictional sample data; product photography is
              licensed stock imagery used for demonstration.
            </li>
            <li>
              Cart contents persist in the browser only, so clearing site data resets the demo.
            </li>
          </ul>
        </section>
      </main>

      <footer className="portfolio__footer">
        <p>
          Built with React, Vite and hand-written CSS. &copy; {YEAR} Storefront Portfolio.
        </p>
        <p>
          <a href={REPO_URL} target="_blank" rel="noreferrer">
            github.com/VivekShukla04/ecommerce-storefront-portfolio
          </a>
        </p>
      </footer>
    </div>
  );
}
