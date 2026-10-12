// Checks Row Level Security with two real accounts, using authenticated
// client requests (not the SQL Editor or Table Editor).
// Passwords are typed when the script runs. They are never stored or printed.
import process from "node:process";
import readline from "node:readline/promises";
import { execSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) {
  console.error(
    "Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env.local",
  );
  process.exit(1);
}

const sampleJob = {
  company: "RLS Check Co",
  position: "Temporary test listing",
  role: "Frontend",
  level: "Junior",
  contract: "Full Time",
  location: "Remote",
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

async function askHidden(prompt) {
  process.stdout.write(prompt);
  execSync("stty -echo", { stdio: "inherit" });
  try {
    return await rl.question("");
  } finally {
    execSync("stty echo", { stdio: "inherit" });
    process.stdout.write("\n");
  }
}

const newClient = () =>
  createClient(url, key, { auth: { persistSession: false } });
const results = [];

function check(name, pass) {
  results.push(pass);
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}`);
}

async function signIn(label) {
  const email = await rl.question(`${label} email: `);
  const password = await askHidden(`${label} password: `);
  const client = newClient();
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(`${label} sign-in failed`);
  return { client, userId: data.user.id };
}

let a;
let b;
let jobId;

try {
  a = await signIn("Account A");
  b = await signIn("Account B");
  const anon = newClient();

  const created = await a.client
    .from("job_listings")
    .insert(sampleJob)
    .select()
    .single();
  check("A can create a listing", !created.error);
  jobId = created.data?.id;
  if (!jobId)
    throw new Error(
      `Could not create the test listing: ${created.error?.message}`,
    );

  const upd = await b.client
    .from("job_listings")
    .update({ position: "Changed by B" })
    .eq("id", jobId)
    .select();
  check(
    "B cannot update the listing owned by A",
    !!upd.error || upd.data.length === 0,
  );

  const del = await b.client
    .from("job_listings")
    .delete()
    .eq("id", jobId)
    .select();
  check(
    "B cannot delete the listing owned by A",
    !!del.error || del.data.length === 0,
  );

  const forged = await b.client
    .from("job_listings")
    .insert({ ...sampleJob, user_id: a.userId })
    .select();
  check("B cannot insert a row owned by A", !!forged.error);

  const anonInsert = await anon.from("job_listings").insert(sampleJob).select();
  check("Anonymous insert is rejected", !!anonInsert.error);

  const anonRead = await anon.from("job_listings").select("id").eq("id", jobId);
  check(
    "Anonymous visitors can read listings",
    !anonRead.error && anonRead.data.length === 1,
  );

  const after = await a.client
    .from("job_listings")
    .select("position")
    .eq("id", jobId)
    .single();
  check(
    "A listing is unchanged after B attempts",
    after.data?.position === sampleJob.position,
  );
} catch (err) {
  console.error(`Stopped: ${err.message}`);
  results.push(false);
} finally {
  if (a && jobId) {
    const cleanup = await a.client
      .from("job_listings")
      .delete()
      .eq("id", jobId)
      .select();
    check(
      "A can delete own listing (cleanup)",
      !cleanup.error && cleanup.data.length === 1,
    );
  }
  rl.close();
}

console.log(
  results.every(Boolean) ? "\nAll checks passed." : "\nSome checks failed.",
);
process.exit(results.every(Boolean) ? 0 : 1);
