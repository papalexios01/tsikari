import { useState } from 'react';
import { Car, Plane, Ship, Sun } from 'lucide-react';
import Img from '@/components/Img';
import { places } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

const travel = [
  { icon: Plane, label: 'Airport', value: '3 min' },
  { icon: Ship, label: 'Myrina port', value: '20 min' },
  { icon: Car, label: 'Farthest beach', value: '~20 min' },
  { icon: Sun, label: 'Athos sunset', value: 'Myrina' },
];

const photos = Array.from(new Set(places.map((p) => p.photo)));

export default function Island() {
  const ref = useReveal<HTMLElement>();
  const [hover, setHover] = useState(0);

  return (
    <section id="island" ref={ref} className="bg-sand-50 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="eyebrow reveal text-aegean-500">Lemnos Island</p>
          <h2 className="reveal mt-6 text-4xl text-ink-900 sm:text-5xl lg:text-6xl">
            The whole island, <em className="text-aegean-500">twenty minutes away</em>
          </h2>
          <p className="reveal mt-6 text-ink-500">
            Varos lies at the very centre of Lemnos. Here are a few of our favourite places, all an easy drive from your door.
          </p>
        </div>

        <div className="reveal mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {travel.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 rounded-2xl bg-aegean-100/60 p-5">
              <Icon className="h-5 w-5 shrink-0 text-aegean-500" strokeWidth={1.5} />
              <div>
                <p className="font-serif text-2xl text-ink-900">{value}</p>
                <p className="text-xs text-ink-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <ol className="reveal divide-y divide-sand-200 border-y border-sand-200">
            {places.map((p, i) => (
              <li
                key={p.name}
                onMouseEnter={() => setHover(i)}
                className="group flex cursor-default items-center gap-6 py-5 transition-colors"
              >
                <span className={`w-8 font-serif text-lg italic transition-colors ${hover === i ? 'text-aegean-500' : 'text-ink-400'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className={`text-2xl transition-colors duration-300 ${hover === i ? 'text-aegean-700' : 'text-ink-900'}`}>{p.name}</h3>
                    <span className="eyebrow !text-[9px] text-ink-400">{p.area}</span>
                  </div>
                  <p className="mt-1 text-sm text-ink-500">{p.note}</p>
                </div>
                <span className="shrink-0 rounded-full border border-sand-200 px-3 py-1 text-xs text-ink-500 transition-colors group-hover:border-aegean-300 group-hover:text-aegean-700">
                  {p.minutes} min
                </span>
              </li>
            ))}
          </ol>

          <div className="reveal relative hidden overflow-hidden rounded-[32px] lg:block">
            {photos.map((photo) => (
              <Img
                key={photo}
                photo={photo}
                sizes="50vw"
                alt="Lemnos coastline"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
                  places[hover].photo === photo ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                }`}
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/80 to-transparent p-8">
              <p className="eyebrow text-sand-200">Now viewing</p>
              <p className="mt-2 font-serif text-3xl text-sand-50">{places[hover].name}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
