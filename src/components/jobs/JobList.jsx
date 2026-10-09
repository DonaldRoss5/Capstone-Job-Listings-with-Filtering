import JobCard from "./JobCard.jsx";

function JobList({
  jobs,
  loading,
  error,
  onRetry,
  onTagSelect,
  renderActions,
  emptyTitle = "No job listings yet",
  emptyMessage = "Check back soon for new roles.",
}) {
  if (loading) {
    return (
      <div className="loading-state" role="status">
        <span className="spinner-border spinner-border-sm" aria-hidden="true" />
        <span>Loading job listings...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p className="error-text" role="alert">
          {error}
        </p>
        {onRetry && (
          <button
            className="error-state__retry"
            type="button"
            onClick={onRetry}
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="empty-state">
        <strong>{emptyTitle}</strong>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className="job-list">
      {jobs.map((job) => (
        <li className="job-list__item" key={job.id}>
          <JobCard
            job={job}
            onTagSelect={onTagSelect}
            actions={renderActions ? renderActions(job) : null}
          />
        </li>
      ))}
    </ul>
  );
}

export default JobList;
