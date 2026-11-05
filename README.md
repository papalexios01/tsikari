# Archontiko Tsikari

React, TypeScript, Vite and Tailwind source for the five-studio historic guesthouse in Varos, Lemnos, Greece.

## Local development

Use Node.js 22 and npm. Run `npm ci`, `npm run dev`, `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build` before merging. The existing photos in `public/images/` and optimized variants in `public/img/` are retained.

## Booking functionality

This is an **enquiry form, not a live availability or payment system**. To use the existing Supabase booking table, configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the hosting environment and apply the existing `supabase/migrations/`. Use only the browser-safe publishable/legacy anon key, **never a service-role or secret key**.

With no valid Supabase environment, the rest of the website stays available and guests can prepare an email enquiry. The guest must press Send in their email client. A successful Supabase insert does not notify hotel staff by email: monitor the Supabase dashboard or separately configure a secure server-side notification workflow. Test a live enquiry before production promotion.

## Validation and rollback

The GitHub workflow runs TypeScript, ESLint, date unit tests and production build. Preview the branch on staging; verify images, keyboard and mobile navigation, galleries, reservation enquiries and contact links. `main` and production are unchanged by this pull request. Revert to the previous known-good commit/deployment if required.

## Search visibility limitation

This version retains the existing hash router (`#/about`, `#/rooms`). Client-side route titles improve browser context **but do not make those pages independently indexable**. Before a future SEO migration, verify hosting rewrite rules, prerendering, real paths, legacy redirects and actual 404 status behavior.
