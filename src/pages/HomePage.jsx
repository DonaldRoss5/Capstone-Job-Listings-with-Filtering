import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import JobCardActions from "../components/jobs/JobCardActions.jsx";
import JobList from "../components/jobs/JobList.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useJobs } from "../hooks/useJobs.js";
import { deleteJob } from "../lib/jobsApi.js";

function HomePage() {
  const { jobs, loading, error, reload } = useJobs();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(location.state?.message ?? "");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate]);

  async function handleDelete(job) {
    setActionError("");
    setNotice("");

    try {
      await deleteJob(job.id);
      setNotice("Job listing deleted.");
      await reload();
    } catch (deleteError) {
      setActionError(deleteError.message);
    }
  }

  function renderActions(job) {
    if (!user || job.user_id !== user.id) {
      return null;
    }

    return <JobCardActions job={job} onDelete={handleDelete} />;
  }

  return (
    <section className="page">
      <header className="page__header">
        <h1 className="page__title">Find your next developer role</h1>
        <p className="page__description">
          Browse open positions. Sign in to post and manage your own listings.
        </p>
      </header>

      {notice && (
        <div className="notice" role="status">
          <span>{notice}</span>
          <button
            className="notice__dismiss"
            type="button"
            onClick={() => setNotice("")}
          >
            Dismiss
          </button>
        </div>
      )}

      {actionError && (
        <p className="error-text" role="alert">
          {actionError}
        </p>
      )}

      <JobList
        jobs={jobs}
        loading={loading}
        error={error}
        onRetry={reload}
        renderActions={renderActions}
      />
    </section>
  );
}

export default HomePage;
