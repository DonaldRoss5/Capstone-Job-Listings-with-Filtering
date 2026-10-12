import { describe, expect, it } from "vitest";
import { filterJobs } from "./filterJobs.js";

const jobs = [
  {
    id: 1,
    role: "Frontend",
    level: "Senior",
    languages: ["JavaScript", "Python"],
    tools: ["React"],
  },
  {
    id: 2,
    role: "Frontend",
    level: "Junior",
    languages: ["JavaScript"],
    tools: ["Sass"],
  },
  {
    id: 3,
    role: "Backend",
    level: "Senior",
    languages: ["Python"],
    tools: ["Django"],
  },
];

const ids = (list) => list.map((job) => job.id);

describe("filterJobs", () => {
  it("returns every job when no tags are selected", () => {
    expect(ids(filterJobs(jobs, []))).toEqual([1, 2, 3]);
  });

  it("keeps jobs that have the selected tag", () => {
    expect(ids(filterJobs(jobs, ["Python"]))).toEqual([1, 3]);
  });

  it("requires a job to match every selected tag", () => {
    expect(ids(filterJobs(jobs, ["Frontend", "Senior"]))).toEqual([1]);
    expect(ids(filterJobs(jobs, ["JavaScript", "Python"]))).toEqual([1]);
  });

  it("returns an empty list when no job matches all tags", () => {
    expect(filterJobs(jobs, ["Backend", "Junior"])).toEqual([]);
  });
});
