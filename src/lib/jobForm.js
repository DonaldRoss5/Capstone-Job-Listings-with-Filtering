export const ROLES = ["Frontend", "Backend", "Fullstack"];
export const LEVELS = ["Junior", "Midweight", "Senior"];
export const CONTRACTS = ["Full Time", "Part Time", "Contract"];

export const emptyJobValues = {
  company: "",
  logo_url: "",
  position: "",
  role: "Frontend",
  level: "Junior",
  contract: "Full Time",
  location: "",
  languages: "",
  tools: "",
  is_new: false,
  is_featured: false,
};

function parseList(text) {
  return text
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function lengthError(value, min, max, label) {
  const length = value.trim().length;
  if (length < min || length > max) {
    return `${label} must be between ${min} and ${max} characters.`;
  }
  return "";
}

export function validateJobValues(values) {
  const errors = {};

  const companyError = lengthError(values.company, 2, 100, "Company");
  if (companyError) errors.company = companyError;

  const positionError = lengthError(values.position, 2, 150, "Position");
  if (positionError) errors.position = positionError;

  const locationError = lengthError(values.location, 2, 100, "Location");
  if (locationError) errors.location = locationError;

  const logo = values.logo_url.trim();
  if (logo && !/^https?:\/\/\S+$/i.test(logo)) {
    errors.logo_url = "Enter a link that starts with http:// or https://.";
  }

  if (!ROLES.includes(values.role)) errors.role = "Choose a role.";
  if (!LEVELS.includes(values.level)) errors.level = "Choose a level.";
  if (!CONTRACTS.includes(values.contract)) {
    errors.contract = "Choose a contract type.";
  }

  return errors;
}

export function toPayload(values) {
  return {
    company: values.company.trim(),
    logo_url: values.logo_url.trim() || null,
    position: values.position.trim(),
    role: values.role,
    level: values.level,
    contract: values.contract,
    location: values.location.trim(),
    languages: parseList(values.languages),
    tools: parseList(values.tools),
    is_new: values.is_new,
    is_featured: values.is_featured,
  };
}

export function fromJob(job) {
  return {
    company: job.company,
    logo_url: job.logo_url ?? "",
    position: job.position,
    role: job.role,
    level: job.level,
    contract: job.contract,
    location: job.location,
    languages: (job.languages ?? []).join(", "),
    tools: (job.tools ?? []).join(", "),
    is_new: job.is_new,
    is_featured: job.is_featured,
  };
}
