import { Link, Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <Link className="app-header__brand" to="/">
            Job Listings
          </Link>
          <nav className="main-nav" aria-label="Main navigation">
            <Link className="main-nav__link" to="/">
              Jobs
            </Link>
            <Link className="main-nav__link main-nav__link--cta" to="/login">
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <p>Job Listings - React, Vite and Supabase</p>
      </footer>
    </div>
  );
}

export default AppLayout;
