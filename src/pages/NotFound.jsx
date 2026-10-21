import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="portfolio theme-portfolio">
      <main className="notfound">
        <p className="notfound__code">404</p>
        <h1 className="notfound__title">That page does not exist</h1>
        <p className="notfound__body">
          The link may be out of date. Both storefronts are one click away.
        </p>
        <div className="notfound__actions">
          <Link className="btn btn--primary" to="/urban-thread">
            Urban Thread
          </Link>
          <Link className="btn btn--outline" to="/pureglow">
            PureGlow
          </Link>
          <Link className="btn btn--ghost" to="/">
            Portfolio home
          </Link>
        </div>
      </main>
    </div>
  );
}
