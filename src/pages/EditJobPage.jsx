import { Link, useNavigate, useParams } from "react-router-dom";
import JobForm from "../components/jobs/JobForm";
import { useAuth } from "../hooks/useAuth";
import { useJob } from "../hooks/useJob";
import { fromJob } from "../lib/jobForm";
import { updateJob } from "../lib/jobsApi";

export default function EditJobPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { job, loading, error } = useJob(id);

  async function handleSubmit(payload) {
    await updateJob(id, payload);
    navigate("/", { state: { message: "Job listing updated." } });
  }

  if (loading) {
    return (
      <div className="loading-state" role="status">
        <span className="spinner-border spinner-border-sm" aria-hidden="true" />
        <span>Loading listing...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p className="error-text" role="alert">
          {error}
        </p>
        <Link to="/">Back to jobs</Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="empty-state">
        <strong>Listing not found</strong>
        <p>It may have been deleted.</p>
        <Link to="/">Back to jobs</Link>
      </div>
    );
  }

  if (job.user_id !== user.id) {
    return (
      <div className="error-state">
        <p className="error-text" role="alert">
          You can only edit your own listings.
        </p>
        <Link to="/">Back to jobs</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">Edit job</h1>
        <p className="page__description">
          {job.position} at {job.company}
        </p>
      </header>

      <JobForm
        initialValues={fromJob(job)}
        submitLabel="Save changes"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
