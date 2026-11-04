import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { rooms } from '@/data/content';
import { supabase } from '@/lib/supabase';

const today = () => new Date().toISOString().slice(0, 10);

type Props = { initialRoom?: string };

export default function BookingForm({ initialRoom = '' }: Props) {
  const preset = rooms.find((r) => r.id === initialRoom);
  const empty = {
    full_name: '',
    email: '',
    phone: '',
    check_in: '',
    check_out: '',
    guests: preset ? Math.min(2, preset.guests) : 2,
    room: preset?.id ?? '',
    message: '',
  };
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');

  const set = (k: keyof typeof empty, v: string | number) => setForm((f) => ({ ...f, [k]: v }));
  const selectedRoom = rooms.find((r) => r.id === form.room);
  const maxGuests = selectedRoom?.guests ?? 4;

  const nights =
    form.check_in && form.check_out
      ? Math.round((new Date(form.check_out).getTime() - new Date(form.check_in).getTime()) / 86400000)
      : 0;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (nights < 1) {
      setError('Please choose a check-out date after your check-in date.');
      return;
    }
    setStatus('sending');
    const { error: err } = await supabase.from('booking_inquiries').insert({
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      check_in: form.check_in,
      check_out: form.check_out,
      guests: Math.min(form.guests, maxGuests),
      room: form.room || null,
      message: form.message.trim() || null,
    });
    if (err) {
      setStatus('idle');
      setError('We couldn\u2019t send your request just now. Please try again or contact us directly by phone or WhatsApp.');
      return;
    }
    setStatus('sent');
  };

  if (status === 'sent') {
    return (
      <div className="animate-fade-up py-12 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-success-500" strokeWidth={1.25} />
        <h3 className="mt-6 text-4xl text-ink-900">Thank you, {form.full_name.split(' ')[0]}</h3>
        <p className="mx-auto mt-4 max-w-md text-ink-500">
          Your request for {nights} night{nights > 1 ? 's' : ''} has reached us. We will reply to {form.email} with
          availability and rates shortly.
        </p>
        <button
          onClick={() => {
            setForm(empty);
            setStatus('idle');
          }}
          className="btn-ghost mt-10 border-sand-300 text-ink-800 hover:bg-sand-100"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-medium text-ink-700">Studio</span>
          <select value={form.room} onChange={(e) => set('room', e.target.value)} className="field">
            <option value="">No preference</option>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-ink-700">Check-in</span>
          <input type="date" required min={today()} value={form.check_in} onChange={(e) => set('check_in', e.target.value)} className="field" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-ink-700">Check-out</span>
          <input type="date" required min={form.check_in || today()} value={form.check_out} onChange={(e) => set('check_out', e.target.value)} className="field" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-ink-700">Full name</span>
          <input required maxLength={120} value={form.full_name} onChange={(e) => set('full_name', e.target.value)} className="field" placeholder="Your name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-ink-700">Guests</span>
          <select value={Math.min(form.guests, maxGuests)} onChange={(e) => set('guests', Number(e.target.value))} className="field">
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-ink-700">Email</span>
          <input type="email" required maxLength={200} value={form.email} onChange={(e) => set('email', e.target.value)} className="field" placeholder="you@example.com" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-ink-700">Phone <span className="text-ink-400">(optional)</span></span>
          <input type="tel" maxLength={40} value={form.phone} onChange={(e) => set('phone', e.target.value)} className="field" placeholder="+30 ..." />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-medium text-ink-700">Message <span className="text-ink-400">(optional)</span></span>
          <textarea rows={4} maxLength={2000} value={form.message} onChange={(e) => set('message', e.target.value)} className="field resize-none" placeholder="Arrival time, special requests, a grocery list..." />
        </label>
      </div>

      {error && <p className="mt-4 rounded-xl bg-error-100 px-4 py-3 text-sm text-error-700">{error}</p>}

      <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-ink-500">
          {nights > 0 ? <><span className="font-serif text-2xl text-ink-900">{nights}</span> night{nights > 1 ? 's' : ''} selected</> : 'No payment needed to ask.'}
        </p>
        <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-60 sm:w-auto">
          {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === 'sending' ? 'Sending...' : 'Send request'}
        </button>
      </div>
    </form>
  );
}
