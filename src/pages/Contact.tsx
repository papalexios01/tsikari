import { ArrowRight, Languages, Mail, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { contact, maps, tel } from '@/data/content';
import { media } from '@/data/media';
import { useReveal } from '@/hooks/useReveal';
import { href } from '@/lib/router';

export default function Contact() {
  const ref = useReveal<HTMLDivElement>();
  const cards = [
    { icon: Mail, label: 'Email', value: contact.email, link: `mailto:${contact.email}` },
    { icon: Phone, label: 'Phone', value: contact.mobile, link: tel(contact.mobile) },
    { icon: Phone, label: 'Phone 2', value: contact.landline, link: tel(contact.landline) },
    { icon: MessageCircle, label: 'WhatsApp', value: contact.mobile, link: contact.whatsapp, external: true },
  ];

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="Contact us"
        title="We’d love"
        accent="to hear from you"
        lead="Questions about your stay, the island or getting here? Reach us any way you like."
        photo={media.home.facade}
        alt="Archontiko Tsikari facade"
      />

      <section className="bg-sand-50 py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          {cards.map(({ icon: Icon, label, value, link, external }) => (
            <a
              key={label}
              href={link}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              className="reveal group rounded-3xl border border-sand-200 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-clay-300 hover:shadow-[0_24px_48px_-24px_rgba(38,36,31,0.25)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay-100 text-clay-600 transition-colors duration-500 group-hover:bg-clay-500 group-hover:text-sand-50">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <p className="eyebrow mt-8 text-ink-400">{label}</p>
              <p className="mt-2 break-words text-lg text-ink-900">{value}</p>
            </a>
          ))}
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl gap-6 px-6 lg:grid-cols-12 lg:px-10">
          <div className="reveal flex flex-col justify-between rounded-[32px] bg-ink-900 p-10 text-sand-100 lg:col-span-4">
            <div>
              <MapPin className="h-6 w-6 text-clay-300" strokeWidth={1.5} />
              <p className="eyebrow mt-8 text-sand-300">Address</p>
              <address className="mt-3 font-serif text-3xl not-italic leading-snug text-sand-50">
                {contact.address.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </address>
              <Languages className="mt-10 h-6 w-6 text-clay-300" strokeWidth={1.5} />
              <p className="eyebrow mt-6 text-sand-300">Languages we speak</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {contact.languages.map((l) => (
                  <span key={l} className="rounded-full border border-sand-50/20 px-4 py-1.5 text-sm">{l}</span>
                ))}
              </div>
            </div>
            <a href={href('booking')} className="btn-primary group mt-12">
              Request a booking
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          </div>
          <div className="reveal relative overflow-hidden rounded-[32px] bg-sand-200 lg:col-span-8">
            <iframe title="Map of Archontiko Tsikari" src={maps.hotel} loading="lazy" className="h-[440px] w-full border-0 lg:h-full lg:min-h-[520px]" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 sm:right-auto">
              <a href={maps.links.directions} target="_blank" rel="noreferrer" className="btn-primary !px-5 !py-3 shadow-lg">
                <Navigation className="h-4 w-4" /> Get directions
              </a>
              <a href={maps.links.hotel} target="_blank" rel="noreferrer" className="btn-ghost !px-5 !py-3 border-transparent bg-sand-50 text-ink-800 shadow-lg hover:bg-white">
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
