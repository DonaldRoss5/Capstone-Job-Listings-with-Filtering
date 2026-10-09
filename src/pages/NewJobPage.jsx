import { useNavigate } from "react-router-dom";
import JobForm from "../components/jobs/JobForm";
import { createJob } from "../lib/jobsApi";
import { emptyJobValues } from "../lib/jobForm";

export default function NewJobPage() {
  const navigate = useNavigate();

  async function handleSubmit(payload) {
    await createJob(payload);
    navigate("/", { state: { message: "Job listing created." } });
  }

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">Post a job</h1>
        <p className="page__description">
          Fill in the details. Anyone can see your listing, and only you can
          change it.
        </p>
      </header>

      <JobForm
        initialValues={emptyJobValues}
        submitLabel="Create listing"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
