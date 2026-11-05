import { href } from '@/lib/router';

export type BookingPrefill = { room: string; check_in: string; check_out: string; guests: number };

export const bookingHref = (p: Partial<BookingPrefill>) => {
  const params = new URLSearchParams();
  if (p.room) params.set('room', p.room);
  if (p.check_in) params.set('in', p.check_in);
  if (p.check_out) params.set('out', p.check_out);
  if (p.guests) params.set('guests', String(p.guests));
  const query = params.toString();
  return href('booking', query ? `q=${query.replace(/&/g, '~')}` : undefined);
};

const isDate = (v: string | null) => (v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : '');

export const parseBookingAnchor = (anchor: string): Partial<BookingPrefill> => {
  if (!anchor.startsWith('q=')) return { room: anchor };
  const params = new URLSearchParams(anchor.slice(2).replace(/~/g, '&'));
  const guests = Number(params.get('guests'));
  return {
    room: params.get('room') ?? '',
    check_in: isDate(params.get('in')),
    check_out: isDate(params.get('out')),
    guests: Number.isInteger(guests) && guests > 0 && guests <= 4 ? guests : undefined,
  };
};
