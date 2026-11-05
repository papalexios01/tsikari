import { createClient } from '@supabase/supabase-js';

// The site must remain accessible when the booking backend has not been configured.
// Never put a Supabase service-role/secret key in VITE_* environment variables.
const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const publishableKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

function bookingClient() {
  if (!url || !publishableKey || !url.startsWith('https://')) return null;
  try {
    return createClient(url, publishableKey);
  } catch {
    return null;
  }
}

export const supabase = bookingClient();
