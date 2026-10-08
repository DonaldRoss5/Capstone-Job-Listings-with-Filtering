import { useState } from "react";

/**
 * Shows the company logo, or a placeholder with the company's initials
 * when there is no logo URL or the image fails to load.
 */
function CompanyLogo({ company, logoUrl }) {
  const [failed, setFailed] = useState(false);

  if (logoUrl && !failed) {
    return (
      <img
        className="company-logo"
        src={logoUrl}
        alt=""
        width="64"
        height="64"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span className="company-logo company-logo--placeholder" aria-hidden="true">
      {company.trim().charAt(0).toUpperCase()}
    </span>
  );
}

export default CompanyLogo;
