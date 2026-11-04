/*
# Add requested room to booking inquiries

1. Modified Tables
- `booking_inquiries`
  - `room` (text, nullable): which studio type the guest is interested in
    ('studio-2-3' or 'studio-2-4'); null means "no preference".
2. Security
- Extends the existing column-level INSERT grant so anon/authenticated
  visitors can set `room` when sending a request. No read access is added.
3. Notes
1. Constraint limits values to the two known studio types.
*/

ALTER TABLE booking_inquiries ADD COLUMN IF NOT EXISTS room text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'booking_inquiries_room_check'
  ) THEN
    ALTER TABLE booking_inquiries
      ADD CONSTRAINT booking_inquiries_room_check
      CHECK (room IS NULL OR room IN ('studio-2-3', 'studio-2-4'));
  END IF;
END $$;

GRANT INSERT (room) ON booking_inquiries TO anon, authenticated;