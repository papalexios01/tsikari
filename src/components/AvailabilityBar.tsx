import { useState, type FormEvent } from 'react';
import { ArrowRight, BedDouble, CalendarDays, Users } from 'lucide-react';
import { rooms } from '@/data/content';
import { bookingHref } from '@/lib/booking';

const today = () => new Date().toISOString().slice(0, 10);

const label = 'eyebrow flex items-center gap-2 !text-[10px] text-ink-400';
const input = 'mt-1.5 w-full bg-transparent font-serif text-xl text-ink-900 outline-none';

export default function AvailabilityBar() {
  const [room, setRoom] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const max = rooms.find((r) => r.id === room)?.guests ?? 4;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    window.location.hash = bookingHref({
      room,
      check_in: checkIn,
      check_out: checkOut && checkOut > checkIn ? checkOut : '',
      guests: Math.min(guests, max),
    });
  };

  return (
    <form
      onSubmit={submit}
      className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-sand-200 shadow-[0_40px_80px_-32px_rgba(23,22,19,0.55)] lg:grid-cols-[1.2fr_1fr_1fr_0.8fr_auto] lg:rounded-full"
    >
      <label className="col-span-2 bg-sand-50 px-6 py-4 transition-colors hover:bg-white lg:col-span-1 lg:pl-8">
        <span className={label}><BedDouble className="h-3.5 w-3.5" /> Studio</span>
        <select value={room} onChange={(e) => setRoom(e.target.value)} className={`${input} cursor-pointer appearance-none truncate`}>
          <option value="">Any studio</option>
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
      </label>
      <label className="bg-sand-50 px-6 py-4 transition-colors hover:bg-white">
        <span className={label}><CalendarDays className="h-3.5 w-3.5" /> Check-in</span>
        <input type="date" min={today()} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={input} />
      </label>
      <label className="bg-sand-50 px-6 py-4 transition-colors hover:bg-white">
        <span className={label}><CalendarDays className="h-3.5 w-3.5" /> Check-out</span>
        <input type="date" min={checkIn || today()} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={input} />
      </label>
      <label className="col-span-2 bg-sand-50 px-6 py-4 transition-colors hover:bg-white lg:col-span-1">
        <span className={label}><Users className="h-3.5 w-3.5" /> Guests</span>
        <select value={Math.min(guests, max)} onChange={(e) => setGuests(Number(e.target.value))} className={`${input} cursor-pointer appearance-none`}>
          {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
          ))}
        </select>
      </label>
      <div className="col-span-2 bg-sand-50 p-2 lg:col-span-1">
        <button type="submit" className="btn-dark group h-full w-full !py-5 lg:!px-8">
          Check availability
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
