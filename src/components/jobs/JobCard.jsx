import { formatPostedAt } from "../../lib/formatPostedAt.js";
import { getJobTags } from "../../lib/jobTags.js";
import CompanyLogo from "./CompanyLogo.jsx";
import TagList from "./TagList.jsx";

function JobCard({ job, onTagSelect }) {
  const cardClass = job.is_featured
    ? "job-card job-card--featured"
    : "job-card";

  return (
    <article className={cardClass}>
      <CompanyLogo company={job.company} logoUrl={job.logo_url} />

      <div className="job-card__body">
        <div className="job-card__header">
          <p className="job-card__company">{job.company}</p>
          {job.is_new && (
            <span className="job-card__badge job-card__badge--new">New!</span>
          )}
          {job.is_featured && (
            <span className="job-card__badge job-card__badge--featured">
              Featured
            </span>
          )}
        </div>

        <h2 className="job-card__position">{job.position}</h2>

        <ul className="job-card__meta">
          <li>
            <time dateTime={job.created_at}>
              {formatPostedAt(job.created_at)}
            </time>
          </li>
          <li>{job.contract}</li>
          <li>{job.location}</li>
        </ul>
      </div>

      <TagList tags={getJobTags(job)} onSelect={onTagSelect} />
    </article>
  );
}

export default JobCard;
