import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { emptyJobValues } from "../../lib/jobForm.js";
import JobForm from "./JobForm.jsx";

function renderForm(onSubmit) {
  return render(
    <MemoryRouter>
      <JobForm
        initialValues={emptyJobValues}
        submitLabel="Create listing"
        onSubmit={onSubmit}
      />
    </MemoryRouter>,
  );
}

describe("JobForm", () => {
  it("shows validation errors and does not submit an empty form", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderForm(onSubmit);

    await user.click(screen.getByRole("button", { name: "Create listing" }));

    expect(
      screen.getByText("Company must be between 2 and 100 characters."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Position must be between 2 and 150 characters."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Location must be between 2 and 100 characters."),
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits a clean payload when the form is valid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderForm(onSubmit);

    await user.type(screen.getByLabelText("Company"), "Northstar Labs");
    await user.type(screen.getByLabelText("Position"), "Frontend Developer");
    await user.type(screen.getByLabelText("Location"), "Remote");
    await user.type(screen.getByLabelText("Languages"), "JavaScript, Python");
    await user.click(screen.getByRole("button", { name: "Create listing" }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        company: "Northstar Labs",
        position: "Frontend Developer",
        location: "Remote",
        languages: ["JavaScript", "Python"],
        logo_url: null,
      }),
    );
  });
});
