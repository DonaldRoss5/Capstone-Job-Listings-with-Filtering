/** Every tag a visitor can filter by: role, level, languages and tools. */
function getJobTags(job) {
  return [job.role, job.level, ...(job.languages ?? []), ...(job.tools ?? [])];
}

export { getJobTags };
