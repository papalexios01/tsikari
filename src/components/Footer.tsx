import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { contact, navLinks, tel } from '@/data/content';
import { media } from '@/data/media';
import { href } from '@/lib/router';

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-sand-200">
      <div className="mx-auto grid max-w-7xl gap-12 border-t border-sand-50/10 px-6 py-16 md:grid-cols-12 lg:px-10">
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
            {navLinks.map((l) => (
              <li key={l.route}>
                <a href={href(l.route)} className="transition-colors hover:text-sand-50">{l.label}</a>
              </li>
            ))}
            <li>
              <a href={href('booking')} className="transition-colors hover:text-sand-50">Booking</a>
            </li>
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
              <a href={`mailto:${contact.email}`} className="flex gap-3 transition-colors hover:text-sand-50">
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
      <div className="border-t border-sand-50/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-6 py-6 text-xs text-sand-200/50 sm:flex-row lg:px-10">
          <p>&copy; {new Date().getFullYear()} Archontiko Tsikari. All rights reserved.</p>
          <p>Varos · Lemnos · Greece</p>
        </div>
      </div>
    </footer>
  );
}
