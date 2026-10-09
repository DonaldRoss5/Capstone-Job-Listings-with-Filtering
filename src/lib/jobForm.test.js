import { describe, expect, it } from "vitest";
import { emptyJobValues, toPayload, validateJobValues } from "./jobForm.js";

const validValues = {
  ...emptyJobValues,
  company: "Northstar Labs",
  position: "Frontend Developer",
  location: "Remote",
};

describe("validateJobValues", () => {
  it("reports the required fields on an empty form", () => {
    const errors = validateJobValues(emptyJobValues);

    expect(errors.company).toBeDefined();
    expect(errors.position).toBeDefined();
    expect(errors.location).toBeDefined();
  });

  it("accepts valid values", () => {
    expect(validateJobValues(validValues)).toEqual({});
  });

  it("rejects a logo URL that is not http or https", () => {
    const errors = validateJobValues({ ...validValues, logo_url: "logo.png" });

    expect(errors.logo_url).toBeDefined();
  });

  it("accepts an empty logo URL", () => {
    expect(validateJobValues({ ...validValues, logo_url: "" })).toEqual({});
  });
});

describe("toPayload", () => {
  it("trims text, splits lists and turns an empty logo into null", () => {
    const payload = toPayload({
      ...validValues,
      company: "  Northstar Labs  ",
      languages: "JavaScript,  Python , ",
      tools: "React",
    });

    expect(payload.company).toBe("Northstar Labs");
    expect(payload.languages).toEqual(["JavaScript", "Python"]);
    expect(payload.tools).toEqual(["React"]);
    expect(payload.logo_url).toBeNull();
  });
});
