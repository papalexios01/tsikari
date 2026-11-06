CREATE TABLE IF NOT EXISTS public.booking_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 200 AND email LIKE '%@%'),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 40),
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests int NOT NULL DEFAULT 2 CHECK (guests BETWEEN 1 AND 4),
  room text CHECK (room IS NULL OR room IN ('studio-2-3', 'studio-2-4')),
  message text CHECK (message IS NULL OR char_length(message) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT valid_stay CHECK (check_out > check_in)
);
GRANT INSERT (full_name, email, phone, check_in, check_out, guests, room, message) ON public.booking_inquiries TO anon, authenticated;
GRANT ALL ON public.booking_inquiries TO service_role;
ALTER TABLE public.booking_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can send booking inquiries"
ON public.booking_inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (check_in >= current_date - 1);