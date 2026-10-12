import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FilterBar from "../components/jobs/FilterBar.jsx";
import JobCardActions from "../components/jobs/JobCardActions.jsx";
import JobList from "../components/jobs/JobList.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useJobs } from "../hooks/useJobs.js";
import { filterJobs } from "../lib/filterJobs.js";
import { deleteJob } from "../lib/jobsApi.js";

function HomePage() {
  const { jobs, loading, error, reload } = useJobs();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(location.state?.message ?? "");
  const [actionError, setActionError] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (location.state?.message) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate]);

  const visibleJobs = filterJobs(jobs, selectedTags);
  const isFiltering = selectedTags.length > 0;

  function handleTagSelect(tag) {
    setSelectedTags((current) =>
      current.includes(tag) ? current : [...current, tag],
    );
  }

  function handleTagRemove(tag) {
    setSelectedTags((current) => current.filter((item) => item !== tag));
  }

  function handleClear() {
    setSelectedTags([]);
  }

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

      <FilterBar
        selectedTags={selectedTags}
        onRemove={handleTagRemove}
        onClear={handleClear}
      />

      {isFiltering && !loading && !error && (
        <p className="filter-summary" aria-live="polite">
          Showing {visibleJobs.length} of {jobs.length} listings
        </p>
      )}

      <JobList
        jobs={visibleJobs}
        loading={loading}
        error={error}
        onRetry={reload}
        onTagSelect={handleTagSelect}
        renderActions={renderActions}
        emptyTitle={
          isFiltering ? "No jobs match these filters" : "No job listings yet"
        }
        emptyMessage={
          isFiltering
            ? "Remove a filter or clear all to see more listings."
            : "Check back soon for new roles."
        }
      />
    </section>
  );
}

export default HomePage;
