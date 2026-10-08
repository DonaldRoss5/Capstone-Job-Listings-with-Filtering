import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

/**
 * Loads every job listing from Supabase, newest first.
 * Anyone can read listings, so this works while signed out.
 */
function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = useCallback(async () => {
    const { data, error: fetchError } = await supabase
      .from("job_listings")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setJobs([]);
      setError(`Could not load job listings: ${fetchError.message}`);
    } else {
      setJobs(data ?? []);
      setError("");
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const loadJobs = async () => {
      await fetchJobs();
    };

    loadJobs();
  }, [fetchJobs]);

  /** Shows the loading state and loads the listings again. */
  const reload = useCallback(async () => {
    setLoading(true);
    await fetchJobs();
  }, [fetchJobs]);

  return { jobs, loading, error, reload };
}

export { useJobs };
