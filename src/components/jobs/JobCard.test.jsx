import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import JobCard from "./JobCard.jsx";

const job = {
  id: "1",
  company: "Northstar Labs",
  logo_url: null,
  position: "Frontend Developer",
  role: "Frontend",
  level: "Senior",
  contract: "Full Time",
  location: "Remote",
  languages: ["JavaScript"],
  tools: ["React"],
  is_new: true,
  is_featured: true,
  created_at: new Date().toISOString(),
};

describe("JobCard", () => {
  it("shows the company, position and both badges", () => {
    render(<JobCard job={job} />);

    expect(screen.getByText("Northstar Labs")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Frontend Developer" }),
    ).toBeInTheDocument();
    expect(screen.getByText("New!")).toBeInTheDocument();
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("calls onTagSelect when a tag is clicked", async () => {
    const user = userEvent.setup();
    const onTagSelect = vi.fn();
    render(<JobCard job={job} onTagSelect={onTagSelect} />);

    await user.click(screen.getByRole("button", { name: "JavaScript" }));

    expect(onTagSelect).toHaveBeenCalledWith("JavaScript");
  });
});
