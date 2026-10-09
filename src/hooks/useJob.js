import { useEffect, useState } from "react";
import { fetchJob } from "../lib/jobsApi";

export function useJob(id) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    fetchJob(id)
      .then((result) => {
        if (ignore) return;
        setJob(result);
        setLoading(false);
      })
      .catch((fetchError) => {
        if (ignore) return;
        setError(`Could not load this listing: ${fetchError.message}`);
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  return { job, loading, error };
}
