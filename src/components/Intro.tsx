import { ArrowUpRight } from 'lucide-react';
import Img from '@/components/Img';
import { stats } from '@/data/content';
import { media } from '@/data/media';
import { useReveal } from '@/hooks/useReveal';
import { href } from '@/lib/router';

const pill = 'relative mx-2 inline-block h-[0.8em] w-[1.8em] overflow-hidden rounded-full align-[-0.08em] sm:mx-3';

export default function Intro() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="house" ref={ref} className="relative overflow-hidden bg-sand-50 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="section-num reveal text-clay-600">01 &nbsp;/&nbsp; The House</p>

        <h2 className="reveal mt-10 max-w-6xl text-[40px] leading-[1.1] text-ink-900 sm:text-6xl lg:text-[84px]">
          A hidden gem
          <span className={pill}>
            <Img photo={media.home.facade} alt="" aria-hidden sizes="160px" className="h-full w-full object-cover" />
          </span>
          on the <em className="text-clay-600">village square</em> of Varos, built in 1901
          <span className={pill}>
            <Img photo={media.entrance[0]} alt="" aria-hidden sizes="160px" className="h-full w-full object-cover" />
          </span>
          and lovingly restored.
        </h2>

        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="reveal-img relative aspect-[4/5] overflow-hidden lg:col-span-5">
            <Img photo={media.home.facade} alt="Archontiko Tsikari historic facade and entrance in Varos, Lemnos" sizes="(min-width: 1024px) 40vw, 100vw" className="h-full w-full object-cover transition-transform duration-[2s] hover:scale-105" />
            <div className="absolute bottom-5 left-5 rounded-full bg-sand-50/90 px-5 py-2.5 text-xs text-ink-800 backdrop-blur">
              The facade, Varos square
            </div>
          </div>

          <div className="flex flex-col justify-between gap-12 lg:col-span-7 lg:pl-10">
            <div className="grid gap-10 sm:grid-cols-[1fr_auto] sm:items-start">
              <div className="reveal max-w-md space-y-5 text-ink-500">
                <p>
                  Built in 1901 and lovingly restored, Archontiko Tsikari looks out over the stone fountain of Varos, dated
                  1907. Inside, five understated studios offer the ease of a hotel with the personal touch of a family home.
                </p>
                <p>Mornings are slow, evenings are golden, and the whole island lies within a short, scenic drive.</p>
                <a href={href('about')} className="group inline-flex items-center gap-3 pt-2 text-sm font-medium text-ink-900">
                  <span className="border-b border-ink-900/30 pb-1 transition-colors group-hover:border-clay-600 group-hover:text-clay-600">Our story</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 text-sand-50 transition-all duration-500 group-hover:rotate-45 group-hover:bg-clay-600">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
              </div>

              <div className="reveal relative mx-auto hidden h-36 w-36 sm:block" aria-hidden>
                <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow text-ink-700">
                  <defs>
                    <path id="badge" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                  </defs>
                  <text className="fill-current font-sans text-[8.5px] uppercase tracking-[0.3em]">
                    <textPath href="#badge">Traditional Hotel &middot; Varos Lemnos &middot;</textPath>
                  </text>
                </svg>
                <span className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-serif text-3xl leading-none text-clay-600">1901</span>
                  <span className="eyebrow mt-1 !text-[8px] text-ink-400">Since</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_1.3fr] gap-4">
              <div className="reveal-img aspect-[3/4] overflow-hidden">
                <Img photo={media.entrance[0]} alt="Traditional entrance of Archontiko Tsikari" sizes="(min-width: 1024px) 22vw, 45vw" className="h-full w-full object-cover transition-transform duration-[2s] hover:scale-105" />
              </div>
              <div className="reveal-img mt-16 aspect-[4/5] overflow-hidden">
                <Img photo={media.gallery[1]} alt="Studio interior at Archontiko Tsikari" sizes="(min-width: 1024px) 30vw, 55vw" className="h-full w-full object-cover transition-transform duration-[2s] hover:scale-105" />
              </div>
            </div>
          </div>
        </div>

        <dl className="mt-24 grid grid-cols-2 border-t border-sand-200 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`reveal border-sand-200 py-10 pr-6 ${i % 2 ? 'pl-6 lg:pl-8' : ''} ${i > 0 ? 'lg:border-l lg:pl-8' : ''} ${i % 2 ? 'border-l' : ''} ${i > 1 ? 'border-t lg:border-t-0' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <dt className="font-serif text-5xl text-ink-900 lg:text-6xl">{s.value}</dt>
              <dd className="mt-3 text-sm text-ink-500">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
