import Img from '@/components/Img';
import { stats } from '@/data/content';
import { media } from '@/data/media';
import { useReveal } from '@/hooks/useReveal';

export default function Intro() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="house" ref={ref} className="relative overflow-hidden bg-sand-50 py-24 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="lg:col-span-5 lg:pt-12">
          <p className="eyebrow reveal text-clay-600">The House</p>
          <h2 className="reveal mt-6 text-4xl text-ink-900 sm:text-5xl lg:text-6xl">
            A hidden gem on the <em className="text-clay-600">village square</em>
          </h2>
          <div className="reveal mt-8 space-y-5 text-ink-500">
            <p>
              Built in 1901 and lovingly restored, Archontiko Tsikari looks out over the stone fountain of Varos, dated
              1907. Inside, five understated studios offer the ease of a hotel with the personal touch of a family home.
            </p>
            <p>
              Mornings are slow, evenings are golden, and the whole island lies within a short, scenic drive.
            </p>
          </div>

          <dl className="reveal mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-sand-200 bg-sand-200">
            {stats.map((s) => (
              <div key={s.label} className="bg-sand-50 p-6">
                <dt className="font-serif text-4xl text-ink-900">{s.value}</dt>
                <dd className="mt-2 text-xs text-ink-500">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative lg:col-span-7">
          <div className="reveal relative aspect-[4/5] overflow-hidden rounded-[32px] sm:aspect-[5/4] lg:ml-12 lg:aspect-[4/5]">
            <Img photo={media.home.facade} alt="Archontiko Tsikari historic facade and entrance in Varos, Lemnos" sizes="(min-width: 1024px) 55vw, 100vw" className="h-full w-full object-cover transition-transform duration-[2s] hover:scale-105" />
          </div>
          <div className="reveal absolute -bottom-10 left-0 hidden w-56 overflow-hidden rounded-3xl border-[6px] border-sand-50 shadow-2xl sm:block lg:-left-6 lg:w-64">
            <Img photo={media.entrance[0]} alt="Traditional entrance of Archontiko Tsikari" sizes="256px" className="aspect-[3/4] w-full object-cover" />
          </div>
          <div className="reveal absolute -top-6 right-6 rounded-full bg-olive-700 px-6 py-6 text-center text-sand-50 shadow-xl sm:right-10">
            <span className="block font-serif text-3xl leading-none">1901</span>
            <span className="eyebrow mt-1 block !text-[9px] text-olive-100">Since</span>
          </div>
        </div>
      </div>
    </section>
  );
}
