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
    <section id="book" ref={ref} className="bg-sand-50 px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="relative overflow-hidden rounded-[28px] bg-ink-900 py-28 sm:rounded-[36px] lg:py-40">
        <Img photo={media.gallery[8]} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/45 to-ink-900/90" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="eyebrow reveal text-sand-200">{eyebrow}</p>
          <h2 className="display reveal mt-8 text-6xl text-sand-50 sm:text-7xl lg:text-[120px]">
            {title} <em className="text-clay-300">book?</em>
          </h2>
          <p className="reveal mx-auto mt-8 max-w-lg font-light text-sand-100/85">
            Contact us for availability and rates. Every request is answered personally.
          </p>
          <div className="reveal mt-10 flex flex-wrap justify-center gap-4">
            <a href={href('booking')} className="btn-ghost group border-sand-50 bg-sand-50 text-ink-900 hover:border-clay-600 hover:bg-clay-600 hover:text-sand-50">
              Check availability
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost border-sand-50/40 text-sand-50 hover:border-sand-50 hover:bg-sand-50/10">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
          <div className="reveal mx-auto mt-14 grid max-w-3xl gap-px overflow-hidden rounded-2xl bg-sand-50/15 text-sm text-sand-100 sm:grid-cols-3">
            {[
              { icon: Phone, label: contact.mobile, to: tel(contact.mobile) },
              { icon: Phone, label: contact.landline, to: tel(contact.landline) },
              { icon: Mail, label: contact.email, to: `mailto:${contact.email}` },
            ].map(({ icon: Icon, label, to }) => (
              <a key={label} href={to} className="flex items-center justify-center gap-2 bg-ink-900/50 px-4 py-4 backdrop-blur transition-colors hover:bg-ink-900/80 hover:text-sand-50">
                <Icon className="h-4 w-4 shrink-0 text-clay-300" /> <span className="truncate">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
