import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AppLayout() {
  const { user, loading, signOut } = useAuth();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <Link className="app-header__brand" to="/">
            Job Listings
          </Link>

          <nav className="main-nav" aria-label="Main">
            <NavLink className="main-nav__link" to="/" end>
              Jobs
            </NavLink>

            {!loading && user && (
              <>
                <NavLink className="main-nav__link" to="/jobs/new">
                  Post a job
                </NavLink>
                <span className="main-nav__user">{user.email}</span>
                <button
                  type="button"
                  className="main-nav__link main-nav__link--cta"
                  onClick={signOut}
                >
                  Sign out
                </button>
              </>
            )}

            {!loading && !user && (
              <NavLink
                className="main-nav__link main-nav__link--cta"
                to="/login"
              >
                Sign in
              </NavLink>
            )}
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        Job Listings - React, Vite and Supabase
      </footer>
    </div>
  );
}
