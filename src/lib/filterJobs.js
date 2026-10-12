import { getJobTags } from "./jobTags.js";

export function filterJobs(jobs, selectedTags) {
  if (selectedTags.length === 0) {
    return jobs;
  }

  return jobs.filter((job) => {
    const jobTags = getJobTags(job);
    return selectedTags.every((tag) => jobTags.includes(tag));
  });
}
