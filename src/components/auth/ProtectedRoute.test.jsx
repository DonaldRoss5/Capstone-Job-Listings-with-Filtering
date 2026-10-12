import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { useAuth } from "../../hooks/useAuth.js";
import ProtectedRoute from "./ProtectedRoute.jsx";

vi.mock("../../hooks/useAuth.js", () => ({
  useAuth: vi.fn(),
}));

function renderRoute() {
  return render(
    <MemoryRouter initialEntries={["/jobs/new"]}>
      <Routes>
        <Route path="/login" element={<p>Login page</p>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/jobs/new" element={<p>New job page</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe("ProtectedRoute", () => {
  it("redirects signed-out visitors to the login page", () => {
    useAuth.mockReturnValue({ user: null, loading: false });
    renderRoute();

    expect(screen.getByText("Login page")).toBeInTheDocument();
    expect(screen.queryByText("New job page")).not.toBeInTheDocument();
  });

  it("shows the protected page to a signed-in user", () => {
    useAuth.mockReturnValue({ user: { id: "u1" }, loading: false });
    renderRoute();

    expect(screen.getByText("New job page")).toBeInTheDocument();
  });

  it("shows a loading message while the session is checked", () => {
    useAuth.mockReturnValue({ user: null, loading: true });
    renderRoute();

    expect(screen.getByRole("status")).toHaveTextContent(
      "Checking your session",
    );
    expect(screen.queryByText("Login page")).not.toBeInTheDocument();
  });
});
