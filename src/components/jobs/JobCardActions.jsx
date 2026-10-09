import { useState } from "react";
import { Link } from "react-router-dom";

export default function JobCardActions({ job, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleConfirm() {
    setDeleting(true);
    await onDelete(job);
    setDeleting(false);
    setConfirming(false);
  }

  if (confirming) {
    return (
      <div
        className="job-actions"
        role="group"
        aria-label={`Confirm deleting ${job.position}`}
      >
        <p className="job-actions__prompt">
          Delete this listing? This cannot be undone.
        </p>
        <button
          type="button"
          className="job-actions__button job-actions__button--danger"
          onClick={handleConfirm}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Yes, delete"}
        </button>
        <button
          type="button"
          className="job-actions__button"
          onClick={() => setConfirming(false)}
          disabled={deleting}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="job-actions">
      <Link
        className="job-actions__button"
        to={`/jobs/${job.id}/edit`}
        aria-label={`Edit ${job.position} at ${job.company}`}
      >
        Edit
      </Link>
      <button
        type="button"
        className="job-actions__button job-actions__button--danger"
        onClick={() => setConfirming(true)}
        aria-label={`Delete ${job.position} at ${job.company}`}
      >
        Delete
      </button>
    </div>
  );
}
