import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { contact, navLinks, tel } from '@/data/content';
import { media } from '@/data/media';
import { href } from '@/lib/router';

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-sand-200">
      <div className="mx-auto max-w-7xl px-6 pt-20 lg:px-10">
        <div className="flex flex-col justify-between gap-8 border-b border-sand-50/10 pb-14 lg:flex-row lg:items-end">
          <h2 className="display max-w-2xl text-5xl text-sand-50 sm:text-6xl">
            Slow mornings, golden <em className="text-clay-300">evenings.</em>
          </h2>
          <a href={href('booking')} className="group inline-flex items-center gap-3 self-start rounded-full bg-sand-50 py-2 pl-6 pr-2 text-sm font-medium text-ink-900 transition-colors duration-500 hover:bg-clay-600 hover:text-sand-50 lg:self-auto">
            Plan your stay
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 text-sand-50 transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <img src={media.logo} alt="Archontiko Tsikari" width={300} height={100} loading="lazy" className="h-14 w-auto" />
            <p className="mt-6 max-w-sm text-sm font-light text-sand-200/70">
              A traditional hotel of five studios on the village square of Varos, Lemnos. Est. 1901.
            </p>
            <p className="mt-6 text-xs text-sand-200/60">We speak {contact.languages.join(', ')}.</p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-sand-300">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              {[...navLinks, { label: 'Booking', route: 'booking' as const }].map((l) => (
                <li key={l.route}>
                  <a href={href(l.route)} className="group inline-flex items-center gap-2 transition-colors hover:text-sand-50">
                    <span className="h-px w-0 bg-clay-300 transition-all duration-500 group-hover:w-4" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <p className="eyebrow text-sand-300">Contact</p>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-clay-300" />
                {contact.address.join(', ')}
              </li>
              {[contact.mobile, contact.landline].map((n) => (
                <li key={n}>
                  <a href={tel(n)} className="flex gap-3 transition-colors hover:text-sand-50">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-clay-300" />{n}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${contact.email}`} className="flex gap-3 break-all transition-colors hover:text-sand-50">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-clay-300" />{contact.email}
                </a>
              </li>
              <li>
                <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="flex gap-3 transition-colors hover:text-sand-50">
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-clay-300" />WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p aria-hidden className="display select-none overflow-hidden whitespace-nowrap text-center text-[17vw] italic text-sand-50/[0.06]">
        Tsikari
      </p>

      <div className="border-t border-sand-50/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-6 py-6 text-xs text-sand-200/50 sm:flex-row lg:px-10">
          <p>&copy; {new Date().getFullYear()} Archontiko Tsikari. All rights reserved.</p>
          <p>Varos &middot; Lemnos &middot; Greece</p>
        </div>
      </div>
    </footer>
  );
}
