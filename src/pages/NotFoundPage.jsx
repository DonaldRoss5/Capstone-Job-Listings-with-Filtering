import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <h1 className="not-found-page__title">Page not found</h1>
      <p className="not-found-page__description">
        The page you are looking for does not exist.
      </p>
      <Link className="not-found-page__action" to="/">
        Back to all jobs
      </Link>
    </section>
  );
}

export default NotFoundPage;
