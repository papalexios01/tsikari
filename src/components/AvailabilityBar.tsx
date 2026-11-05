import { useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { rooms } from '@/data/content';
import { bookingHref } from '@/lib/booking';
import { nightsBetween, nextDay, todayLocal } from '@/lib/dates';

export default function AvailabilityBar() {
  const [room, setRoom] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const capacity = rooms.find((r) => r.id === room)?.guests ?? 4;
  const checkoutMin = nextDay(checkIn || todayLocal());

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!checkIn || nightsBetween(checkIn, checkOut) < 1 || checkIn < todayLocal()) return;
    window.location.hash = bookingHref({
      room, check_in: checkIn, check_out: checkOut, guests: Math.min(guests, capacity),
    });
  };

  return (
    <form onSubmit={submit} className="ge-availability" aria-label="Request room availability">
      <label className="ge-availability__field ge-availability__dates">
        <span>01 / ARRIVAL</span>
        <input aria-label="Arrival date" type="date" required min={todayLocal()} value={checkIn}
          onChange={(e) => {
            const date = e.target.value;
            setCheckIn(date);
            if (checkOut && checkOut <= date) setCheckOut('');
          }} />
      </label>
      <label className="ge-availability__field ge-availability__dates">
        <span>02 / DEPARTURE</span>
        <input aria-label="Departure date" type="date" required min={checkoutMin} value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)} />
      </label>
      <label className="ge-availability__field">
        <span>03 / ACCOMMODATION</span>
        <select aria-label="Studio preference" value={room} onChange={(e) => {
          setRoom(e.target.value);
          const limit = rooms.find((r) => r.id === e.target.value)?.guests ?? 4;
          if (guests > limit) setGuests(limit);
        }}>
          <option value="">Any studio</option>
          {rooms.map((r) => <option key={r.id} value={r.id}>{r.guests === 3 ? 'Studio · 2–3 guests' : 'Family · 2–4 guests'}</option>)}
        </select>
      </label>
      <label className="ge-availability__field ge-availability__guests">
        <span>04 / GUESTS</span>
        <select aria-label="Number of guests" value={Math.min(guests, capacity)} onChange={(e) => setGuests(Number(e.target.value))}>
          {Array.from({ length: capacity }, (_, index) => index + 1).map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
          ))}
        </select>
      </label>
      <button type="submit" className="ge-availability__submit">
        <span>ENQUIRE</span><ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </form>
  );
}
