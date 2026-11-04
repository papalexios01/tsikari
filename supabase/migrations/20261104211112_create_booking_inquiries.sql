/*
# Booking inquiries

1. New Tables
- `booking_inquiries`: availability requests sent from the website's booking form
  - `id` (uuid, primary key)
  - `full_name` (text, required)
  - `email` (text, required)
  - `phone` (text, optional)
  - `check_in` / `check_out` (date, required, check_out after check_in)
  - `guests` (int, 1-4)
  - `message` (text, optional)
  - `created_at` (timestamptz)

2. Security
- RLS enabled.
- Visitors (anon/authenticated) may only INSERT. There are no SELECT, UPDATE or DELETE
  policies, so guest contact details can never be read back through the public site.
  The hotel reads requests from the database dashboard.

3. Notes
1. Length and value checks guard against junk submissions.
*/

CREATE TABLE IF NOT EXISTS booking_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 200 AND email LIKE '%@%'),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 40),
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests int NOT NULL DEFAULT 2 CHECK (guests BETWEEN 1 AND 4),
  message text CHECK (message IS NULL OR char_length(message) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT valid_stay CHECK (check_out > check_in)
);

ALTER TABLE booking_inquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT (full_name, email, phone, check_in, check_out, guests, message) ON booking_inquiries TO anon, authenticated;

DROP POLICY IF EXISTS "Visitors can send booking inquiries" ON booking_inquiries;
CREATE POLICY "Visitors can send booking inquiries"
ON booking_inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (check_in >= current_date - 1);
