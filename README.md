- setup instructions

1. Clone and install: bash git clone https://github.com/DonaldRoss5/Capstone-Job-Listings-with-Filtering. git cd Capstone-Job-Listings-with-Filtering npm install
2. Create the database. In Supabase, open **SQL Editor**, paste the contents of `supabase/migrations/001_create_job_listings.sql` and run it. It creates the `job_listings` table, enables Row Level Security and adds the policies.
3. Create test users. In Supabase add at least two users with an email and password
4. Add environment variables .env.example .env.local
5. Start the app: bash npm run dev Open http://localhost:5173.

- environment variables

`VITE_SUPABASE_URL` Your Supabase project URL (Project Settings > API) |`VITE_SUPABASE_PUBLISHABLE_KEY` Your project's publishable key

routes:
--- | --- | --- |
Job listings with filters | Public
login` | Sign in | Public 
jobs/new` | Create a listing | Signed in
jobs/:id/edit` | Edit a listing | Signed in, owner only
Not found | Public |

test commands:
npm run test` | Run Vitest in watch mode
npm run test:run` | Run all 16 tests once
npm run lint` | Run ESLint, Stylelint and HTMLHint
npm run build - Create the production build
npm run verify:rls - Run the two-account RLS check (see below) |

deployed URL: https://capstone-job-listings-with-filtering.netlify.app

- explanation of RLS. Document how you checked with two accounts that account B cannot change account A’s job through an authenticated client request. Do not use the admin SQL Editor or Table Editor as proof of RLS, and do not submit passwords.

1. Signs in as account A and creates a temporary listing.
2. Signs in as account B in a separate client.
3. As B, tries to **update** A's listing. Expected: zero rows changed.
4. As B, tries to **delete** A's listing. Expected: zero rows deleted.
5. As B, tries to **insert** a row with A's `user_id`. Expected: rejected.
6. As an anonymous client, tries to insert. Expected: rejected. Reading is still allowed. 7. As A, confirms the listing is unchanged, then deletes it to clean up.
