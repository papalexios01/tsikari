import { ArrowRight, Mail, MessageCircle, Phone } from 'lucide-react';
import Img from '@/components/Img';
import { contact, tel } from '@/data/content';
import { media } from '@/data/media';
import { useReveal } from '@/hooks/useReveal';
import { href } from '@/lib/router';

type Props = { eyebrow?: string; title?: string };

export default function BookCta({ eyebrow = 'Your stay awaits', title = 'Ready to' }: Props) {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="book" ref={ref} className="relative overflow-hidden bg-ink-900 py-32 lg:py-44">
      <Img photo={media.gallery[8]} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/50 to-ink-900/90" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="eyebrow reveal text-sand-200">{eyebrow}</p>
        <h2 className="reveal mt-6 text-5xl text-sand-50 sm:text-6xl lg:text-7xl">
          {title} <em className="text-clay-300">book?</em>
        </h2>
        <p className="reveal mx-auto mt-6 max-w-lg font-light text-sand-100/85">
          Contact us for availability and rates. Every request is answered personally.
        </p>
        <div className="reveal mt-10 flex flex-wrap justify-center gap-4">
          <a href={href('booking')} className="btn-primary group">
            Check availability
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </a>
          <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost border-sand-50/40 text-sand-50 hover:border-sand-50 hover:bg-sand-50 hover:text-ink-900">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
        <div className="reveal mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-sand-200">
          <a href={tel(contact.mobile)} className="inline-flex items-center gap-2 transition-colors hover:text-sand-50">
            <Phone className="h-4 w-4" /> {contact.mobile}
          </a>
          <a href={tel(contact.landline)} className="inline-flex items-center gap-2 transition-colors hover:text-sand-50">
            <Phone className="h-4 w-4" /> {contact.landline}
          </a>
          <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-sand-50">
            <Mail className="h-4 w-4" /> {contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
