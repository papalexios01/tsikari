import { Bed, CalendarCheck, Info, Mail, MapPin, MessageCircle, Phone, Sparkles, UserRound } from 'lucide-react';
import BookingForm from '@/components/BookingForm';
import PageHeader from '@/components/PageHeader';
import { bookingPerks, contact, tel } from '@/data/content';
import { media } from '@/data/media';
import { useReveal } from '@/hooks/useReveal';

const perkIcons = [Bed, MapPin, UserRound, Sparkles];

export default function Booking({ room }: { room: string }) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="Booking"
        title="Plan your"
        accent="stay"
        lead="Send us your dates and we will reply personally with availability and our best direct rates."
        photo={media.about.lemnos}
        alt="Archontiko Tsikari in Varos"
      />

      <section className="bg-sand-50 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:px-10">
          <div className="reveal rounded-[32px] border border-sand-200 bg-white p-6 shadow-[0_40px_80px_-48px_rgba(38,36,31,0.35)] sm:p-10 lg:col-span-7">
            <p className="eyebrow flex items-center gap-2 text-clay-600">
              <CalendarCheck className="h-4 w-4" /> Availability request
            </p>
            <h2 className="mt-4 text-4xl text-ink-900">Tell us about your trip</h2>
            <p className="mb-8 mt-2 text-sm text-ink-500">No payment is taken here. We confirm everything with you directly.</p>
            <BookingForm key={room} initialRoom={room} />
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <div className="reveal rounded-[32px] bg-ink-900 p-8 text-sand-100 sm:p-10">
              <p className="eyebrow text-clay-300">Why book direct?</p>
              <h3 className="mt-4 text-3xl text-sand-50">Hotel-style studios at friendly prices</h3>
              <ul className="mt-8 space-y-6">
                {bookingPerks.map((p, i) => {
                  const Icon = perkIcons[i % perkIcons.length];
                  return (
                    <li key={p.title} className="flex gap-4">
                      <Icon className="mt-1 h-5 w-5 shrink-0 text-clay-300" strokeWidth={1.5} />
                      <div>
                        <p className="text-sand-50">{p.title}</p>
                        <p className="mt-1 text-sm font-light text-sand-200/75">{p.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-8 flex gap-3 rounded-2xl bg-sand-50/5 p-4 text-sm font-light text-sand-200/80">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-clay-300" />
                Please note we have no 24-hour reception or restaurant. Let us know your arrival time and we&rsquo;ll be there to welcome you.
              </p>
            </div>

            <div className="reveal rounded-[32px] border border-sand-200 bg-sand-100 p-8 sm:p-10">
              <p className="eyebrow text-clay-600">Prefer to talk?</p>
              <ul className="mt-6 space-y-4 text-ink-700">
                {[contact.mobile, contact.landline].map((n) => (
                  <li key={n}>
                    <a href={tel(n)} className="flex items-center gap-3 transition-colors hover:text-clay-600">
                      <Phone className="h-4 w-4 text-clay-500" /> {n}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-3 break-all transition-colors hover:text-clay-600">
                    <Mail className="h-4 w-4 shrink-0 text-clay-500" /> {contact.email}
                  </a>
                </li>
                <li>
                  <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition-colors hover:text-clay-600">
                    <MessageCircle className="h-4 w-4 text-clay-500" /> WhatsApp
                  </a>
                </li>
              </ul>
              <p className="mt-6 text-xs text-ink-500">We speak {contact.languages.join(', ')}.</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
