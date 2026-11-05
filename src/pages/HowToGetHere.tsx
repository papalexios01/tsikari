import { useState } from 'react';
import { ArrowUpRight, Clock, MapPin, MessageCircle, Navigation, Phone, Plane, Ship } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { contact, maps, tel, travelRoutes } from '@/data/content';
import { media } from '@/data/media';
import { useReveal } from '@/hooks/useReveal';

const mapTabs = [
  { id: 'hotel', label: 'The hotel', src: maps.hotel, link: maps.links.hotel },
  { id: 'port', label: 'From Myrina port', src: maps.fromPort, link: maps.links.fromPort },
  { id: 'airport', label: 'From the airport', src: maps.fromAirport, link: maps.links.fromAirport },
] as const;

const facts = [
  { icon: Plane, value: '3 min', label: 'from Lemnos International Airport' },
  { icon: Ship, value: '~20 min', label: 'drive from Myrina port' },
  { icon: Clock, value: 'Central', label: 'location for exploring Lemnos' },
];

export default function HowToGetHere() {
  const ref = useReveal<HTMLDivElement>();
  const [map, setMap] = useState<(typeof mapTabs)[number]['id']>('hotel');
  const active = mapTabs.find((m) => m.id === map) ?? mapTabs[0];

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="How to get here"
        title="Getting to"
        accent="Lemnos"
        lead="Reach the island by ferry or plane. Varos sits right in the centre, minutes from the airport."
        photo={media.home.island}
        alt="Lemnos island coastline"
      />

      <section className="border-b border-sand-200 bg-sand-100">
        <div className="mx-auto grid max-w-7xl divide-y divide-sand-200 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-10">
          {facts.map(({ icon: Icon, value, label }) => (
            <div key={label} className="reveal flex items-center gap-5 py-8 sm:px-8 sm:first:pl-0">
              <Icon className="h-6 w-6 shrink-0 text-clay-500" strokeWidth={1.5} />
              <div>
                <p className="font-serif text-3xl text-ink-900">{value}</p>
                <p className="text-sm text-ink-500">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand-50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {(['ferry', 'plane'] as const).map((mode) => (
            <div key={mode} className="mb-20 last:mb-0">
              <div className="reveal flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-aegean-100 text-aegean-600">
                  {mode === 'ferry' ? <Ship className="h-5 w-5" /> : <Plane className="h-5 w-5" />}
                </span>
                <h2 className="text-4xl text-ink-900">{mode === 'ferry' ? 'By ferry' : 'By plane'}</h2>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {travelRoutes
                  .filter((r) => r.mode === mode)
                  .map((r) => (
                    <div key={r.title} className="reveal rounded-3xl border border-sand-200 bg-white p-8">
                      <p className="eyebrow text-clay-600">From</p>
                      <h3 className="mt-3 text-3xl text-ink-900">{r.title}</h3>
                      <ul className="mt-6 divide-y divide-sand-200">
                        {r.carriers.map((c) => (
                          <li key={c.name}>
                            <a href={c.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between py-4 text-ink-700 transition-colors hover:text-clay-600">
                              {c.name}
                              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="maps" className="bg-ink-900 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow reveal text-clay-300">Maps</p>
              <h2 className="reveal mt-6 text-4xl text-sand-50 sm:text-5xl">Find your way to Varos</h2>
              <p className="reveal mt-4 flex items-center gap-2 text-sand-200/80">
                <MapPin className="h-4 w-4" /> {contact.address.join(', ')}
              </p>
            </div>
            <div className="reveal flex flex-wrap gap-2">
              {mapTabs.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMap(m.id)}
                  className={`rounded-full px-5 py-2.5 text-sm transition-all ${map === m.id ? 'bg-sand-50 text-ink-900' : 'bg-sand-50/10 text-sand-100 hover:bg-sand-50/20'}`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <div className="reveal mt-10 overflow-hidden rounded-[32px] bg-ink-800">
            <iframe key={active.id} title={`Map: ${active.label}`} src={active.src} loading="lazy" className="h-[480px] w-full border-0 lg:h-[560px]" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={active.link} target="_blank" rel="noreferrer" className="btn-primary">
              <Navigation className="h-4 w-4" /> {active.id === 'hotel' ? 'Open in Google Maps' : 'Get these directions'}
            </a>
            <a href={maps.links.directions} target="_blank" rel="noreferrer" className="btn-ghost border-sand-50/40 text-sand-50 hover:border-sand-50 hover:bg-sand-50 hover:text-ink-900">
              Directions from my location <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-sand-100 py-24">
        <div className="reveal mx-auto max-w-3xl px-6 text-center">
          <p className="eyebrow text-clay-600">Need help planning?</p>
          <h2 className="mt-6 text-4xl text-ink-900 sm:text-5xl">We&rsquo;re happy to help with your journey</h2>
          <p className="mx-auto mt-5 max-w-lg text-ink-500">Ask us about ferry times, flights, car hire or transfers. We know the island well.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={tel(contact.mobile)} className="btn-primary"><Phone className="h-4 w-4" /> {contact.mobile}</a>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost border-sand-300 text-ink-800 hover:bg-sand-50">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
