import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }

    setSubmitting(true);
    setError("");

    const { error: signInError } = await signIn(email.trim(), password);

    if (signInError) {
      setError(signInError.message);
      setSubmitting(false);
      return;
    }

    navigate(redirectTo, { replace: true });
  }

  return (
    <div className="login-page">
      <h1 className="login-page__title">Sign in</h1>
      <p className="login-page__description">
        Sign in to post and manage your own listings.
      </p>

      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <div className="login-form__field">
          <label className="login-form__label" htmlFor="email">
            Email
          </label>
          <input
            className="login-form__input"
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="login-form__field">
          <label className="login-form__label" htmlFor="password">
            Password
          </label>
          <input
            className="login-form__input"
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {error && (
          <p className="error-text" role="alert">
            {error}
          </p>
        )}

        <button
          className="login-form__submit"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
