import { useState } from 'react';
import { Check } from 'lucide-react';
import Img from '@/components/Img';
import { features } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

export default function WhyChoose() {
  const ref = useReveal<HTMLElement>();
  const [active, setActive] = useState(0);
  const feature = features[active];

  return (
    <section id="discover" ref={ref} className="bg-ink-900 py-24 text-sand-50 lg:mx-3 lg:rounded-[36px] lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="section-num reveal text-clay-300">03 &nbsp;/&nbsp; Discover</p>
            <h2 className="reveal mt-8 max-w-2xl text-5xl sm:text-6xl lg:text-7xl">
              Why choose <em className="text-sand-300">Archontiko Tsikari?</em>
            </h2>
          </div>
          <div role="group" aria-label="Hotel features" className="reveal flex gap-2 overflow-x-auto rounded-full border border-sand-50/15 p-1.5">
            {features.map((f, i) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition-all duration-500 ${
                  i === active ? 'bg-sand-50 text-ink-900' : 'text-sand-200 hover:text-sand-50'
                }`}
              >
                <span className="mr-2 font-serif italic opacity-60">0{i + 1}</span>
                {f.tab}
              </button>
            ))}
          </div>
        </div>

        <div key={feature.id} className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative animate-fade-up overflow-hidden rounded-[32px]">
            <Img photo={feature.image} sizes="(min-width: 1024px) 50vw, 100vw" alt={feature.title} className="aspect-[4/5] h-full w-full animate-slow-zoom object-cover lg:aspect-auto" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/90 to-transparent p-8">
              <p className="max-w-sm font-serif text-2xl italic text-sand-100">{feature.lead}</p>
            </div>
          </div>

          <div className="animate-fade-up lg:py-6" style={{ animationDelay: '150ms' }}>
            <p className="font-serif text-7xl italic text-clay-300/40">0{active + 1}</p>
            <h3 className="mt-2 text-3xl sm:text-4xl">{feature.title}</h3>
            <div className="mt-8 space-y-5 font-light text-sand-200/80">
              {feature.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {feature.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 rounded-2xl border border-sand-50/10 bg-sand-50/[0.03] px-4 py-3 text-sm text-sand-100">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-clay-500/20 text-clay-300">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-10 border-t border-sand-50/10 pt-8">
              <p className="eyebrow text-clay-300">{feature.extrasTitle}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {feature.extras.map((x) => (
                  <li key={x} className="rounded-full border border-sand-50/15 px-4 py-1.5 text-xs text-sand-200 transition-colors hover:border-clay-300 hover:text-sand-50">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
