import JobList from "../components/jobs/JobList.jsx";
import { useJobs } from "../hooks/useJobs.js";

function HomePage() {
  const { jobs, loading, error, reload } = useJobs();

  return (
    <section className="page">
      <header className="page__header">
        <h1 className="page__title">Find your next developer role</h1>
        <p className="page__description">
          Browse open positions. Sign in to post and manage your own listings.
        </p>
      </header>

      <JobList jobs={jobs} loading={loading} error={error} onRetry={reload} />
    </section>
  );
}

export default HomePage;
