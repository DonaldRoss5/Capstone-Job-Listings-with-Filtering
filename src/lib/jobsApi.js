import { supabase } from "./supabaseClient";

export async function fetchJob(id) {
  const { data, error } = await supabase
    .from("job_listings")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}

export async function createJob(values) {
  const { data, error } = await supabase
    .from("job_listings")
    .insert(values)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateJob(id, values) {
  const { data, error } = await supabase
    .from("job_listings")
    .update(values)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  if (!data || data.length === 0) {
    throw new Error("You can only change your own listings.");
  }
  return data[0];
}

export async function deleteJob(id) {
  const { data, error } = await supabase
    .from("job_listings")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  if (!data || data.length === 0) {
    throw new Error("You can only delete your own listings.");
  }
}
